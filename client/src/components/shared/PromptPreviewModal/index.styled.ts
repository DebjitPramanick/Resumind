import styled, { css, keyframes } from "styled-components";
import { Button } from "@/components/atoms";

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
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  animation: ${fadeIn} 0.2s ease-out forwards;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      animation: ${fadeIn} 0.2s ease-out reverse forwards;
    `}
`;

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
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  animation: ${slideIn} 0.2s ease-out forwards;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      animation: ${slideIn} 0.2s ease-out reverse forwards;
    `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CloseIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const PromptSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.span`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

export const PromptText = styled.pre`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CopyButton = styled(Button)`
  min-width: 120px;
`;

export const CloseButton = styled(Button)`
  min-width: 120px;
`;
