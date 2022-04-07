import React, { FC, ImgHTMLAttributes } from "react";

interface ImageViewProps extends ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  className: string
}

const ImageView: FC<ImageViewProps> = ({ url, className, width, height }) => (
  <img src={url} alt="New" className={className} width={width} height={height}/>
);

export default ImageView;
