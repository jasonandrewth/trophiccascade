import { getStrapiMedia } from "../lib/media";
import Image from 'next/image'
//import Image from 'next/image'

const ImageTag = ({ image, width, height }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <img
      src={imageUrl}
      alt={image.alternativeText || image.name}
      width={width}
      height={height}
    />
  );
};

export default ImageTag;