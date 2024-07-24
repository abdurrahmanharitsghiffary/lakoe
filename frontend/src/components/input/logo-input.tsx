import { cn } from "@/lib/utils";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { motion } from "framer-motion";
import { MdAddBusiness } from "react-icons/md";
import { InputFileHiddenControlled } from "./input-file-hidden-controller";
import { FieldValues, UseControllerProps } from "react-hook-form";

type AvatarInputProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { classNames?: { wrapper?: string } } & UseControllerProps<T>;

export function AvatarInput<T extends FieldValues>({
  children,
  classNames,
  ...props
}: AvatarInputProps<T>) {
  const [imageSrc, setImageSrc] = useState("");

  const handleFileChange = (file: File) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
  };

  const handleCloseClick = () => {
    console.log("CLICKED CLOSED");
    setImageSrc("");
  };

  return (
    <InputFileHiddenControlled
      {...props}
      className="z-20"
      accept="image/jpg, image/jpeg, image/png, image/webp"
      onFileChange={handleFileChange}
    >
      <div
        className={cn(
          "border-solid border-2 border-gray-400 rounded-full w-20 h-20 flex justify-center items-center overflow-hidden relative",
          classNames?.wrapper
        )}
      >
        {imageSrc ? (
          <motion.div
            className="w-full h-full absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              tabIndex={-1}
              onClick={handleCloseClick}
              className="rounded-full bg-transparent text-destructive w-8 h-8 hover:bg-transparent absolute right-0 top-0 flex justify-center items-center"
            >
              <BiX size={24} />
            </button>
            <img
              className="w-full h-full bg-white rounded-full object-cover object-center"
              src={imageSrc}
              alt="Avatar"
            />
          </motion.div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <MdAddBusiness size={40} className="text-gray-400" />
            <p className="text-gray-400 ms-2">{children}</p>
          </div>
        )}
      </div>
    </InputFileHiddenControlled>
  );
}
