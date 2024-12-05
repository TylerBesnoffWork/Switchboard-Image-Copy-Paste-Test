import { useState } from "react";

export interface ImageProps {
  URL: string;
  key: string;
}

// Custom hook to read images from the clipboard
// This definitly will need modification to work with read switchboard such as proper error handling and making sure images are valid (call picPurify?)
const useReadClipboard = () => {
    const [clipboardImages, setClipboardImages] = useState<ImageProps[]>([]);

    const generateKey = (imageUrl: string) => {
        return `${Math.floor(Math.random() * 1000000)}${imageUrl.replace("blob:http://localhost:5173/", "")}`;
    }
    
    const handleReadClipboard = async () => {
        try {
          // Request clipboard contents
          const clipboardItems = await navigator.clipboard.read();
    
          for (const item of clipboardItems) {
            // Check for image types
            const imageType = item.types.find(
              (type) => type === "image/png" || type === "image/jpeg"
            );
    
            if (imageType) {
              // Get the image as a blob
              const blob = await item.getType(imageType);
    
              // Convert blob to object URL and add to state
              const imgURL = URL.createObjectURL(blob);

              const img = {URL: imgURL, key: generateKey(imgURL)};

              setClipboardImages((prevImages) => [...prevImages, img]);
    
              return;
            }
          }

        } catch (err) {
          console.error("Failed to read clipboard contents:", err);
        }
      };

    const clearImages = () => {
        setClipboardImages([]);
    }

    const removeImage = (key: string) => {
        setClipboardImages((prevImages) => prevImages.filter((img) => img.key !== key));
    }

    return { clipboardImages, handleReadClipboard, clearImages, removeImage };
}

export default useReadClipboard;