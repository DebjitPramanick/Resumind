import { Box, Button } from "@/components/atoms";
import { mediaQueryMobileOrTablet } from "@/styles/mixins";
import styled from "styled-components";

export const PDFHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FileInfo = styled(Box)`
  width: calc(100% - 120px);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FileName = styled.span`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  max-width: calc(100% - 12px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileSize = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const UploadNewButton = styled(Button).attrs({})`
  margin-left: auto;
  white-space: nowrap;
`;

export const PDFSection = styled(Box)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  height: 100%;
`;

export const PDFViewerContainer = styled(Box)`
  height: calc(100% - 78px);

  ${mediaQueryMobileOrTablet} {
    height: 600px;
  }
`;
