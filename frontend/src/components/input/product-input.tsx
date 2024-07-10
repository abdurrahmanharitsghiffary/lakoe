import React, { forwardRef } from "react";
import InputFileHidden from "../ui/input-file-hidden";
import { RiImageAddLine } from "react-icons/ri";

type ProductInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ProductFileInput = forwardRef<HTMLInputElement, ProductInputProps>(
  ({ children, ...props }, ref) => {
    return (
      <InputFileHidden
        divProps={{
          className:
            "border-dashed border-2 border-gray-400 rounded-md aspect-square min-w-36 h-36 flex flex-col justify-center items-center",
        }}
        {...props}
        ref={ref}
      >
        <RiImageAddLine size={60} className="text-gray-400" />
        <p className="text-gray-400 ms-2">{children}</p>
      </InputFileHidden>
    );
  }
);

ProductFileInput.displayName = "ProductFileInput";

export { ProductFileInput };
