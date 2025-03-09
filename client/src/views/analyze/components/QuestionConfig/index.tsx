import {
  QuestionDifficultyLevel,
  QUESTION_DIFFICULTY_LEVELS,
} from "@/constants";
import * as Styled from "./index.styled";
import { useAppContext } from "@/contexts";

interface QuestionConfigProps {
  difficulty: QuestionDifficultyLevel;
  role: string;
  questionCount: number;
  onRegenerate: () => void;
}

export const QuestionConfig = ({
  difficulty,
  role,
  questionCount,
  onRegenerate,
}: QuestionConfigProps) => {
  const { handleSetDifficulty, handleSetQuestionCount, handleSetRole } =
    useAppContext();

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

      <Styled.RegenerateButton variant="filled" onClick={onRegenerate}>
        Regenerate Questions
      </Styled.RegenerateButton>
    </Styled.Container>
  );
};
