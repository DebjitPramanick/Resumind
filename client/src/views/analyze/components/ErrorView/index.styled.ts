import styled, { keyframes } from "styled-components";
import { Text, Button } from "@/components/atoms";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => `${theme.colors.error}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.error}20`};
  border-radius: 12px;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled(Text)`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const Message = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const RetryButton = styled(Button)`
  min-width: 120px;
`;
