import { useState } from "react";
import { BiX } from "react-icons/bi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { InputFileHiddenControlled } from "./input-file-hidden-controller";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { cn } from "@/lib/utils";

type BannerInputProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { classNames?: { wrapper?: string } } & UseControllerProps<T>;

export function BannerInput<T extends FieldValues>({
  children,
  ...props
}: BannerInputProps<T>) {
  const [imageSrc, setImageSrc] = useState("");

  const handleFileChange = (file: File) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
  };

  const handleCloseClick = () => {
    setImageSrc("");
  };

  return (
    <InputFileHiddenControlled
      {...props}
      className="z-20"
      onFileChange={handleFileChange}
      accept="image/jpg, image/jpeg, image/png, image/webp"
    >
      <div
        className={cn(
          "border-solid border-2 border-gray-400 rounded-md w-full h-28 flex justify-center items-center overflow-hidden relative"
        )}
      >
        {imageSrc ? (
          <div className="w-full h-full absolute">
            <button
              tabIndex={-1}
              onClick={handleCloseClick}
              className="rounded-full bg-transparent text-destructive w-8 h-8 hover:bg-transparent absolute right-0 top-0 flex justify-center items-center z-30"
            >
              <BiX size={24} />
            </button>
            <img
              className="w-full h-full bg-white object-cover object-center"
              src={imageSrc}
              alt="Banner"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <MdOutlineAddAPhoto size={60} className="text-gray-400" />
            <p className="text-gray-400 ms-2">{children}</p>
          </div>
        )}
      </div>
    </InputFileHiddenControlled>
  );
}
