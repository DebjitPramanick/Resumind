import { useState } from "react";
import { ChevronDown, Copy, Check, Eye } from "react-feather";
import { useClipboard } from "@/hooks";
import {
  QuestionDifficultyLevel,
  QUESTION_DIFFICULTY_LEVELS,
} from "@/constants";
import * as Styled from "./index.styled";
import { useAppContext } from "@/contexts";
import { PromptPreviewModal } from "@/components/shared/PromptPreviewModal";

interface QuestionConfigProps {
  prompt: string;
  difficulty: QuestionDifficultyLevel;
  role: string;
  questionCount: number;
  onRegenerate: () => void;
}

export const QuestionConfig = ({
  prompt,
  difficulty,
  role,
  questionCount,
  onRegenerate,
}: QuestionConfigProps) => {
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const { copy, copied } = useClipboard();
  const { handleSetDifficulty, handleSetQuestionCount, handleSetRole } =
    useAppContext();

  const handleOpenPromptModal = () => {
    setIsPromptModalOpen(true);
  };

  const handleClosePromptModal = () => {
    setIsPromptModalOpen(false);
  };

  const handleCopyPrompt = () => {
    copy(prompt);
  };

  const handleDifficultyChange = (newDifficulty: QuestionDifficultyLevel) => {
    handleSetDifficulty(newDifficulty);
  };

  const handleQuestionCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = Math.min(30, Math.max(5, Number(event.target.value)));
    handleSetQuestionCount(count);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetRole(event.target.value);
  };

  return (
    <Styled.Container>
      <Styled.ConfigItem>
        <Styled.Label>Role</Styled.Label>
        <Styled.Input
          type="text"
          value={role}
          onChange={handleRoleChange}
          placeholder="e.g. Frontend Developer"
        />
      </Styled.ConfigItem>

      <Styled.ConfigItem>
        <Styled.Label>Difficulty</Styled.Label>
        <Styled.DifficultyToggle>
          {Object.values(QUESTION_DIFFICULTY_LEVELS).map((level) => (
            <Styled.DifficultyButton
              key={level}
              $isActive={difficulty === level}
              $difficulty={level}
              onClick={() => handleDifficultyChange(level)}
            >
              {level}
            </Styled.DifficultyButton>
          ))}
        </Styled.DifficultyToggle>
      </Styled.ConfigItem>

      <Styled.ConfigItem>
        <Styled.Label>Questions</Styled.Label>
        <Styled.CounterInput
          type="number"
          min={5}
          max={30}
          value={questionCount}
          onChange={handleQuestionCountChange}
        />
      </Styled.ConfigItem>

      <Styled.ConfigItem>
        <Styled.Label>Prompt</Styled.Label>
        <Styled.PreviewButton onClick={handleOpenPromptModal}>
          <Eye size={16} />
          Preview Prompt
        </Styled.PreviewButton>
      </Styled.ConfigItem>

      <Styled.RegenerateButton variant="filled" onClick={onRegenerate}>
        Regenerate Questions
      </Styled.RegenerateButton>

      <PromptPreviewModal
        isOpen={isPromptModalOpen}
        onClose={handleClosePromptModal}
        prompt={prompt}
      />
    </Styled.Container>
  );
};
