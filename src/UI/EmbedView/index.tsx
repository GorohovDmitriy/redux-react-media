import React, { EmbedHTMLAttributes, FC } from "react";

interface EmbedViewProps extends EmbedHTMLAttributes<HTMLEmbedElement> {
  embed: string;
}

const EmbedView: FC<EmbedViewProps> = ({ embed, height, width }) => (
  <embed className="post__video" src={embed} height={height} width={width} />
);

export default EmbedView;
