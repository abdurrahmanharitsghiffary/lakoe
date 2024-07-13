import React, { forwardRef, useState } from "react";
import { InputFileHidden } from "../ui/input-file-hidden";
import { RiImageAddLine } from "react-icons/ri";
import { Image } from "../image";
import { Button } from "../ui/button";
import { BiX } from "react-icons/bi";

type ProductInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ProductFileInput = forwardRef<HTMLInputElement, ProductInputProps>(
  ({ children, ...props }, ref) => {
    const [imageSrc, setImageSrc] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target?.files?.[0];
      if (file && file instanceof File) {
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
      }
      e.target.value = "";
    };

    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setImageSrc("");
    };

    console.log(imageSrc, "SRC");
    return (
      <InputFileHidden
        divProps={{
          className:
            "border-dashed border-2 border-gray-400 rounded-md aspect-square min-w-36 h-36 flex flex-col justify-center items-center",
        }}
        onChange={(e) => {
          if (props?.onChange) props.onChange(e);
          handleFileChange(e);
        }}
        accept="image/jpg, image/jpeg, image/png, image/webp"
        {...props}
        ref={ref}
      >
        {imageSrc && (
          <div className="w-full h-full  absolute aspect-square">
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
              src={imageSrc}
            />
          </div>
        )}
        <RiImageAddLine size={60} className="text-gray-400" />
        <p className="text-gray-400 ms-2">{children}</p>
      </InputFileHidden>
    );
  }
);

ProductFileInput.displayName = "ProductFileInput";

export { ProductFileInput };
