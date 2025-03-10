import styled from "styled-components";
import Link from "next/link";
import { useAppContext } from "@/contexts";
import { useRouter } from "next/router";

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
  font-size: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoText = styled.span`
  ${({ theme }) => theme.typography.h3};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Logo = () => {
  const { setFile, handleSetRole } = useAppContext();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
    setFile(null);
    handleSetRole("");
  };

  return (
    <LogoContainer href="/" onClick={handleLogoClick}>
      <LogoText>ResuMind</LogoText>
    </LogoContainer>
  );
};

export default Logo;
