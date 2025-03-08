import styled, { css, keyframes } from "styled-components";
import { Spinner } from "@/components/atoms";

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
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
  status: "pending" | "active" | "completed";
}

export const StepNumber = styled.div<StepProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background: ${({ theme, status }) =>
    status === "completed"
      ? theme.colors.success
      : status === "active"
      ? theme.colors.primary
      : theme.colors.surface};
  color: ${({ theme, status }) =>
    status === "pending"
      ? theme.colors.text.secondary
      : theme.colors.text.primary};
  border: 2px solid
    ${({ theme, status }) =>
      status === "pending" ? theme.colors.border : "transparent"};

  svg {
    animation: ${({ status }) =>
      status === "active" ? "spin 1s linear infinite" : "none"};
  }
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
}

export const StepConnector = styled.div<StepConnectorProps>`
  position: absolute;
  left: 16px;
  top: 40px;
  bottom: -24px;
  width: 2px;
  background: ${({ theme }) => theme.colors.border};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform-origin: top;
    transform: scaleY(${({ $isActive }) => ($isActive ? 1 : 0)});
    transition: transform 1s ease-in-out;
    animation: ${({ $isAnimating }) =>
      $isAnimating
        ? css`
            ${progressAnimation} 1s ease-in-out forwards
          `
        : "none"};
  }
`;
