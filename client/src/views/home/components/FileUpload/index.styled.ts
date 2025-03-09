import styled from "styled-components";
import { Upload } from "react-feather";
import { Flex, Text } from "@/components/atoms";
import type { FlexProps } from "@/components/atoms/Flex";

interface UploadSectionProps extends FlexProps {
  borderColor?: string;
}

export const UploadSection = styled(Flex)<UploadSectionProps>`
  width: 100%;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed
    ${({ borderColor, theme }) => borderColor || theme.colors.border};
  border-radius: 16px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.colors.utils.shadow.sm};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}05`};
    box-shadow: ${({ theme }) => theme.colors.utils.shadow.md};
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

export const UploadText = styled(Text)`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const SupportedFormats = styled(Text)`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.disabled};
`;

export const ErrorText = styled(Text)`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.error};
`;
