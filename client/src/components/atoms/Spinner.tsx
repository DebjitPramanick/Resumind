import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const getSize = (size: SpinnerProps["size"] = "medium") => {
  switch (size) {
    case "small":
      return "16px";
    case "large":
      return "48px";
    default:
      return "32px";
  }
};

const SpinnerWrapper = styled.div<SpinnerProps>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border: 2px solid ${({ theme }) => theme.colors.surface};
  border-top: 2px solid ${({ theme, color }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Spinner = ({ size, color }: SpinnerProps) => {
  return <SpinnerWrapper size={size} color={color} />;
};
