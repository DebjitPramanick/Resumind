import { X } from "react-feather";
import useClipboard from "@/hooks/useClipboard";
import * as Styled from "./index.styled";
import { useEffect, useState } from "react";

interface PromptPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
}

export const PromptPreviewModal = ({
  isOpen,
  onClose,
  prompt,
}: PromptPreviewModalProps) => {
  const { copy, copied } = useClipboard();
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = () => {
    copy(prompt);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      <Styled.Overlay $isOpen={isOpen} onClick={onClose} />
      <Styled.Modal $isOpen={isOpen}>
        <Styled.Header>
          <Styled.Title>Prompt Preview</Styled.Title>
          <Styled.CloseIcon onClick={onClose}>
            <X size={20} />
          </Styled.CloseIcon>
        </Styled.Header>
        <Styled.Content>
          <Styled.PromptSection>
            <Styled.Label>Generated Prompt</Styled.Label>
            <Styled.PromptText>{prompt}</Styled.PromptText>
          </Styled.PromptSection>

          <Styled.Actions>
            <Styled.CopyButton variant="filled" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Prompt"}
            </Styled.CopyButton>
            <Styled.CloseButton variant="outlined" onClick={onClose}>
              Close
            </Styled.CloseButton>
          </Styled.Actions>
        </Styled.Content>
      </Styled.Modal>
    </>
  );
};
