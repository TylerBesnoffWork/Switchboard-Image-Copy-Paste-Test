interface SwitchboardContextType {
    messages: (image | string)[];
    addMessage: (message: image | string) => void;
    clearMessages: () => void;
}

export interface image {
    url: string;
}

export default SwitchboardContextType;