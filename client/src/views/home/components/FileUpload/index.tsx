import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Flex, Box } from "@/components/atoms";
import * as Styled from "./index.styled";
import { useTheme } from "styled-components";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const isError = isDragReject || fileRejections.length > 0;

  return (
    <Styled.UploadSection
      {...getRootProps()}
      p="xl"
      gap="md"
      bg={
        isError
          ? `${theme.colors.error}10`
          : isDragActive
          ? `${theme.colors.primary}20`
          : undefined
      }
      borderColor={
        isError
          ? theme.colors.error
          : isDragActive
          ? theme.colors.primary
          : theme.colors.border
      }
    >
      <input {...getInputProps()} />
      <Flex direction="column" align="center" justify="center">
        <Styled.UploadIcon error={isError} />
        <Styled.UploadText>
          {isError
            ? "Please upload a PDF file"
            : "Drag and drop your PDF file here"}
        </Styled.UploadText>
        <Box mb="md">
          <Button as="label" variant="outlined" size="large">
            Choose File
          </Button>
        </Box>
        {isError && fileRejections.length > 0 && (
          <Styled.ErrorText>Only PDF files are allowed</Styled.ErrorText>
        )}
        {!isError && (
          <Styled.SupportedFormats>
            Supported format: PDF
          </Styled.SupportedFormats>
        )}
      </Flex>
    </Styled.UploadSection>
  );
};
