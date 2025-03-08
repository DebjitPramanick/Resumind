import styled from "styled-components";
import { Flex } from "@/components/atoms";
import Logo from "./Logo";

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.98);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.colors.utils.shadow.sm};
`;

const HeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
    </StyledHeader>
  );
};
