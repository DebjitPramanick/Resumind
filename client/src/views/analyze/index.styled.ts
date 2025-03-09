import styled, { keyframes } from "styled-components";
import { Box, Text, Flex } from "@/components/atoms";
import { AlertCircle } from "react-feather";
import { mediaQueryMobileOrTablet } from "@/styles/mixins";

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

export const AnalyzeContainer = styled(Box)`
  margin: 0 auto;
  height: calc(100vh - 72px - 32px);

  ${mediaQueryMobileOrTablet} {
    height: auto;
  }
`;

export const ResultContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  height: 100%;
  animation: ${fadeIn} 0.5s ease-out forwards;

  ${mediaQueryMobileOrTablet} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const Title = styled(Text)`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

  & + & {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const SectionTitle = styled(Text)`
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
