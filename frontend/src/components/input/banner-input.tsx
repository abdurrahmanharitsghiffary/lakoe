import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { RiImageAddLine } from "react-icons/ri";
import { BiX } from "react-icons/bi";
import { MdOutlineAddAPhoto } from "react-icons/md";

type BannerInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { classNames?: { wrapper?: string } };

const BannerInput = forwardRef<HTMLInputElement, BannerInputProps>(
  ({ children, classNames, ...props }, ref) => {
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

    return (
      <div
        className={cn(
          "border-solid border-2 border-gray-400 rounded-md w-full h-28 flex justify-center items-center overflow-hidden relative",
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
            className="w-full h-full absolute"
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
              className="w-full h-full bg-white object-cover object-center"
              src={imageSrc}
              alt="Banner"
            />
          </motion.div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <MdOutlineAddAPhoto size={60} className="text-gray-400" />
            <p className="text-gray-400 ms-2">{children}</p>
          </div>
        )}
      </div>
    );
  }
);

BannerInput.displayName = "BannerInput";

export { BannerInput };
