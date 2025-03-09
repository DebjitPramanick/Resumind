import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface CollapseProps {
  children: React.ReactNode;
  transitionIn: boolean;
  duration?: number;
}

const CollapseWrapper = styled.div<{ $height: number; $duration: number }>`
  overflow: hidden;
  height: ${({ $height }) => $height}px;
  transition: height ${({ $duration }) => $duration}ms ease;
`;

export const Collapse = ({
  children,
  transitionIn,
  duration = 200,
}: CollapseProps) => {
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      setHeight(transitionIn ? contentHeight : 0);
    }
  }, [transitionIn, children]);

  return (
    <CollapseWrapper $height={height} $duration={duration}>
      <div ref={contentRef}>{children}</div>
    </CollapseWrapper>
  );
};
