import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Box } from "@/components/atoms";
import { useAppContext } from "@/contexts";

const AnalyzeContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionContent = styled.div`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-line;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.colors.utils.shadow.sm};
`;

export const AnalyzeView = () => {
  const router = useRouter();
  const { pdfData } = useAppContext();

  useEffect(() => {
    if (!pdfData) {
      router.push("/");
    }
  }, [pdfData, router]);

  if (!pdfData) {
    return null;
  }

  return (
    <AnalyzeContainer>
      <Title>Resume Analysis</Title>

      {Object.entries(pdfData.sections).map(([key, content]) => {
        if (!content.trim()) return null;

        return (
          <Section key={key}>
            <SectionTitle>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </SectionTitle>
            <SectionContent>{content}</SectionContent>
          </Section>
        );
      })}
    </AnalyzeContainer>
  );
};
