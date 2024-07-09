import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import App from "./app";
import { ProductsPage } from "./pages/products";
import { FormProduct } from "@/features/products/form-product";
import Typography from "@/components/ui/typography";

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
      {
        path: "*",
        element: (
          <Typography
            variant="h3"
            className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            Page not found.
          </Typography>
        ),
      },
    ],
  },
]);
