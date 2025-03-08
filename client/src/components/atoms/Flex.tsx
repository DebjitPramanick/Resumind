import styled from "styled-components";

export interface FlexProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: keyof typeof import("@/styles/spacing").spacing;
  fullWidth?: boolean;
  p?: keyof typeof import("@/styles/spacing").spacing;
  px?: keyof typeof import("@/styles/spacing").spacing;
  py?: keyof typeof import("@/styles/spacing").spacing;
  pt?: keyof typeof import("@/styles/spacing").spacing;
  pr?: keyof typeof import("@/styles/spacing").spacing;
  pb?: keyof typeof import("@/styles/spacing").spacing;
  pl?: keyof typeof import("@/styles/spacing").spacing;
  m?: keyof typeof import("@/styles/spacing").spacing;
  mx?: keyof typeof import("@/styles/spacing").spacing;
  my?: keyof typeof import("@/styles/spacing").spacing;
  mt?: keyof typeof import("@/styles/spacing").spacing;
  mr?: keyof typeof import("@/styles/spacing").spacing;
  mb?: keyof typeof import("@/styles/spacing").spacing;
  ml?: keyof typeof import("@/styles/spacing").spacing;
  width?: string;
  height?: string;
  bg?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  align-items: ${({ align = "flex-start" }) => align};
  justify-content: ${({ justify = "flex-start" }) => justify};
  flex-wrap: ${({ wrap = "nowrap" }) => wrap};
  gap: ${({ theme, gap }) => (gap ? theme.spacing[gap] : 0)};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;
