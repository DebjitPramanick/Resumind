import { QuestionDifficultyLevel } from "@/constants";
import * as Styled from "./index.styled";

interface QuestionConfigProps {
  difficulty: QuestionDifficultyLevel;
  role: string;
  questionCount: number;
}

export const QuestionConfig = ({
  difficulty,
  role,
  questionCount,
}: QuestionConfigProps) => {
  return (
    <Styled.Container>
      <Styled.ConfigItem>
        <Styled.Label>Role</Styled.Label>
        <Styled.Value>{role}</Styled.Value>
      </Styled.ConfigItem>
      <Styled.ConfigItem>
        <Styled.Label>Difficulty</Styled.Label>
        <Styled.DifficultyBadge difficulty={difficulty}>
          {difficulty}
        </Styled.DifficultyBadge>
      </Styled.ConfigItem>
      <Styled.ConfigItem>
        <Styled.Label>Questions</Styled.Label>
        <Styled.Value>{questionCount}</Styled.Value>
      </Styled.ConfigItem>
    </Styled.Container>
  );
};
