import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyles } from "@/styles/GlobalStyles";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
