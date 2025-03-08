import { css } from "styled-components";

export const typography = {
  h1: css`
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
  `,
  h2: css`
    font-size: 28px;
    font-weight: 600;
    line-height: 1.25;
  `,
  h3: css`
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  `,
  caption: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
  `,
  button: css`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
  `,
} as const;
