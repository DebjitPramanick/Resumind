import { Box, Button, Text } from "@/components/atoms";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  height: 100%;
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

export const PDFSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  height: 100%;
`;

export const PDFViewer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.xs};

  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

export const QuestionsSection = styled(Box)`
  height: 100%;
  overflow-y: auto;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px 12px 0 0;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  cursor: pointer;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const Title = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
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

export const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0 0 12px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  max-height: auto;
`;

export const QuestionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-fill-mode: both;
`;

export const QuestionHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px 12px 0 0;
`;

export const QuestionNumber = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const QuestionContent = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

export const QuestionText = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const AnswerText = styled.p`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  white-space: pre-wrap;
`;

export const PDFHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FileName = styled.span`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const FileSize = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const UploadNewButton = styled(Button).attrs({})`
  margin-left: auto;
`;
