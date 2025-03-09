import * as Styled from "./index.styled";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface QuestionsProps {
  questions: Question[];
}

export const Questions = ({ questions }: QuestionsProps) => {
  return (
    <Styled.QuestionsList>
      {questions.map((question, index) => (
        <Styled.QuestionCard
          key={question.id}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Styled.QuestionHeader>
            <Styled.QuestionNumber>Question {index + 1}</Styled.QuestionNumber>
          </Styled.QuestionHeader>
          <Styled.QuestionContent>
            <Styled.QuestionText>{question.question}</Styled.QuestionText>
            <Styled.AnswerText>
              <span style={{ fontWeight: "bold" }}>Answer: </span>
              {question.answer}
            </Styled.AnswerText>
          </Styled.QuestionContent>
        </Styled.QuestionCard>
      ))}
    </Styled.QuestionsList>
  );
};
