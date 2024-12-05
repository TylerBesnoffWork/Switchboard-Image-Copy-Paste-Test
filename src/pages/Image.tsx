import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Image = () => {
  const navigate = useNavigate();
  const [clipboardImages, setClipboardImages] = useState<string[]>([]);

  const handleReadClipboard = async () => {
    try {
      // Request clipboard contents
      const clipboardItems = await navigator.clipboard.read();

      for (const item of clipboardItems) {
        // Check for image types
        const imageType = item.types.find((type) => 
          type === "image/png" || type === "image/jpeg"
        );

        if (imageType) {
          // Get the image as a blob
          const blob = await item.getType(imageType);

          // Convert blob to object URL and add to state
          const imgURL = URL.createObjectURL(blob);
          setClipboardImages((prevImages) => [...prevImages, imgURL]);

          console.log("Image pasted from clipboard:", imgURL);
          return;
        }
      }

      alert("No image found in the clipboard!");
    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }
  };

  return (
    <div>
      <h1>Clipboard Test</h1>
      <button onClick={handleReadClipboard}>Read Clipboard</button>
      <button onClick={() => navigate("/")}>Back</button>
      <button onClick={() => setClipboardImages([])}>Clear Images</button>
      {clipboardImages.length > 0 &&
        clipboardImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Clipboard image ${index}`} />
          </div>
        ))}
    </div>
  );
};

export default Image;
