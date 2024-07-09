import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import App from "./app";
import { ProductsPage } from "./pages/products";
import { FormProduct } from "@/features/products/form-product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/create",
        element: <FormProduct />,
      },
    ],
  },
]);
