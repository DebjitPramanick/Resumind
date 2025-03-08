import styled from "styled-components";

interface BoxProps {
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

export const Box = styled.div<BoxProps>`
  padding: ${({ theme, p }) => (p ? theme.spacing[p] : 0)};
  padding-top: ${({ theme, py, pt }) =>
    pt ? theme.spacing[pt] : py ? theme.spacing[py] : undefined};
  padding-right: ${({ theme, px, pr }) =>
    pr ? theme.spacing[pr] : px ? theme.spacing[px] : undefined};
  padding-bottom: ${({ theme, py, pb }) =>
    pb ? theme.spacing[pb] : py ? theme.spacing[py] : undefined};
  padding-left: ${({ theme, px, pl }) =>
    pl ? theme.spacing[pl] : px ? theme.spacing[px] : undefined};

  margin: ${({ theme, m }) => (m ? theme.spacing[m] : 0)};
  margin-top: ${({ theme, my, mt }) =>
    mt ? theme.spacing[mt] : my ? theme.spacing[my] : undefined};
  margin-right: ${({ theme, mx, mr }) =>
    mr ? theme.spacing[mr] : mx ? theme.spacing[mx] : undefined};
  margin-bottom: ${({ theme, my, mb }) =>
    mb ? theme.spacing[mb] : my ? theme.spacing[my] : undefined};
  margin-left: ${({ theme, mx, ml }) =>
    ml ? theme.spacing[ml] : mx ? theme.spacing[mx] : undefined};

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bg }) => bg};
`;
