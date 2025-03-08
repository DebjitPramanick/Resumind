import styled, { css, keyframes } from "styled-components";
import { Text } from "@/components/atoms";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

interface AnimatedProps {
  $isOpen: boolean;
}

export const Modal = styled.div<AnimatedProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.utils.shadow.lg};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  opacity: 0;
  animation: ${slideIn} 0.2s ease-out forwards;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      animation: ${slideIn} 0.2s ease-out reverse forwards;
    `}
`;

export const Overlay = styled.div<AnimatedProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease-out forwards;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      animation: ${fadeIn} 0.2s ease-out reverse forwards;
    `}
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled(Text)`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const Subtitle = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  min-height: 300px;
`;

export const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface StepDotProps {
  $isActive: boolean;
  $isCompleted: boolean;
}

export const StepDot = styled.div<StepDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, $isActive, $isCompleted }) =>
    $isActive || $isCompleted ? theme.colors.primary : theme.colors.border};
  transition: all 0.2s ease;
`;
