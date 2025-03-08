import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts";
import * as Styled from "./index.styled";
import { useParser, useRequestState } from "@/hooks";
import { Spinner, Text, Button } from "@/components/atoms";
import { questionsApi } from "@/api";

export const AnalyzeView = () => {
  const router = useRouter();
  const { file: pdfFile } = useAppContext();
  const { parse, state: parserState } = useParser();
  const [generateQuestionsRequestStates, generateQuestionsStatesHandler] =
    useRequestState();

  useEffect(() => {
    if (pdfFile) {
      parse(pdfFile);
    }
  }, [pdfFile, parse]);

  const handleRetry = () => {
    if (pdfFile) {
      parse(pdfFile);
    }
  };

  const handleUploadNew = () => {
    router.push("/");
  };

  const handleGenerateQuestions = async () => {
    try {
      generateQuestionsStatesHandler.pending();
      const context = parserState.data?.text || "";
      const payload = {
        role: "Frontend Developer",
        context,
      };
      const resp = await questionsApi.generateQuestions({
        payload,
      });
      generateQuestionsStatesHandler.fulfilled(resp);
    } catch (error) {
      generateQuestionsStatesHandler.rejected(error as Error);
    }
  };

  if (!pdfFile) {
    return null;
  }

  let nodeToRender;

  if (parserState.isPending) {
    nodeToRender = (
      <Styled.LoadingContainer>
        <Spinner size="large" />
        <Text>Analyzing your resume...</Text>
      </Styled.LoadingContainer>
    );
  }

  if (parserState.isFulfilled && parserState.data) {
    nodeToRender = (
      <>
        <Styled.Title>Resume Analysis</Styled.Title>
        {Object.entries(parserState.data.sections).map(([key, content]) => {
          if (!content.trim()) return null;

          return (
            <Styled.Section key={key}>
              <Styled.SectionTitle>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Styled.SectionTitle>
              <Styled.SectionContent>{content}</Styled.SectionContent>
            </Styled.Section>
          );
        })}
      </>
    );
  }

  if (parserState.isRejected) {
    nodeToRender = (
      <Styled.ErrorContainer>
        <Styled.ErrorIcon />
        <Styled.ErrorTitle>Analysis Failed</Styled.ErrorTitle>
        <Styled.ErrorMessage>
          We encountered an error while analyzing your resume. Please try again
          or upload a different file.
        </Styled.ErrorMessage>
        <Styled.ErrorActions>
          <Button variant="outlined" onClick={handleRetry}>
            Try Again
          </Button>
          <Button variant="filled" onClick={handleUploadNew}>
            Upload New File
          </Button>
        </Styled.ErrorActions>
      </Styled.ErrorContainer>
    );
  }

  return <Styled.AnalyzeContainer>{nodeToRender}</Styled.AnalyzeContainer>;
};
