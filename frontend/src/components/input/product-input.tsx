import React from "react";
import { InputFileHidden } from "../ui/input-file-hidden";
import { RiImageAddLine } from "react-icons/ri";
import { Image } from "../image";
import { Button } from "../ui/button";
import { BiX } from "react-icons/bi";
import { cn } from "@/lib/utils";
import {
  UseControllerProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { useWatchImage } from "@/hooks/use-watch-image";

type ProductInputProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { classNames?: { wrapper?: string } } & UseControllerProps<T>;

export function ProductFileInput<T extends FieldValues>({
  children,
  classNames,
  ...props
}: ProductInputProps<T>) {
  const {
    field: { onChange, value },
  } = useController(props);

  const image = useWatchImage(value) as string;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    onChange(file);
    e.target.value = "";
  };

  const handleCloseClick = () => {
    onChange(null);
  };

  return (
    <InputFileHidden
      divProps={{
        className: cn(
          "border-dashed border-2 border-gray-400 rounded-md aspect-square min-w-36 h-36 flex flex-col justify-center items-center overflow-hidden",
          classNames?.wrapper
        ),
      }}
      onChange={(e) => {
        handleFileChange(e);
      }}
      value={undefined}
      accept="image/jpg, image/jpeg, image/png, image/webp"
      {...props}
    >
      {image && (
        <div className="w-full h-full absolute aspect-square">
          <Button
            onClick={handleCloseClick}
            size="icon"
            variant="ghost"
            className="rounded-full bg-transparent text-destructive w-8 h-8 hover:bg-transparent absolute right-0 top-0"
          >
            <BiX size={24} />
          </Button>
          <Image
            className="w-full h-full bg-white aspect-square object-cover object-center"
            src={image}
          />
        </div>
      )}
      <RiImageAddLine size={60} className="text-gray-400" />
      <p className="text-gray-400 ms-2">{children}</p>
    </InputFileHidden>
  );
}
