import { forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { useToast } from "../ui/use-toast";

type ButtonCopyProps = {
  text?: string;
} & ButtonProps;

const ButtonCopy = forwardRef<HTMLButtonElement, ButtonCopyProps>(
  ({ text, onClick, ...props }, ref) => {
    const { toast } = useToast();
    const [, copy] = useCopyToClipboard();
    return (
      <Button
        {...props}
        onClick={async (e) => {
          if (onClick) onClick(e);
          if (text) {
            await copy(text);
            toast({
              title: "Copied to clipboard!",
              className: "bg-zinc-950 text-white py-4 border-none",
            });
          }
        }}
        ref={ref}
      />
    );
  }
);

ButtonCopy.displayName = "ButtonCopy";

export { ButtonCopy };
