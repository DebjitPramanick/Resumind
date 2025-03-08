"use client";

import { useCallback } from "react";

// @ts-ignore
import * as pdfjs from "pdfjs-dist/build/pdf.min.mjs";
// @ts-ignore
await import("pdfjs-dist/build/pdf.worker.min.mjs");

import { useImmer } from "use-immer";

type RequestStatus = "idle" | "pending" | "fulfilled" | "rejected";

const EDUCATION_KEYWORDS = ["education", "school", "college", "university"];
const EXPERIENCE_KEYWORDS = [
  "experience",
  "work experience",
  "work history",
  "job history",
];
const SKILLS_KEYWORDS = [
  "skills",
  "technologies",
  "technical skills",
  "hard skills",
  "soft skills",
];
const PROJECTS_KEYWORDS = [
  "projects",
  "portfolio",
  "my projects",
  "personal projects",
  "personal portfolio",
];

const SECTIONS_TO_PARSE = {
  EDUCATION: "education",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  PROJECTS: "projects",
};

interface ParseResult {
  text: string;
  sections: {
    [key: string]: string;
  };
  metadata: {
    title?: string;
    author?: string;
    keywords?: string;
    creationDate?: Date;
    pageCount: number;
  };
}

export interface ParserState<T> {
  status: RequestStatus;
  data: ParseResult | null;
  error: Error | string | null;
  isIdle: boolean;
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
}

interface UseParseReturn {
  parse: (file: File) => void;
  state: ParserState<ParseResult>;
}

interface ParserStateHandler<T> {
  idle: () => void;
  pending: () => void;
  fulfilled: (data: T) => void;
  rejected: (error: Error | string) => void;
}

const useParser = (): UseParseReturn => {
  const [state, setState] = useImmer<ParserState<ParseResult>>({
    status: "idle",
    data: null,
    error: null,
    isIdle: true,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
  });

  const stateHandler: ParserStateHandler<ParseResult> = {
    idle: () => {
      setState({
        status: "idle",
        data: null,
        error: null,
        isIdle: true,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
      });
    },

    pending: () => {
      setState({
        status: "pending",
        data: null,
        error: null,
        isIdle: false,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      });
    },

    fulfilled: (data: ParseResult) => {
      setState({
        status: "fulfilled",
        data,
        error: null,
        isIdle: false,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
      });
    },

    rejected: (error: Error | string) => {
      setState({
        status: "rejected",
        data: null,
        error,
        isIdle: false,
        isPending: false,
        isFulfilled: false,
        isRejected: true,
      });
    },
  };

  const parse = useCallback(async (file: File) => {
    stateHandler.pending();

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        console.log("textContent", textContent);
        const pageText = textContent.items
          .map((item: any) => {
            if ("str" in item && item.str) {
              return item.str;
            }
            return "\n";
          })
          .join(" ");
        fullText += pageText + "\n";
      }

      // Basic section identification
      const sections = {
        education: "",
        experience: "",
        skills: "",
        projects: "",
      };

      const lines = fullText.split("\n");

      let currentSection: string | undefined;

      lines.forEach((line) => {
        const lowerLine = line.toLowerCase().trim();

        if (EDUCATION_KEYWORDS.includes(lowerLine)) {
          currentSection = SECTIONS_TO_PARSE.EDUCATION;
        } else if (EXPERIENCE_KEYWORDS.includes(lowerLine)) {
          currentSection = SECTIONS_TO_PARSE.EXPERIENCE;
        } else if (SKILLS_KEYWORDS.includes(lowerLine)) {
          currentSection = SECTIONS_TO_PARSE.SKILLS;
        } else if (PROJECTS_KEYWORDS.includes(lowerLine)) {
          currentSection = SECTIONS_TO_PARSE.PROJECTS;
        }

        if (currentSection && currentSection in sections) {
          sections[currentSection as keyof typeof sections] += line + "\n";
        }
      });

      const context = Object.entries(sections)
        .map(([_, value]) => value)
        .join("\n\n");

      const result: ParseResult = {
        text: context,
        sections,
        metadata: {
          pageCount: pdf.numPages,
        },
      };
      stateHandler.fulfilled(result);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to parse PDF");
      stateHandler.rejected(error);
      throw error;
    }
  }, []);

  return {
    parse,
    state,
  };
};

export default useParser;
