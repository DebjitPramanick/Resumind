import styled, { css } from "styled-components";
import { Upload } from "react-feather";
import { Box } from "@/components/atoms";

interface UploadSectionProps {
  borderColor?: string;
}

export const UploadSection = styled(Box)<UploadSectionProps>`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed
    ${({ borderColor, theme }) => borderColor || theme.colors.border};
  border-radius: 16px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

interface UploadIconProps {
  error?: boolean;
}

export const UploadIcon = styled(Upload)<UploadIconProps>`
  width: 48px;
  height: 48px;
  color: ${({ theme, error }) =>
    error ? theme.colors.error : theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const UploadText = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const SupportedFormats = styled.p`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.disabled};
`;

export const ErrorText = styled.p`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.error};
`;
