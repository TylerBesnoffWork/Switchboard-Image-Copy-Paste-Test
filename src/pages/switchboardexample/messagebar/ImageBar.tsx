import './ImageBar.css';
import Image from './Image';
import { ImageProps } from '../../../hooks/useReadClipboard';

interface ImageBarProps {
    images: ImageProps[];
    removeImage: (key: string) => void;
}

const ImageBar: React.FC<ImageBarProps> = ({images, removeImage}) => {
    
    return (
        images.length > 0 ?
            <div className="image-bar">
                {images.map((image, index) => (
                    <Image key={index} image={image} removeImage={removeImage} />
                ))}
            </div>
        : null
    );
}

export default ImageBar;