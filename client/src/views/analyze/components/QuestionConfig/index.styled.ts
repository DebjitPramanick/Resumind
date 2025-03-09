import { QuestionDifficultyLevel } from "@/constants";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0 0 12px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ConfigItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.span`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.secondary};
  min-width: 120px;
`;

export const Value = styled.span`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const DifficultyBadge = styled.span<{
  difficulty: QuestionDifficultyLevel;
}>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 4px;
  ${({ theme }) => theme.typography.caption};
  font-weight: 600;
  text-transform: capitalize;
  background: ${({ theme, difficulty }) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return `${theme.colors.success}20`;
      case "medium":
        return `${theme.colors.warning}20`;
      case "hard":
        return `${theme.colors.error}20`;
      default:
        return theme.colors.surface;
    }
  }};
  color: ${({ theme, difficulty }) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return theme.colors.success;
      case "medium":
        return theme.colors.warning;
      case "hard":
        return theme.colors.error;
      default:
        return theme.colors.text.primary;
    }
  }};
`;
