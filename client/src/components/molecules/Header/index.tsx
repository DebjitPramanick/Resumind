import styled from "styled-components";
import { Flex } from "@/components/atoms";
import Logo from "./Logo";

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderContainer = styled(Flex)`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer align="center" justify="space-between">
        <Logo />
      </HeaderContainer>
    </StyledHeader>
  );
};
