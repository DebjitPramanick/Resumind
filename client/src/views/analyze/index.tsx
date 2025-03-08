import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts";
import * as Styled from "./index.styled";
import { useParser, useRequestState } from "@/hooks";
import { questionsApi } from "@/api";
import { StepProgress, Step } from "@/components/shared";
import { useImmer } from "use-immer";
import { parseAIResponse } from "@/utils";
import { Questions } from "./components/Questions";

const STEP_CHANGE_DELAY = 1000;

export const AnalyzeView = () => {
  const router = useRouter();
  const { file: pdfFile, requirements } = useAppContext();
  const { parse, state: parserState } = useParser();
  const [generateQuestionsRequestStates, generateQuestionsStatesHandler] =
    useRequestState();

  const [pageState, setPageState] = useImmer({
    currentStep: 0,
    isReadyToShowQuestions: false,
    questions: [],
  });

  const generateQuestions = async () => {
    try {
      generateQuestionsStatesHandler.pending();
      const context = parserState.data?.text || "";
      const payload = {
        role: "Frontend Developer",
        context,
        questionCount: requirements.questionCount,
        difficultyLevel: requirements.difficulty,
      };
      const resp = await questionsApi.generateQuestions({
        payload,
      });
      generateQuestionsStatesHandler.fulfilled(resp);
    } catch (error) {
      generateQuestionsStatesHandler.rejected(error as Error);
    }
  };

  const retryParsing = () => {
    setPageState((draft) => {
      draft.currentStep = 0;
    });
    parse(pdfFile as File);
  };

  const retryGeneratingQuestions = () => {
    setPageState((draft) => {
      draft.currentStep = 1;
    });
    generateQuestions();
  };

  const steps: Step[] = [
    {
      title: "Parsing Resume",
      description: "Analyzing your resume content",
      status: parserState.isPending
        ? "active"
        : parserState.isFulfilled
        ? "completed"
        : "pending",
      onRetry: retryParsing,
    },
    {
      title: "Generating Questions",
      description: `Creating ${
        requirements.questionCount
      } ${requirements.difficulty.toLowerCase()} questions`,
      status: generateQuestionsRequestStates.isPending
        ? "active"
        : generateQuestionsRequestStates.isFulfilled
        ? "completed"
        : "pending",
      onRetry: retryGeneratingQuestions,
    },
    {
      title: "Ready",
      description: "Your questions are ready",
      status: generateQuestionsRequestStates.isFulfilled
        ? "completed"
        : "pending",
    },
  ];

  useEffect(() => {
    if (pdfFile) {
      parse(pdfFile);
    } else {
      router.push("/");
    }
  }, [pdfFile]);

  useEffect(() => {
    if (parserState.isFulfilled) {
      setTimeout(() => {
        setPageState((draft) => {
          draft.currentStep = 1;
        });
        generateQuestions();
      }, STEP_CHANGE_DELAY);
    }
  }, [parserState.isFulfilled]);

  useEffect(() => {
    if (generateQuestionsRequestStates.isFulfilled) {
      setTimeout(() => {
        setPageState((draft) => {
          draft.currentStep = 2;
        });
      }, STEP_CHANGE_DELAY);
    }
  }, [generateQuestionsRequestStates.isFulfilled]);

  useEffect(() => {
    if (pageState.currentStep === steps.length - 1) {
      setTimeout(() => {
        setPageState((draft) => {
          draft.isReadyToShowQuestions = true;
        });
      }, STEP_CHANGE_DELAY);
    }
  }, [pageState.currentStep]);

  let nodeToRender;

  if (pageState.isReadyToShowQuestions) {
    const { choices } = generateQuestionsRequestStates.data;
    const jsonContent = choices[0].message.content;
    let questions = parseAIResponse(jsonContent);

    console.log("Questions", questions);

    if (questions && !Array.isArray(questions)) {
      questions = questions.questions;
    } else if (!questions) {
      questions = [];
    }

    nodeToRender = (
      <Questions
        questions={questions}
        pdfFile={pdfFile as File}
        isVisible={pageState.isReadyToShowQuestions}
      />
    );
  } else {
    nodeToRender = (
      <StepProgress steps={steps} currentStep={pageState.currentStep} />
    );
  }

  return <Styled.AnalyzeContainer>{nodeToRender}</Styled.AnalyzeContainer>;
};
