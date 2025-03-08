import { useState } from "react";
import styled from "styled-components";
import { Box } from "@/components/atoms";
import { FileUpload } from "./components/FileUpload";

import * as Styled from "./index.styled";

export const HomeView = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Handle file upload logic here
    console.log("Selected file:", file);
  };

  return (
    <Styled.HomeContainer>
      <Styled.Title>Upload Your PDF</Styled.Title>
      <Styled.Subtitle>
        Drag and drop your PDF file or click to browse from your computer
      </Styled.Subtitle>
      <FileUpload onFileSelect={handleFileSelect} />
    </Styled.HomeContainer>
  );
};
