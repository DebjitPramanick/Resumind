import styled, { css, keyframes } from "styled-components";
import { Button } from "@/components/atoms";

const progressAnimation = keyframes`
  from {
    height: 0%;
  }
  to {
    height: 100%;
  }
`;

export const Container = styled.div`
  height: calc(100vh - 72px - 32px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  width: fit-content;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Step = styled.div`
  position: relative;
`;

export const StepContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

interface StepProps {
  status: "pending" | "active" | "completed" | "error";
}

export const StepNumber = styled.div<StepProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, status }) => {
    switch (status) {
      case "active":
        return theme.colors.primary;
      case "completed":
        return theme.colors.success;
      case "error":
        return theme.colors.error;
      default:
        return theme.colors.surface;
    }
  }};
  border: 2px solid
    ${({ theme, status }) => {
      switch (status) {
        case "active":
          return theme.colors.primary;
        case "completed":
          return theme.colors.success;
        case "error":
          return theme.colors.error;
        default:
          return theme.colors.border;
      }
    }};
  color: ${({ theme, status }) =>
    status === "pending"
      ? theme.colors.text.secondary
      : theme.colors.text.primary};
  ${({ theme }) => theme.typography.h3};
  flex-shrink: 0;
`;

export const StepText = styled.div`
  flex: 1;
`;

export const StepTitle = styled.h3<StepProps>`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme, status }) =>
    status === "pending"
      ? theme.colors.text.disabled
      : theme.colors.text.primary};
  margin: 0;
  transition: color 0.3s ease-in-out;
`;

export const StepDescription = styled.p`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
`;

interface StepConnectorProps {
  $isActive: boolean;
  $isAnimating: boolean;
  $hasError?: boolean;
}

export const StepConnector = styled.div<StepConnectorProps>`
  position: absolute;
  left: 24px;
  top: 48px;
  bottom: -48px;
  width: 2px;
  background: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : theme.colors.border};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ $isActive, $isAnimating }) =>
      $isActive && !$isAnimating ? "100%" : "0%"};
    width: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform-origin: top;
    transition: height 1s ease-in-out;
    animation: ${({ $isAnimating }) =>
      $isAnimating
        ? css`
            ${progressAnimation} 1s ease-in-out forwards
          `
        : "none"};
  }
`;

export const StepError = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

export const RetryButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0;

  &:hover {
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.8;
  }
`;
