import { Box, Button, Text } from "@/components/atoms";
import styled, { keyframes } from "styled-components";
import { File, Check } from "react-feather";

export const HomeContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled(Text)`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

export const Subtitle = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const ErrorMessage = styled(Text)`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const FileSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SelectedFile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.colors.utils.shadow.sm};
`;

export const FileIcon = styled(File)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

export const FileName = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const FileSize = styled(Text)`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const RemoveButton = styled(Button).attrs({
  variant: "transparent",
  size: "small",
})`
  margin-left: auto;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const checkmarkAnimation = keyframes`
  0% {
    height: 0;
    width: 0;
    opacity: 0;
  }
  20% {
    height: 0;
    width: ${({ theme }) => theme.spacing.md};
    opacity: 1;
  }
  40% {
    height: ${({ theme }) => theme.spacing.md};
    width: ${({ theme }) => theme.spacing.md};
    opacity: 1;
  }
  100% {
    height: ${({ theme }) => theme.spacing.md};
    width: ${({ theme }) => theme.spacing.md};
    opacity: 1;
  }
`;

export const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleAnimation} 0.3s ease-in-out;
`;

export const CheckMark = styled(Check)`
  color: white;
  width: 32px;
  height: 32px;
  stroke-width: 3;
  animation: ${checkmarkAnimation} 0.3s ease-in-out forwards;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  height: calc(100vh - 72px - 32px);
  width: 100%;
`;

export const PDFSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  height: 100%;
`;

export const PDFHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PDFViewerContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ConfigSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ConfigTitle = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;
