import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts";
import * as Styled from "./index.styled";
import { useParser, useRequestState } from "@/hooks";
import { questionsApi } from "@/api";
import { StepProgress, Step, PromptPreviewModal } from "@/components/shared";
import { useImmer } from "use-immer";
import { parseAIResponse } from "@/utils";
import { Questions } from "./components/Questions";
import { Box, Flex, Spinner } from "@/components/atoms";
import { UploadNewResumeModal } from "@/components/shared/UploadNewResumeModal";
import PDFViewSection from "./components/PDFViewSection";
import { ChevronDown } from "react-feather";
import { Collapse } from "@/components/molecules";
import { QuestionConfig } from "./components/QuestionConfig";
import { ErrorView } from "./components/ErrorView";
import { useTheme } from "styled-components";
import { LoadingView } from "./components/LoadingView";
import Prompt from "@/prompt";

const STEP_CHANGE_DELAY = 1000;

export const AnalyzeView = () => {
  const router = useRouter();
  const theme = useTheme();
  const { file: pdfFile, requirements } = useAppContext();
  const { parse, state: parserState } = useParser();
  const [generateQuestionsRequestStates, generateQuestionsStatesHandler] =
    useRequestState();

  const [pageState, setPageState] = useImmer({
    currentStep: 0,
    isReadyToShowQuestions: false,
    questions: [],
    isUploadModalOpen: false,
    isConfigExpanded: false,
    isQuestionsExpanded: true,
    isPromptModalOpen: false,
  });

  const generateQuestions = async () => {
    try {
      generateQuestionsStatesHandler.pending();
      const context = parserState.data?.text || "";
      const payload = {
        role: requirements.role,
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

  const handleUploadModalOpen = () => {
    setPageState((draft) => {
      draft.isUploadModalOpen = true;
    });
  };

  const handleRegenerateQuestions = () => {
    setPageState((draft) => {
      draft.isConfigExpanded = false;
    });
    generateQuestions();
  };

  const handleUploadModalClose = () => {
    setPageState((draft) => {
      draft.isUploadModalOpen = false;
    });
  };

  const handleUploadModalComplete = () => {
    setPageState((draft) => {
      draft.currentStep = 0;
      draft.isReadyToShowQuestions = false;
      draft.questions = [];
      draft.isUploadModalOpen = false;
    });
    parse(pdfFile as File);
  };

  const handleToggleConfig = () => {
    if (generateQuestionsRequestStates.isPending) {
      return;
    }
    setPageState((draft) => {
      draft.isConfigExpanded = !draft.isConfigExpanded;
    });
  };

  const handleToggleQuestions = () => {
    if (generateQuestionsRequestStates.isPending) {
      return;
    }
    setPageState((draft) => {
      draft.isQuestionsExpanded = !draft.isQuestionsExpanded;
    });
  };

  const handleOpenPromptModal = () => {
    setPageState((draft) => {
      draft.isPromptModalOpen = true;
    });
  };

  const handleClosePromptModal = () => {
    setPageState((draft) => {
      draft.isPromptModalOpen = false;
    });
  };

  const prompt = Prompt.generate({
    role: requirements.role,
    context: parserState.data?.text || "",
    questionCount: requirements.questionCount,
    difficultyLevel: requirements.difficulty,
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
    let questionsNode;

    if (generateQuestionsRequestStates.isPending) {
      questionsNode = (
        <LoadingView
          title="Generating Questions"
          message="Please wait while we analyze your resume and create tailored interview questions..."
        />
      );
    } else if (generateQuestionsRequestStates.isFulfilled) {
      const { choices } = generateQuestionsRequestStates.data;
      const jsonContent = choices[0].message.content;
      let questions = parseAIResponse(jsonContent);

      if (questions && !Array.isArray(questions)) {
        questions = questions.questions;
      } else if (!questions) {
        questions = [];
      }
      questionsNode = (
        <Collapse transitionIn={pageState.isQuestionsExpanded} duration={300}>
          <Questions questions={questions} />
        </Collapse>
      );
    } else if (generateQuestionsRequestStates.isRejected) {
      const errorMessage = "Failed to generate questions. Please try again.";
      questionsNode = (
        <ErrorView
          title="Error Generating Questions"
          message={errorMessage}
          onRetry={handleRegenerateQuestions}
        />
      );
    }

    nodeToRender = (
      <Styled.ResultContainer>
        <PDFViewSection
          pdfFile={pdfFile as File}
          onUploadNew={handleUploadModalOpen}
        />
        <Box style={{ height: "100%", overflowY: "auto" }}>
          <Styled.SectionHeader onClick={handleToggleConfig}>
            <Styled.SectionTitle>Question Config</Styled.SectionTitle>
            {generateQuestionsRequestStates.isPending ? null : (
              <Styled.ExpandButton $isExpanded={pageState.isConfigExpanded}>
                <ChevronDown size={20} />
              </Styled.ExpandButton>
            )}
          </Styled.SectionHeader>
          <Collapse transitionIn={pageState.isConfigExpanded} duration={300}>
            <QuestionConfig
              difficulty={requirements.difficulty}
              role={requirements.role}
              questionCount={requirements.questionCount}
              onRegenerate={handleRegenerateQuestions}
              onOpenPromptModal={handleOpenPromptModal}
            />
          </Collapse>
          <Styled.SectionHeader
            onClick={handleToggleQuestions}
            style={{
              marginTop: theme.spacing.md,
            }}
          >
            <Styled.SectionTitle>Interview Questions</Styled.SectionTitle>
            {generateQuestionsRequestStates.isPending ? null : (
              <Styled.ExpandButton $isExpanded={pageState.isQuestionsExpanded}>
                <ChevronDown size={20} />
              </Styled.ExpandButton>
            )}
          </Styled.SectionHeader>
          {questionsNode}
        </Box>
      </Styled.ResultContainer>
    );
  } else {
    nodeToRender = (
      <StepProgress steps={steps} currentStep={pageState.currentStep} />
    );
  }

  return (
    <>
      <Styled.AnalyzeContainer>{nodeToRender}</Styled.AnalyzeContainer>
      <UploadNewResumeModal
        isOpen={pageState.isUploadModalOpen}
        onClose={handleUploadModalClose}
        onComplete={handleUploadModalComplete}
      />
      <PromptPreviewModal
        isOpen={pageState.isPromptModalOpen}
        onClose={handleClosePromptModal}
        prompt={prompt}
      />
    </>
  );
};
