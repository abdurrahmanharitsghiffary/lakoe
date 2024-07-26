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
        // style={{
        //   display:
        //     isLoading || isError ? "none" : props.style?.display || "block",
        // }}
        onError={() => {
          setSrc(
            "https://icons.veryicon.com/png/o/object/material-design-icons/broken-image.png"
          );
        }}
      />
      {/* {(isError || isLoading) && (
        <div
          {...props}
          className={cn(
            props.className,
            "flex justify-center items-center bg-zinc-200"
          )}
        >
          <MdMoreHoriz size={30} />
        </div>
      )} */}
    </>
  );
}
