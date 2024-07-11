import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { ProductsPage } from "./pages/products";
import { FormProduct } from "@/features/products/components/form-product";
import Typography from "@/components/ui/typography";
import HomePage from "./pages/home";
import OrdersPage from "./pages/orders";
import { SettingsPage } from "./pages/settings";
import OrderDetails from "./pages/orders-detail";
import { Seller } from "./seller";
import { Buyer } from "./buyer";
import Admin from "./admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Buyer />,
        children: [{ path: "", element: "loler" }],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [{ path: "", element: "lolerr" }],
      },
      {
        path: "seller",
        element: <Seller />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "orders/:id", element: <OrderDetails /> },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "products/create",
            element: <FormProduct />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
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
    ],
  },
]);
