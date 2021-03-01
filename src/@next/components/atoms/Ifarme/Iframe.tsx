import React from "react";

import { IProps } from "./types";

export const Iframe: React.FC<IProps> = ({
  src,
  height,
  width,
  frameBorder,
  scrolling,
  title,
  name,
  id,
  onLoad = () => null,
}: IProps) => {

  return (
    <iframe
      src={src}
      height={height}
      width={width}
      frameBorder={frameBorder}
      scrolling={scrolling}
      title={title}
      name={name}
      id={id}
      onLoad={onLoad}
    />
  )

}