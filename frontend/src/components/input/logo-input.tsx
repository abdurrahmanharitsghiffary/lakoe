import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { motion } from "framer-motion";

import { MdAddBusiness } from "react-icons/md";

type AvatarInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { classNames?: { wrapper?: string } };

const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(
  ({ children, classNames, ...props }, ref) => {
    const [imageSrc, setImageSrc] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target?.files?.[0];
      if (file && file instanceof FileList) {
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
      }
      e.target.value = "";
    };

    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setImageSrc("");
    };

    return (
      <div
        className={cn(
          "border-solid border-2 border-gray-400 rounded-full w-20 h-20 flex justify-center items-center overflow-hidden relative",
          classNames?.wrapper
        )}
      >
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/webp"
          onChange={(e) => {
            if (props?.onChange) props.onChange(e);
            handleFileChange(e);
          }}
          ref={ref}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {imageSrc ? (
          <motion.div
            className="w-full h-full absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
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
    );
  }
);

AvatarInput.displayName = "AvatarInput";

export { AvatarInput };
