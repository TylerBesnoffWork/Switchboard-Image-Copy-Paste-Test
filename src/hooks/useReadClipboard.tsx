export interface ImageProps {
  URL: string;
  key: string;
  blob: Blob;
}

export interface ClipboardContents{
  clipboardImages?: ImageProps[];
}

// Custom hook to read images from the clipboard
const useReadClipboard = () => {
  //Generate a unique key for each image so that they images can be removed by their key
  const generateKey = (imageUrl: string) => {
      return `${Math.floor(Math.random() * 1000000)}${imageUrl}`;
  }
  
  //This is the meat and bones of the hook. This function reads the clipboard and extracts images from it. It can be modified to extract other types of data as well such as text
  const handleReadClipboard = async (): Promise<ClipboardContents> => {
    let clipboardImages: ImageProps[] = [];

    try {
      // Request clipboard contents
      const clipboardItems = await navigator.clipboard.read();

      for (const item of clipboardItems) {
        const imageType = item.types.find(
          (type) => type === "image/png" || type === "image/jpeg"
        );

        if (imageType) {
          // Get the image as a blob
          const blob = await item.getType(imageType);
          // blob structure
          // Blob {size: 12345, type: "image/png"}

          // Convert blob to object URL and add to state
          const imgURL = URL.createObjectURL(blob);

          // Map the image to an object that can give more information then just a url
          // If we can guarantee the URL's will be unique within this context we can use the URL as the key
          // By within this context I mean that the URL's will be unique within the array of images from the clipboard only until the clipboard is cleared
          const img = {URL: imgURL, key: generateKey(imgURL), blob: blob};

          clipboardImages.push(img);
        }
      }

    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }

    return { clipboardImages };
  };

  return {handleReadClipboard};
}

export default useReadClipboard;