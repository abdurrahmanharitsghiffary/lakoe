import { NewCheckout } from "@/components/checkout/checkout";
import { Helmet } from "react-helmet-async";

export function CheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <NewCheckout />
    </>
  );
}
