import { useEffect, useState } from "react";
import * as Styled from "./index.styled";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPDF = async () => {
      if (pdfFile.type === "application/pdf") {
        const url = URL.createObjectURL(pdfFile);
        setPdfUrl(`${url}#toolbar=0&view=FitH`);
      } else {
        alert("Please upload a valid PDF file.");
      }
    };

    loadPDF();
  }, [pdfFile]);

  if (!isVisible) return null;

  return (
    <Styled.Container>
      <Styled.PDFSection>
        <Styled.PDFViewer>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{ border: "1px solid #ccc" }}
            />
          )}
        </Styled.PDFViewer>
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
