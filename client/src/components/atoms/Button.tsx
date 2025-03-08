import styled, { css } from "styled-components";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "filled" | "outlined" | "transparent";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
}

const sizeStyles = {
  small: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: 14px;
    ${({ theme }) => theme.typography.button};
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 16px;
    ${({ theme }) => theme.typography.button};
  `,
  large: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: 18px;
    ${({ theme }) => theme.typography.button};
  `,
};

const variantStyles = {
  filled: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  outlined: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surface};
    }
  `,
  transparent: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surface};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  ${({ size = "medium" }) => sizeStyles[size]};
  ${({ variant = "filled" }) => variantStyles[variant]};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
