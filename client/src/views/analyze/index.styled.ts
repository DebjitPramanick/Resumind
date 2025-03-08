import styled from "styled-components";
import { Box, Text, Flex } from "@/components/atoms";
import { AlertCircle } from "react-feather";

export const AnalyzeContainer = styled(Box)`
  margin: 0 auto;
  height: calc(100vh - 72px - 64px);
`;

export const Title = styled(Text)`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled(Text)`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SectionContent = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-line;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.colors.utils.shadow.sm};
`;

export const LoadingContainer = styled(Flex)`
  width: 100%;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  ${Text} {
    ${({ theme }) => theme.typography.body1};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ErrorContainer = styled(Flex)`
  width: 100%;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => `${theme.colors.error}20`};
`;

export const ErrorIcon = styled(AlertCircle)`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ErrorTitle = styled(Text)`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

export const ErrorMessage = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  max-width: 500px;
`;

export const ErrorActions = styled(Flex)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;
