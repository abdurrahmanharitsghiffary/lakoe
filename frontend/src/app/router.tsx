import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { ProductsPage } from "./pages/seller/products";
import { FormProduct } from "@/features/products/components/form-product";
import Typography from "@/components/ui/typography";
import HomePage from "./pages/seller/home";
import OrdersPage from "./pages/seller/orders";
import { SettingsPage } from "./pages/seller/settings";
import OrderDetails from "./pages/seller/orders-detail";
import { Seller } from "./pages/seller/seller";
import { Buyer } from "./pages/buyer/buyer";
import Admin from "./pages/admin/admin";
import { CardOrderBuyer } from "@/features/orders/buyer/components/card-order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Buyer />,
        children: [{ path: "", element: <CardOrderBuyer /> }],
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
