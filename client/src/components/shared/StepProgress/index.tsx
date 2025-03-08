import { useEffect, useState } from "react";
import { FileText, CheckCircle, HelpCircle, AlertCircle } from "react-feather";
import { Spinner } from "@/components/atoms";
import * as Styled from "./index.styled";

export interface Step {
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "error";
  error?: string;
  onRetry?: () => void;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const getStepIcon = (step: Step) => {
  if (step.status === "active") {
    return <Spinner size="small" color="white" />;
  }

  if (step.status === "error") {
    return <AlertCircle size={16} />;
  }

  if (step.status === "completed") {
    switch (step.title.toLowerCase()) {
      case "parsing resume":
        return <FileText size={16} />;
      case "generating questions":
        return <HelpCircle size={16} />;
      case "ready":
        return <CheckCircle size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  }

  return null;
};

export const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  const [animatedStep, setAnimatedStep] = useState(currentStep);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStep(currentStep);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <Styled.Container>
      {steps.map((step, index) => (
        <Styled.Step key={step.title}>
          <Styled.StepContent>
            <Styled.StepNumber status={step.status}>
              {getStepIcon(step) || index + 1}
            </Styled.StepNumber>
            <Styled.StepText>
              <Styled.StepTitle status={step.status}>
                {step.title}
              </Styled.StepTitle>
              <Styled.StepDescription>
                {step.description}
              </Styled.StepDescription>
              {step.status === "error" && step.error && (
                <Styled.StepError>{step.error}</Styled.StepError>
              )}
              {step.status === "error" && step.onRetry && (
                <Styled.RetryButton
                  variant="transparent"
                  size="small"
                  onClick={step.onRetry}
                >
                  Try Again
                </Styled.RetryButton>
              )}
            </Styled.StepText>
          </Styled.StepContent>
          {index < steps.length - 1 && (
            <Styled.StepConnector
              $isActive={index < animatedStep}
              $isAnimating={index === currentStep - 1}
              $hasError={step.status === "error"}
            />
          )}
        </Styled.Step>
      ))}
    </Styled.Container>
  );
};
