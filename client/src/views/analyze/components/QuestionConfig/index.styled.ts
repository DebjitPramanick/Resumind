import { QuestionDifficultyLevel } from "@/constants";
import styled from "styled-components";
import { Button } from "@/components/atoms";

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

export const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  ${({ theme }) => theme.typography.body2};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CounterInput = styled(Input)`
  max-width: 80px;
`;

export const DifficultyToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface DifficultyButtonProps {
  $isActive: boolean;
  $difficulty: QuestionDifficultyLevel;
}

export const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  border: none;
  text-transform: capitalize;
  background: ${({ theme, $isActive, $difficulty }) => {
    if (!$isActive) return theme.colors.surface;
    switch ($difficulty.toLowerCase()) {
      case "easy":
        return `${theme.colors.success}10`;
      case "moderate":
        return `${theme.colors.warning}10`;
      case "hard":
        return `${theme.colors.error}10`;
      default:
        return theme.colors.surface;
    }
  }};
  color: ${({ theme, $isActive, $difficulty }) => {
    if (!$isActive) return theme.colors.text.secondary;
    switch ($difficulty.toLowerCase()) {
      case "easy":
        return theme.colors.success;
      case "moderate":
        return theme.colors.warning;
      case "hard":
        return theme.colors.error;
      default:
        return theme.colors.text.primary;
    }
  }};
  cursor: pointer;
  ${({ theme }) => theme.typography.caption};
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $difficulty }) => {
      switch ($difficulty.toLowerCase()) {
        case "easy":
          return `${theme.colors.success}10`;
        case "medium":
          return `${theme.colors.warning}10`;
        case "hard":
          return `${theme.colors.error}10`;
        default:
          return theme.colors.surfaceAlt;
      }
    }};
  }
`;

export const RegenerateButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const PromptSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

export const PromptHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const PromptTitle = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

export const PromptContent = styled.div<{ $isVisible: boolean }>`
  padding: ${({ theme, $isVisible }) => ($isVisible ? theme.spacing.sm : 0)};
  height: ${({ $isVisible }) => ($isVisible ? "auto" : 0)};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  overflow: hidden;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PromptText = styled.pre`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text.secondary};
  ${({ theme }) => theme.typography.caption};
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ExpandButtonProps {
  $isExpanded: boolean;
}

export const ExpandButton = styled.div<ExpandButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: transform 0.2s ease;
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? "-180deg" : "0deg")});
`;

export const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.secondary};
  ${({ theme }) => theme.typography.body2};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
