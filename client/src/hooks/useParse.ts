import { useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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

interface UseParseReturn {
  parse: (file: File) => Promise<ParseResult>;
  isLoading: boolean;
  error: Error | null;
}

const useParse = (): UseParseReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const extractTextContent = async (
    pdf: pdfjsLib.PDFDocumentProxy
  ): Promise<string> => {
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
      fullText += pageText + "\n";
    }

    return fullText;
  };

  const identifySections = (text: string) => {
    const sections: { [key: string]: string } = {
      education: "",
      experience: "",
      skills: "",
      projects: "",
    };

    const lines = text.split("\n");
    let currentSection = "";

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase().trim();

      // Identify sections based on common headers
      if (lowerLine.includes("education")) {
        currentSection = "education";
      } else if (
        lowerLine.includes("experience") ||
        lowerLine.includes("work history")
      ) {
        currentSection = "experience";
      } else if (
        lowerLine.includes("skills") ||
        lowerLine.includes("technologies")
      ) {
        currentSection = "skills";
      } else if (
        lowerLine.includes("projects") ||
        lowerLine.includes("portfolio")
      ) {
        currentSection = "projects";
      }

      // Add content to current section
      if (currentSection && sections[currentSection] !== undefined) {
        sections[currentSection] += line + "\n";
      }
    });

    return sections;
  };

  const parse = useCallback(async (file: File): Promise<ParseResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // Extract text content
      const text = await extractTextContent(pdf);

      // Get metadata
      const metadata = await pdf.getMetadata();

      // Identify sections
      const sections = identifySections(text);

      return {
        text,
        sections,
        metadata: {
          title: metadata.info?.Title,
          author: metadata.info?.Author,
          keywords: metadata.info?.Keywords,
          creationDate: metadata.info?.CreationDate
            ? new Date(metadata.info.CreationDate)
            : undefined,
          pageCount: pdf.numPages,
        },
      };
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to parse PDF");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    parse,
    isLoading,
    error,
  };
};

export default useParse;
