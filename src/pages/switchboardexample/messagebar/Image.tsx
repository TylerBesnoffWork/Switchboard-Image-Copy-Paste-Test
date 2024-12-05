import React from 'react';
import './Image.css'; // Add this if you prefer a separate CSS file
import { ImageProps } from '../../../hooks/useReadClipboard';

interface ImageComponentProps {
    removeImage: (key: string) => void;
    image: ImageProps;
}

const Image: React.FC<ImageComponentProps> = ({ removeImage, image }) => {
    const {URL, key} = image;

    return (
        <div className="image-container">
            <img src={URL} alt={URL} className="image" />
            <button className="remove-button" onClick={() => removeImage(key)} type="button">
                &times;
            </button>
        </div>
    );
};

export default Image;
