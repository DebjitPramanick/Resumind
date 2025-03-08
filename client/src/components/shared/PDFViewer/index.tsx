import { useEffect, useState } from "react";
import styled from "styled-components";

interface PDFViewerProps {
  file: File;
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const loadPDF = async () => {
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(`${url}#toolbar=0&view=FitH`);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  useEffect(() => {
    if (file) {
      loadPDF();
    }
  }, [file]);

  let nodeToRender = null;

  if (pdfUrl) {
    nodeToRender = <iframe src={pdfUrl} width="100%" height="100%" />;
  } else {
    nodeToRender = <div>No PDF file</div>;
  }

  return <Root>{nodeToRender}</Root>;
};

export default PDFViewer;

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.xs};

  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;
