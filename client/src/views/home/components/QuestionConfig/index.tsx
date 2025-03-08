import { useTheme } from "styled-components";
import { Button, Flex, Text } from "@/components/atoms";
import { QUESTION_DIFFICULTY, QuestionDifficulty } from "@/constants";
import * as Styled from "./index.styled";

interface QuestionConfigProps {
  difficulty: QuestionDifficulty;
  role: string;
  questionCount: number;
  onDifficultyChange: (difficulty: QuestionDifficulty) => void;
  onRoleChange: (role: string) => void;
  onQuestionCountChange: (count: number) => void;
  onAnalyze: () => void;
}

export const QuestionConfig = ({
  difficulty,
  role,
  questionCount,
  onDifficultyChange,
  onRoleChange,
  onQuestionCountChange,
  onAnalyze,
}: QuestionConfigProps) => {
  const theme = useTheme();

  return (
    <Styled.Container>
      <Styled.Section>
        <Styled.SectionTitle>Question Difficulty</Styled.SectionTitle>
        <Styled.DifficultyToggle>
          {Object.values(QUESTION_DIFFICULTY).map((level) => (
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
        <Styled.SectionTitle>Target Role</Styled.SectionTitle>
        <Styled.Input
          type="text"
          placeholder="e.g. Frontend Developer"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        />
      </Styled.Section>

      <Styled.Section>
        <Flex alignItems="center" justifyContent="space-between">
          <Styled.SectionTitle>Number of Questions</Styled.SectionTitle>
          <Styled.SectionTitle>{questionCount} questions</Styled.SectionTitle>
        </Flex>
        <Styled.QuestionCountSlider>
          <input
            type="range"
            min="5"
            max="30"
            value={questionCount}
            onChange={(e) => onQuestionCountChange(Number(e.target.value))}
          />
        </Styled.QuestionCountSlider>
      </Styled.Section>

      <Button variant="filled" size="large" fullWidth onClick={onAnalyze}>
        Generate Questions
      </Button>
    </Styled.Container>
  );
};
