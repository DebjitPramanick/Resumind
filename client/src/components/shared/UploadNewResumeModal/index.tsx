import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts";
import { FileUpload } from "@/views/home/components/FileUpload";
import { Button } from "@/components/atoms";
import { X } from "react-feather";
import * as Styled from "./index.styled";
import { QuestionConfigStep } from "./components/QuestionConfigStep";
import { useImmer } from "use-immer";
import {
  QUESTION_DIFFICULTY_LEVELS,
  QuestionDifficultyLevel,
} from "@/constants";

interface UploadNewResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const UploadNewResumeModal = ({
  isOpen,
  onClose,
  onComplete,
}: UploadNewResumeModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [modalState, setModalState] = useImmer<{
    file: File | null;
    requirements: {
      difficulty: QuestionDifficultyLevel;
      role: string;
      questionCount: number;
    };
  }>({
    file: null,
    requirements: {
      difficulty: QUESTION_DIFFICULTY_LEVELS.EASY,
      role: "",
      questionCount: 10,
    },
  });

  const {
    setFile,
    handleSetDifficulty,
    handleSetQuestionCount,
    handleSetRole,
  } = useAppContext();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleFileSelect = (file: File) => {
    setModalState((draft) => {
      draft.file = file;
    });
    setCurrentStep(1);
  };

  const handleDifficultyChange = (difficulty: QuestionDifficultyLevel) => {
    setModalState((draft) => {
      draft.requirements.difficulty = difficulty;
    });
  };

  const handleRoleChange = (role: string) => {
    setModalState((draft) => {
      draft.requirements.role = role;
    });
  };

  const handleQuestionCountChange = (questionCount: number) => {
    setModalState((draft) => {
      draft.requirements.questionCount = questionCount;
    });
  };

  const handleNext = () => {
    setFile(modalState.file);
    handleSetDifficulty(modalState.requirements.difficulty);
    handleSetQuestionCount(modalState.requirements.questionCount);
    handleSetRole(modalState.requirements.role);
    onComplete();
  };

  const steps = [
    {
      title: "Upload Resume",
      subtitle:
        "Drag and drop your resume or click to browse from your computer",
      content: <FileUpload onFileSelect={handleFileSelect} />,
    },
    {
      title: "Configure Questions",
      subtitle: "Set your preferences for the interview questions",
      content: (
        <QuestionConfigStep
          difficulty={modalState.requirements.difficulty}
          role={modalState.requirements.role}
          questionCount={modalState.requirements.questionCount}
          onDifficultyChange={handleDifficultyChange}
          onRoleChange={handleRoleChange}
          onQuestionCountChange={handleQuestionCountChange}
        />
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isConfigValid = modalState.requirements.role.trim() !== "";

  return (
    <>
      <Styled.Overlay $isOpen={isOpen} onClick={onClose} />
      <Styled.Modal $isOpen={isOpen}>
        <Styled.Header>
          <div>
            <Styled.Title>{currentStepData.title}</Styled.Title>
            <Styled.Subtitle>{currentStepData.subtitle}</Styled.Subtitle>
          </div>
          <Styled.CloseButton onClick={onClose}>
            <X size={24} />
          </Styled.CloseButton>
        </Styled.Header>

        <Styled.Content>{currentStepData.content}</Styled.Content>

        <Styled.Footer>
          <Styled.StepIndicator>
            {steps.map((_, index) => (
              <Styled.StepDot
                key={index}
                $isActive={index === currentStep}
                $isCompleted={index < currentStep}
              />
            ))}
          </Styled.StepIndicator>

          {isLastStep && (
            <Button
              variant="filled"
              size="large"
              fullWidth
              onClick={handleNext}
              disabled={!isConfigValid}
            >
              Generate Questions
            </Button>
          )}
        </Styled.Footer>
      </Styled.Modal>
    </>
  );
};
