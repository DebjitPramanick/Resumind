import styled from "styled-components";
import { Header } from "@/components/molecules";

const LayoutContainer = styled.div`
  min-height: 100vh;
  padding-top: 72px; // Height of the header
`;

const MainContent = styled.main`
  padding: ${({ theme }) => theme.spacing.md};
  min-height: calc(100vh - 72px);
`;

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};
