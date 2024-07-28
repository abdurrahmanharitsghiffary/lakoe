import React, { useState } from "react";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image({ src: imgSrc, ...props }: ImageProps) {
  const [src, setSrc] = useState(imgSrc);

  return (
    <>
      <img
        {...props}
        src={src}
        onError={() => {
          setSrc(
            "https://icons.veryicon.com/png/o/object/material-design-icons/broken-image.png"
          );
        }}
      />
    </>
  );
}
