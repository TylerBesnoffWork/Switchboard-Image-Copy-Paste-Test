import { FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";

interface PlainTextAreaProps {
    handleMessageChange: (value: string) => void;
    form: FormInstance<any>;
    value: string; // Add a value prop
}

const PlainTextArea: React.FC<PlainTextAreaProps> = ({ handleMessageChange, form, value }) => {
    return (
        <>
            <TextArea
                placeholder="Enter message..."
                value={value} // Bind the value prop
                onPressEnter={(event): void => {
                    if (!event.shiftKey) {
                        event.preventDefault();
                        form.submit();
                    }
                }}
                onChange={(event): void => handleMessageChange(event.target.value)}
            />
        </>
    );
};

export default PlainTextArea;
