import { forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { toast } from "react-toastify";

type ButtonCopyProps = {
  text?: string;
} & ButtonProps;

const ButtonCopy = forwardRef<HTMLButtonElement, ButtonCopyProps>(
  ({ text, onClick, ...props }, ref) => {
    const [, copy] = useCopyToClipboard();
    return (
      <Button
        {...props}
        onClick={async (e) => {
          if (onClick) onClick(e);
          if (text) {
            await copy(text);
            toast("Copied to clipboard!");
          }
        }}
        ref={ref}
      />
    );
  }
);

ButtonCopy.displayName = "ButtonCopy";

export { ButtonCopy };
