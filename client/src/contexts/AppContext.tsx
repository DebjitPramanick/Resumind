import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { useImmer } from "use-immer";
import { QUESTION_DIFFICULTY, QuestionDifficulty } from "@/constants";

interface AppContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  requirements: IRequirements;
  handleSetDifficulty: (difficulty: QuestionDifficulty) => void;
  handleSetQuestionCount: (questionCount: number) => void;
  handleSetRole: (role: string) => void;
}

interface IRequirements {
  questionCount: number;
  role: string;
  difficulty: QuestionDifficulty;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [requirements, setRequirements] = useImmer<IRequirements>({
    role: "",
    questionCount: 5,
    difficulty: QUESTION_DIFFICULTY.EASY,
  });

  const handleSetDifficulty = (difficulty: QuestionDifficulty) => {
    setRequirements((draft) => {
      draft.difficulty = difficulty;
    });
  };

  const handleSetQuestionCount = (questionCount: number) => {
    setRequirements((draft) => {
      draft.questionCount = questionCount;
    });
  };

  const handleSetRole = (role: string) => {
    setRequirements((draft) => {
      draft.role = role;
    });
  };

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        requirements,
        handleSetDifficulty,
        handleSetQuestionCount,
        handleSetRole,
      }}
    >
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
