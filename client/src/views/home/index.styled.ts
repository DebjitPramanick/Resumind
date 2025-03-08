import { Box } from "@/components/atoms";
import styled from "styled-components";

export const HomeContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;
