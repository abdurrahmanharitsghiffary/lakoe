import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import App from "./app";
import { ProductsPage } from "./pages/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <HomePage /> }],
  },

  {
    path: "products",
    element: <ProductsPage />,
  },
]);
