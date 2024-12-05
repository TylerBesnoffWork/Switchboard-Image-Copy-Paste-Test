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
        } else if (item.types.includes("text/html")) {
          // Sometimes someone wants to paste an image from a website that includes text. This extracts the images from the HTML instead of just displaying the alt text

          const htmlBlob = await item.getType("text/html");
          const htmlContent = await htmlBlob.text();
  
          // Parse HTML to extract images
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlContent, "text/html");

          // Find all <img> elements
          const imgElements = doc.querySelectorAll("img");

          for (const imgElement of imgElements) {
            const src = imgElement.getAttribute("src");
            
            if (src) {
              const blob = await fetchImageAsBlob(src);

              if(blob){
                const imgURL = blob ? URL.createObjectURL(blob as Blob) : src;
                const key = generateKey(imgURL);
    
                clipboardImages.push({ URL: imgURL, key, blob: blob as Blob });
              }
            }
          }
        }
      }

    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }

    return { clipboardImages };
  };

  const fetchImageAsBlob = async (src: string): Promise<Blob | boolean> => {
    // Handle data URLs directly
    if (src.startsWith("data:")) {
      return dataURLToBlob(src);
    }

    // Anything else we can't create blobs from without a server request so we can just display the alt text instead
    // If we are able to use a server to fetch the image we can do that here although this seems like a security risk to me
    // The fetch below seems to work for most images but again we are fetching images from the internet which is a security risk
    // We could add some checks to see if the image is from webstaurant or a Clark site and only fetch those images
    // Really the only way we'd get here is if we have html in the clipboard which is if someone copies an entire site including the image
    if(src.startsWith("http")){
      try {
        const response = await fetch(src);
        if(response.ok){
          const blob = await response.blob();
          return blob;
        }

        return false;
      } catch (err) {
        console.error("Failed to fetch image:", err);
        return false;
      }
    }

    return false;
  };
  
  // Convert data URL to Blob
  const dataURLToBlob = (dataURL: string): Blob => {
    const [header, base64] = dataURL.split(",");
    const mimeType = header.match(/:(.*?);/)?.[1] || "image/png";
    const binary = atob(base64);
    const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new Blob([array], { type: mimeType });
  };

  return {handleReadClipboard};
}

export default useReadClipboard;