import { cva } from "class-variance-authority";

export const orderTabVariants = cva("", {
  variants: {
    variant: {
      ON_DELIVERY: "bg-[#F68511] hover:bg-initial",
      CANCELLED: "bg-[#EA3829] hover:bg-initial",
      SUCCESS: "bg-[#E6E6E6] text-black hover:bg-initial",
      NEW_ORDER: "bg-[#008F5D] hover:bg-initial",
      READY_TO_DELIVER: "bg-[#147AF3] hover:bg-initial",
      NOT_PAID: "bg-[#E8C600] text-black hover:bg-initial",
    },
  },
});
