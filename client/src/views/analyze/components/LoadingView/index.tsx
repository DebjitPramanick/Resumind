import { Spinner } from "@/components/atoms";
import * as Styled from "./index.styled";

interface LoadingViewProps {
  title?: string;
  message?: string;
}

export const LoadingView = ({
  title = "Generating Questions",
  message = "Please wait while we analyze your resume and create tailored interview questions...",
}: LoadingViewProps) => {
  return (
    <Styled.Container>
      <Styled.SpinnerWrapper>
        <Spinner size="large" />
      </Styled.SpinnerWrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Message>{message}</Styled.Message>
    </Styled.Container>
  );
};
