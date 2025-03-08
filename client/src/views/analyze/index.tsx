import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts";
import * as Styled from "./index.styled";
import { useParser, useRequestState } from "@/hooks";
import { Spinner, Text, Button } from "@/components/atoms";
import { questionsApi } from "@/api";
import { StepProgress, Step } from "@/components/molecules/StepProgress";
import { useImmer } from "use-immer";
import { parseAIResponse } from "@/utils";

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

  const steps: Step[] = [
    {
      title: "Parsing Resume",
      description: "Analyzing your resume content",
      status: parserState.isPending
        ? "active"
        : parserState.isFulfilled
        ? "completed"
        : "pending",
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
    }
  }, [pdfFile, parse]);

  useEffect(() => {
    if (parserState.isFulfilled) {
      setTimeout(() => {
        setPageState((draft) => {
          draft.currentStep = 1;
        });
        handleGenerateQuestions();
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

  const handleRetry = () => {
    if (pdfFile) {
      parse(pdfFile);
    }
  };

  const handleUploadNew = () => {
    router.push("/");
  };

  const handleGenerateQuestions = async () => {
    try {
      generateQuestionsStatesHandler.pending();
      const context = parserState.data?.text || "";
      const payload = {
        role: "Frontend Developer",
        context,
      };
      const resp = await questionsApi.generateQuestions({
        payload,
      });
      generateQuestionsStatesHandler.fulfilled(resp);
    } catch (error) {
      generateQuestionsStatesHandler.rejected(error as Error);
    }
  };

  useEffect(() => {
    if (!pdfFile) {
      router.push("/");
    }
  }, [pdfFile]);

  let nodeToRender;

  if (pageState.isReadyToShowQuestions) {
    const { choices } = generateQuestionsRequestStates.data;

    const jsonContent = choices[0].message.content;
    const questions = parseAIResponse(jsonContent);
    console.log(questions);

    nodeToRender = (
      <>
        {/* <Styled.Title>Resume Analysis</Styled.Title>
        {Object.entries(parserState.data.sections).map(([key, content]) => {
          if (!content.trim()) return null;

          return (
            <Styled.Section key={key}>
              <Styled.SectionTitle>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Styled.SectionTitle>
              <Styled.SectionContent>{content}</Styled.SectionContent>
            </Styled.Section>
          );
        })} */}
        Questions are ready
      </>
    );
  } else {
    nodeToRender = (
      <StepProgress steps={steps} currentStep={pageState.currentStep} />
    );
  }

  return <Styled.AnalyzeContainer>{nodeToRender}</Styled.AnalyzeContainer>;
};
