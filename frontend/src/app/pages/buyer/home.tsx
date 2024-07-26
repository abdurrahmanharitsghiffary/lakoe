import { Home } from "@/features/home";
import { Helmet } from "react-helmet-async";

export function BuyerHomePage() {
  return (
    <div className="py-28">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Home />
    </div>
  );
}
