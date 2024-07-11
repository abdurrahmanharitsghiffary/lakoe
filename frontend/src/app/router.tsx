import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { ProductsPage } from "./pages/seller/products";
import { FormProduct } from "@/features/products/components/form-product";
import HomePage from "./pages/seller/home";
import OrdersPage from "./pages/seller/orders";
import { SettingsPage } from "./pages/seller/settings";
import OrderDetails from "./pages/seller/orders-detail";
import { CardOrderBuyer } from "@/features/orders/buyer/components/card-order";
import { SellerLayout } from "./pages/seller/layout";
import { BuyerLayout } from "./pages/buyer/layout";
import { AdminLayout } from "./pages/admin/layout/root-layout";
import NotFoundPage from "./pages/fallback/404";
import ErrorPage from "./pages/fallback/error";
import { AdminHomePage } from "./pages/admin/home";
import WithdrawalPage from "./pages/admin/withdrawal";
import PendingWithdrawalPage from "./pages/admin/withdrawal/pending";
import { WithdrawalDetails } from "./pages/admin/withdrawal/details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        children: [{ path: "", element: <CardOrderBuyer /> }],
        element: <BuyerLayout />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "", element: <AdminHomePage /> },
          { path: "withdrawal", element: <WithdrawalPage /> },
          { path: "withdrawal/pending", element: <PendingWithdrawalPage /> },
          { path: "withdrawal/:id", element: <WithdrawalDetails /> },
        ],
      },
      {
        path: "seller",
        element: <SellerLayout />,
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
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
