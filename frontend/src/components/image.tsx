import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <img
        {...props}
        style={{ display: isLoading ? "none" : props?.style?.display }}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && !isError && <Skeleton {...props} />}
    </>
  );
}
