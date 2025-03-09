import * as Styled from "./index.styled";
import { PDFViewer } from "@/components/shared";
import { Box } from "@/components/atoms";
import { UploadNewResumeModal } from "@/components/shared/UploadNewResumeModal";
import { Collapse } from "@/components/molecules";
import { ChevronDown } from "react-feather";
import { useTheme } from "styled-components";
import { QuestionConfig } from "../QuestionConfig";
import { useAppContext } from "@/contexts";
import { useImmer } from "use-immer";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface QuestionsProps {
  questions: Question[];
  pdfFile: File;
  isVisible: boolean;
  onReset: () => void;
}

export const Questions = ({
  questions,
  pdfFile,
  isVisible,
  onReset,
}: QuestionsProps) => {
  const theme = useTheme();
  const { requirements } = useAppContext();

  const [currentState, setCurrentState] = useImmer({
    isConfigExpanded: false,
    isQuestionsExpanded: true,
    isModalOpen: false,
  });

  const handleToggleConfig = () => {
    setCurrentState((draft) => {
      draft.isConfigExpanded = !draft.isConfigExpanded;
    });
  };

  const handleToggleQuestions = () => {
    setCurrentState((draft) => {
      draft.isQuestionsExpanded = !draft.isQuestionsExpanded;
    });
  };

  const handleUploadNew = () => {
    setCurrentState((draft) => {
      draft.isModalOpen = true;
    });
  };

  const handleModalClose = () => {
    setCurrentState((draft) => {
      draft.isModalOpen = false;
    });
  };

  const handleModalComplete = () => {
    onReset();
    setCurrentState((draft) => {
      draft.isModalOpen = false;
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <Styled.Container>
        <Styled.PDFSection>
          <Styled.PDFHeader>
            <Styled.FileInfo>
              <Styled.FileName>{pdfFile.name}</Styled.FileName>
              <Styled.FileSize>
                {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
              </Styled.FileSize>
            </Styled.FileInfo>
            <Styled.UploadNewButton onClick={handleUploadNew}>
              Upload New
            </Styled.UploadNewButton>
          </Styled.PDFHeader>
          <Box height="calc(100% - 78px)">
            <PDFViewer file={pdfFile} />
          </Box>
        </Styled.PDFSection>

        <Styled.QuestionsSection>
          <Styled.SectionHeader onClick={handleToggleConfig}>
            <Styled.Title>Question Config</Styled.Title>
            <Styled.ExpandButton $isExpanded={currentState.isConfigExpanded}>
              <ChevronDown size={20} />
            </Styled.ExpandButton>
          </Styled.SectionHeader>
          <Collapse transitionIn={currentState.isConfigExpanded} duration={200}>
            <QuestionConfig
              difficulty={requirements.difficulty}
              role={requirements.role}
              questionCount={requirements.questionCount}
            />
          </Collapse>

          <Styled.SectionHeader
            onClick={handleToggleQuestions}
            style={{ marginTop: theme.spacing.md }}
          >
            <Styled.Title>Interview Questions</Styled.Title>
            <Styled.ExpandButton $isExpanded={currentState.isQuestionsExpanded}>
              <ChevronDown size={20} />
            </Styled.ExpandButton>
          </Styled.SectionHeader>
          <Collapse
            transitionIn={currentState.isQuestionsExpanded}
            duration={200}
          >
            <Styled.QuestionsList>
              {questions.map((question, index) => (
                <Styled.QuestionCard
                  key={question.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Styled.QuestionHeader>
                    <Styled.QuestionNumber>
                      Question {index + 1}
                    </Styled.QuestionNumber>
                  </Styled.QuestionHeader>
                  <Styled.QuestionContent>
                    <Styled.QuestionText>
                      {question.question}
                    </Styled.QuestionText>
                    <Styled.AnswerText>
                      <span style={{ fontWeight: "bold" }}>Answer: </span>
                      {question.answer}
                    </Styled.AnswerText>
                  </Styled.QuestionContent>
                </Styled.QuestionCard>
              ))}
            </Styled.QuestionsList>
          </Collapse>
        </Styled.QuestionsSection>
      </Styled.Container>

      <UploadNewResumeModal
        isOpen={currentState.isModalOpen}
        onClose={handleModalClose}
        onComplete={handleModalComplete}
      />
    </>
  );
};
