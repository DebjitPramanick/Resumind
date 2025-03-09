import { AlertCircle } from "react-feather";
import * as Styled from "./index.styled";

interface ErrorViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorView = ({
  title = "Error Generating Questions",
  message = "There was a problem generating your interview questions. Please try again.",
  onRetry,
}: ErrorViewProps) => {
  return (
    <Styled.Container>
      <Styled.IconWrapper>
        <AlertCircle size={48} />
      </Styled.IconWrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Message>{message}</Styled.Message>
      {onRetry && (
        <Styled.RetryButton variant="filled" size="small" onClick={onRetry}>
          Try Again
        </Styled.RetryButton>
      )}
    </Styled.Container>
  );
};
