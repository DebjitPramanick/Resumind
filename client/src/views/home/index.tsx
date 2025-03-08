import { useRouter } from "next/router";
import { Button, Flex } from "@/components/atoms";
import { FileUpload } from "./components/FileUpload";
import { PDFViewer } from "@/components/shared";
import { useAppContext } from "@/contexts";
import * as Styled from "./index.styled";
import { useTheme } from "styled-components";
import { QuestionConfig } from "./components/QuestionConfig";

export const HomeView = () => {
  const router = useRouter();
  const theme = useTheme();
  const {
    file,
    setFile,
    requirements,
    handleSetDifficulty,
    handleSetQuestionCount,
    handleSetRole,
  } = useAppContext();

  const handleFileSelect = async (file: File) => {
    setFile(file);
  };

  const handleGenerateQuestionsBtnClick = () => {
    router.push("/analyze");
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const isRequirementsValid = requirements.role.trim() !== "";

  if (!file) {
    return (
      <Styled.HomeContainer>
        <Styled.Title>Upload Resume</Styled.Title>
        <Styled.Subtitle>
          Drag and drop your resume or click to browse from your computer
        </Styled.Subtitle>
        <FileUpload onFileSelect={handleFileSelect} />
      </Styled.HomeContainer>
    );
  }

  return (
    <Styled.GridContainer>
      <Styled.PDFSection>
        <Styled.PDFHeader>
          <Flex alignItems="center">
            <Styled.FileIcon />
            <Flex flexDirection="column">
              <Styled.FileName>{file.name}</Styled.FileName>
              <Styled.FileSize>
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </Styled.FileSize>
            </Flex>
          </Flex>
          <Styled.RemoveButton onClick={handleRemoveFile}>
            Remove
          </Styled.RemoveButton>
        </Styled.PDFHeader>
        <Styled.PDFViewerContainer>
          <PDFViewer file={file} />
        </Styled.PDFViewerContainer>
      </Styled.PDFSection>

      <Styled.ConfigSection>
        <Styled.ConfigTitle>Configure Questions</Styled.ConfigTitle>
        <QuestionConfig
          difficulty={requirements.difficulty}
          role={requirements.role}
          questionCount={requirements.questionCount}
          onDifficultyChange={handleSetDifficulty}
          onRoleChange={handleSetRole}
          onQuestionCountChange={handleSetQuestionCount}
        />
        <Button
          variant="filled"
          size="large"
          fullWidth
          onClick={handleGenerateQuestionsBtnClick}
          disabled={!isRequirementsValid}
        >
          Generate Questions
        </Button>
      </Styled.ConfigSection>
    </Styled.GridContainer>
  );
};
