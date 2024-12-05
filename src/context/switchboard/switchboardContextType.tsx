import { ImageProps } from "../../hooks/useReadClipboard";

interface SwitchboardContextType {
    messages: (ImageProps | string)[];
    addMessage: (message: ImageProps | string) => void;
    clearMessages: () => void;
}

export default SwitchboardContextType;