import { useEffect, useState } from "react";
import { FileText, CheckCircle, HelpCircle } from "react-feather";
import { Spinner } from "@/components/atoms";
import * as Styled from "./index.styled";

export interface Step {
  title: string;
  description: string;
  status: "pending" | "active" | "completed";
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const getStepIcon = (index: number, status: Step["status"]) => {
  if (status === "active") {
    return <Spinner size="small" color="white" />;
  }

  if (status === "completed") {
    switch (index) {
      case 0: // Resume parsing
        return <FileText size={16} />;
      case 1: // Question generation
        return <HelpCircle size={16} />;
      case 2: // Ready
        return <CheckCircle size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  }

  return index + 1;
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
              {getStepIcon(index, step.status)}
            </Styled.StepNumber>
            <Styled.StepText>
              <Styled.StepTitle status={step.status}>
                {step.title}
              </Styled.StepTitle>
              <Styled.StepDescription>
                {step.description}
              </Styled.StepDescription>
            </Styled.StepText>
          </Styled.StepContent>
          {index < steps.length - 1 && (
            <Styled.StepConnector
              $isActive={index < animatedStep}
              $isAnimating={index === currentStep - 1}
            />
          )}
        </Styled.Step>
      ))}
    </Styled.Container>
  );
};
