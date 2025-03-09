import { PDFViewer } from "@/components/shared";
import React from "react";
import * as Styled from "./index.styled";
import { Box } from "@/components/atoms";
const PDFViewSection = ({
  pdfFile,
  onUploadNew,
}: {
  pdfFile: File;
  onUploadNew: () => void;
}) => {
  return (
    <Styled.PDFSection>
      <Styled.PDFHeader>
        <Styled.FileInfo>
          <Styled.FileName>{pdfFile.name}</Styled.FileName>
          <Styled.FileSize>
            {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
          </Styled.FileSize>
        </Styled.FileInfo>
        <Styled.UploadNewButton onClick={onUploadNew}>
          Upload New
        </Styled.UploadNewButton>
      </Styled.PDFHeader>
      <Box height="calc(100% - 78px)">
        <PDFViewer file={pdfFile} />
      </Box>
    </Styled.PDFSection>
  );
};

export default PDFViewSection;
