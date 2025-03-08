import styled from "styled-components";

interface FlexProps {
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
