import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import App from "./app";
import { CardProduct } from "@/features/products/card-product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <HomePage /> }],
  },

  {
    path: "products",
    element: <CardProduct />,
    children: [{ path: "products", element: <CardProduct /> }],
  },
]);
