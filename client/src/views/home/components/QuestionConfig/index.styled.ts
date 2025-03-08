import styled from "styled-components";
import {
  QUESTION_DIFFICULTY_LEVELS,
  QuestionDifficultyLevel,
} from "@/constants";
import { Text } from "@/components/atoms";

const getDifficultyColor = (difficulty: QuestionDifficultyLevel) => {
  switch (difficulty) {
    case QUESTION_DIFFICULTY_LEVELS.EASY:
      return "success";
    case QUESTION_DIFFICULTY_LEVELS.MEDIUM:
      return "warning";
    case QUESTION_DIFFICULTY_LEVELS.HARD:
      return "error";
    default:
      return "primary";
  }
};

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Section = styled.div`
  width: 100%;
`;

export const DifficultyToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  width: fit-content;
`;

interface DifficultyButtonProps {
  active: boolean;
  difficulty: QuestionDifficultyLevel;
}

export const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: 8px;
  border: none;
  background: ${({ theme, active, difficulty }) =>
    active
      ? `${theme.colors[getDifficultyColor(difficulty)]}AD`
      : "transparent"};
  color: ${({ theme, active }) =>
    active ? theme.colors.text.primary : theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;

  &:hover {
    background: ${({ theme, difficulty }) =>
      `${theme.colors[getDifficultyColor(difficulty)]}75`};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

interface InputProps {
  $hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  ${({ theme }) => theme.typography.body1};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

export const QuestionCountSlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;

  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    height: 4px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.border};
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

export const SectionTitle = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ErrorText = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;
