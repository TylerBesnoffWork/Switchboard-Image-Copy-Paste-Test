import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Text = () => {
  const navigate = useNavigate();
  const [clipboardText, setClipboardText] = useState("");

  const handleReadClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardText(text);
    } catch (error) {
      console.error("Failed to read clipboard: ", error);
    }
  };

  return (
    <div>
      <h1>Clipboard Test</h1>
      <button onClick={handleReadClipboard}>Read Clipboard</button>
      <p>Clipboard Text: {clipboardText}</p>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Text;
