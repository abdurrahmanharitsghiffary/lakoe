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
import { DashboardSeller } from "./pages/seller/dashboard";
import { RegisterPage } from "./pages/auth/regist";
import { Delivery } from "@/features/settings/components/delivery";
import { PaymentMethod } from "@/features/settings/components/payment-method";
import { ForgotPasswordPage } from "./pages/auth/forgot";
import { ResetPasswordPage } from "./pages/auth/reset-password";
import { OAuthCallback } from "./pages/oauth/callback";
import { ProfileForm } from "@/features/profile/profile-form"
import { Profile } from "@/features/profile/profile";
import { ProfileLayout } from "./pages/profile/layout";


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
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
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
          { path: "dashboard", element: <DashboardSeller /> },
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
          {
            path: "settings/delivery",
            element: <Delivery />,
          },
          {
            path: "settings/payment",
            element: <PaymentMethod/>
          },
          {
            path: "profile", 
            element: <Profile/>,
            children: []
          },
          {
            path: "edit-profile", 
            element: <ProfileForm/>
          },
        ],
      },
      // {
      //   path: "profile",
      //   errorElement: <ErrorPage />,
      //   element: <ProfileLayout/>,
      //   children: [
      //     {path: "", element: <Profile/>},
      //     {path: "edit-profile", element: <ProfileForm/>}
      //   ]
      // },
      { path: "oauth/callback", element: <OAuthCallback /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
