import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MdBrokenImage } from "react-icons/md";
import { cn } from "@/lib/utils";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log(isLoading, "load");
  console.log(isError, "err");

  return (
    <>
      <img
        {...props}
        src={props?.src + "?cache=none"}
        style={{
          display:
            isLoading || isError ? "none" : props.style?.display || "block",
        }}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        onLoad={() => {
          console.log("loaded");
          setIsLoading(false);
        }}
      />
      {isLoading && <Skeleton {...props} />}
      {isError && (
        <div
          {...props}
          className={cn(
            props.className,
            "flex justify-center items-center bg-zinc-200"
          )}
        >
          <MdBrokenImage size={30} />
        </div>
      )}
    </>
  );
}
