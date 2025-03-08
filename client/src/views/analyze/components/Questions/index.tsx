import { useEffect } from "react";
import * as Styled from "./index.styled";
import { PDFViewer } from "@/components/shared";
import { Box, Button } from "@/components/atoms";
import { Upload } from "react-feather";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface QuestionsProps {
  questions: Question[];
  pdfFile: File;
  isVisible: boolean;
}

export const Questions = ({
  questions,
  pdfFile,
  isVisible,
}: QuestionsProps) => {
  const { resetFileData } = useAppContext();
  const router = useRouter();

  const handleUploadNew = () => {
    router.push("/");
    resetFileData();
  };

  if (!isVisible) return null;

  return (
    <Styled.Container>
      <Styled.PDFSection>
        <Styled.PDFHeader>
          <Styled.FileInfo>
            <Styled.FileName>{pdfFile.name}</Styled.FileName>
            <Styled.FileSize>
              {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
            </Styled.FileSize>
          </Styled.FileInfo>
          <Styled.UploadNewButton onClick={handleUploadNew}>
            Upload New
          </Styled.UploadNewButton>
        </Styled.PDFHeader>
        <Box height="calc(100% - 78px)">
          <PDFViewer file={pdfFile} />
        </Box>
      </Styled.PDFSection>

      <Styled.QuestionsSection>
        <Styled.QuestionsHeader>
          <Styled.Title>Interview Questions</Styled.Title>
        </Styled.QuestionsHeader>

        <Styled.QuestionsList>
          {questions.map((question, index) => (
            <Styled.QuestionCard
              key={question.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Styled.QuestionHeader>
                <Styled.QuestionNumber>
                  Question {index + 1}
                </Styled.QuestionNumber>
              </Styled.QuestionHeader>
              <Styled.QuestionContent>
                <Styled.QuestionText>{question.question}</Styled.QuestionText>
                <Styled.AnswerText>{question.answer}</Styled.AnswerText>
              </Styled.QuestionContent>
            </Styled.QuestionCard>
          ))}
        </Styled.QuestionsList>
      </Styled.QuestionsSection>
    </Styled.Container>
  );
};
