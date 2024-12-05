import { useState } from "react";

export interface ImageProps {
  URL: string;
  key: string;
  blob: Blob;
}

// Custom hook to read images from the clipboard
// In this example the hooks stores the images in the state but it can be modified to either return images or store them in redux somewhere
const useReadClipboard = () => {
  //Stored images from the clipboard which can be accessed by the component using this hook
  const [clipboardImages, setClipboardImages] = useState<ImageProps[]>([]);

  //Generate a unique key for each image so that they images can be removed by their key
  const generateKey = (imageUrl: string) => {
      return `${Math.floor(Math.random() * 1000000)}${imageUrl}`;
  }
  
  //This is the meat and bones of the hook. This function reads the clipboard and extracts images from it. It can be modified to extract other types of data as well such as text
  const handleReadClipboard = async () => {
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

            setClipboardImages((prevImages) => [...prevImages, img]);
          }
        }

      } catch (err) {
        console.error("Failed to read clipboard contents:", err);
      }
    };


    //Clear the images from the clipboard
    const clearImages = () => {
      // A security concern may be with createObjectURL. Once the images are sent they can be uploaded to our servers in the way we do it already in switchboard.
      // Currently we are sending using sendPhotoAsCustomer which takes data as FormData. We can modify our eventual send function to call this sendPhotoAsCustomer which will upload to our server
      // The issue is the image using the created link is still live. We want to be able to clean this up. We can call this function to do it in our send photo function
      // We can call clear images when we send the images which allows us to clean up the images when they are removed or when they are sent.
      // The same is done in remove image
      clipboardImages.forEach((img) => URL.revokeObjectURL(img.URL));

      setClipboardImages([]);
    }

    //Remove an image from the clipboard by its key
    const removeImage = (key: string) => {
      const image = clipboardImages.find((img) => img.key === key);
      if (image) {
        URL.revokeObjectURL(image.URL);
        setClipboardImages((prevImages) => prevImages.filter((img) => img.key !== key));
      }
    }

    return { clipboardImages, handleReadClipboard, clearImages, removeImage };
}

export default useReadClipboard;