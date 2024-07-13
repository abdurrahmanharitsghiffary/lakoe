import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { ProductsPage } from "./pages/seller/products";
import { HomePage } from "./pages/seller/home";
import { OrdersPage } from "./pages/seller/orders";
import { SettingsPage } from "./pages/seller/settings";
import { OrderDetails } from "./pages/seller/orders-detail";
import { SellerLayout } from "./pages/seller/layout";
import { BuyerLayout } from "./pages/buyer/layout";
import { AdminLayout } from "./pages/admin/layout/root-layout";
import { NotFoundPage } from "./pages/fallback/not-found";
import { ErrorPage } from "./pages/fallback/error";
import { AdminHomePage } from "./pages/admin/home";
import { WithdrawalPage } from "./pages/admin/withdrawal";
import { PendingWithdrawalPage } from "./pages/admin/withdrawal/pending";
import { WithdrawalDetails } from "./pages/admin/withdrawal/details";
import { SuccessWithdrawalPage } from "./pages/admin/withdrawal/success";
import { RejectedWithdrawalPage } from "./pages/admin/withdrawal/rejected";
import { OnProcessWithdrawalPage } from "./pages/admin/withdrawal/on-process";
import { LoginPage } from "./pages/auth/login";
import { CreateProductPage } from "./pages/seller/create-product";
import { CardOrderBuyer } from "@/features/orders/components/buyer/card-order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        children: [{ path: "", element: <CardOrderBuyer /> }],
        element: <BuyerLayout />,
        errorElement: <ErrorPage />,
      },
      {
        path: "auth",
        errorElement: <ErrorPage />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
      {
        path: "admin",
        errorElement: <ErrorPage />,
        element: <AdminLayout />,
        children: [
          { path: "", element: <AdminHomePage /> },
          { path: "withdrawal", element: <WithdrawalPage /> },
          { path: "withdrawal/pending", element: <PendingWithdrawalPage /> },
          { path: "withdrawal/success", element: <SuccessWithdrawalPage /> },
          { path: "withdrawal/rejected", element: <RejectedWithdrawalPage /> },
          {
            path: "withdrawal/on-process",
            element: <OnProcessWithdrawalPage />,
          },
          { path: "withdrawal/:id", element: <WithdrawalDetails /> },
        ],
      },
      {
        path: "seller",
        errorElement: <ErrorPage />,
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
            element: <CreateProductPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "settings/store",
            element: <SettingsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
