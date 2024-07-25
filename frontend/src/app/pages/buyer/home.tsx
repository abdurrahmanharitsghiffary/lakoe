import { Home } from "@/features/home";
import { Helmet } from "react-helmet-async";

export function BuyerHomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Home />
    </>
  );
}
