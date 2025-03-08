import { useTheme } from "styled-components";
import {
  QUESTION_DIFFICULTY_LEVELS,
  QuestionDifficultyLevel,
} from "@/constants";
import * as Styled from "./index.styled";

interface QuestionConfigStepProps {
  difficulty: QuestionDifficultyLevel;
  role: string;
  questionCount: number;
  onDifficultyChange: (difficulty: QuestionDifficultyLevel) => void;
  onRoleChange: (role: string) => void;
  onQuestionCountChange: (count: number) => void;
}

export const QuestionConfigStep = ({
  difficulty,
  role,
  questionCount,
  onDifficultyChange,
  onRoleChange,
  onQuestionCountChange,
}: QuestionConfigStepProps) => {
  const isRoleValid = role.trim() !== "";

  return (
    <Styled.Container>
      <Styled.Section>
        <Styled.SectionTitle>Target Role</Styled.SectionTitle>
        <Styled.Input
          type="text"
          placeholder="e.g. Frontend Developer"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          $hasError={!isRoleValid && role !== ""}
        />
        {!isRoleValid && role !== "" && (
          <Styled.ErrorText>Please enter a valid role</Styled.ErrorText>
        )}
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Question Difficulty</Styled.SectionTitle>
        <Styled.DifficultyToggle>
          {Object.values(QUESTION_DIFFICULTY_LEVELS).map((level) => (
            <Styled.DifficultyButton
              key={level}
              active={difficulty === level}
              difficulty={level}
              onClick={() => onDifficultyChange(level)}
            >
              {level}
            </Styled.DifficultyButton>
          ))}
        </Styled.DifficultyToggle>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Number of Questions</Styled.SectionTitle>
        <Styled.QuestionCount>
          <Styled.QuestionCountValue>{questionCount}</Styled.QuestionCountValue>
          <Styled.QuestionCountSlider
            type="range"
            min="5"
            max="30"
            value={questionCount}
            onChange={(e) => onQuestionCountChange(Number(e.target.value))}
          />
        </Styled.QuestionCount>
      </Styled.Section>
    </Styled.Container>
  );
};
