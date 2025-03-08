import { useRouter } from "next/router";
import { Button, Flex } from "@/components/atoms";
import { FileUpload } from "./components/FileUpload";
import { useAppContext } from "@/contexts";
import * as Styled from "./index.styled";
import { useTheme } from "styled-components";

export const HomeView = () => {
  const router = useRouter();
  const theme = useTheme();
  const { file, setFile } = useAppContext();

  const handleFileSelect = async (file: File) => {
    setFile(file);
  };

  const handleAnalyze = () => {
    router.push("/analyze");
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  let nodeToRender = null;

  if (!file) {
    nodeToRender = (
      <>
        <Styled.Title>Upload Resume</Styled.Title>
        <Styled.Subtitle>
          Drag and drop your resume or click to browse from your computer
        </Styled.Subtitle>
        <FileUpload onFileSelect={handleFileSelect} />
      </>
    );
  } else {
    nodeToRender = (
      <>
        <Flex
          alignItems="center"
          justifyContent="center"
          mb={theme.spacing.xxl}
        >
          <Styled.SuccessIcon>
            <Styled.CheckMark />
          </Styled.SuccessIcon>
          <Styled.Title ml={theme.spacing.md}>
            Resume Uploaded Successfully
          </Styled.Title>
        </Flex>
        <Styled.FileSection>
          <Styled.SelectedFile>
            <Styled.FileIcon />
            <Flex flexDirection="column">
              <Styled.FileName>{file.name}</Styled.FileName>
              <Styled.FileSize mt={theme.spacing.xs}>
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </Styled.FileSize>
            </Flex>
            <Styled.RemoveButton onClick={handleRemoveFile}>
              Remove
            </Styled.RemoveButton>
          </Styled.SelectedFile>
          <Styled.ActionButtons>
            <Button
              variant="filled"
              size="large"
              fullWidth
              onClick={handleAnalyze}
            >
              Analyze Resume
            </Button>
          </Styled.ActionButtons>
        </Styled.FileSection>
      </>
    );
  }

  return <Styled.HomeContainer>{nodeToRender}</Styled.HomeContainer>;
};
