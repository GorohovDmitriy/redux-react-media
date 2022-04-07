import React, { FC, VideoHTMLAttributes } from "react";

interface VideoViewProps extends VideoHTMLAttributes<HTMLVideoElement> {
  className?: string;
  video: string;
}

const VideoView: FC<VideoViewProps> = ({ video, width, height, className }) => (
  <video
    className={className}
    width={width}
    height={height}
    src={video}
    controls
  />
);

export default VideoView;
