import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { ProductsPage } from "./pages/seller/products";
import { OrdersPage } from "./pages/seller/orders";
import { SettingsPage } from "./pages/seller/settings";
import { OrderDetails } from "./pages/seller/orders-detail";
import { SellerLayout } from "./pages/seller/layout";
import { BuyerLayout } from "./pages/buyer/layout";
import { AdminLayout } from "./pages/admin/layout/root-layout";
import { NotFoundPage } from "./pages/fallback/not-found";
import { ErrorPage } from "./pages/fallback/error";
import { AdminHomePage } from "./pages/admin/home";
import { PendingWithdrawalPage } from "./pages/admin/withdrawal/pending";
import { WithdrawalDetails } from "./pages/admin/withdrawal/details";
import { SuccessWithdrawalPage } from "./pages/admin/withdrawal/success";
import { RejectedWithdrawalPage } from "./pages/admin/withdrawal/rejected";
import { OnProcessWithdrawalPage } from "./pages/admin/withdrawal/on-process";
import { LoginPage } from "./pages/auth/login";
import { CreateProductPage } from "./pages/seller/create-product";
import { DashboardSeller } from "./pages/seller/dashboard";
import { RegisterPage } from "./pages/auth/regist";
import { Delivery } from "@/features/settings/components/delivery";
import { PaymentMethod } from "@/features/settings/components/payment-method";
import { ForgotPasswordPage } from "./pages/auth/forgot";
import { ResetPasswordPage } from "./pages/auth/reset-password";
import { OAuthCallback } from "./pages/oauth/callback";
import { Authored, Authorize } from "@/components/authorize/authorize";
import { AuthLayout } from "./pages/auth/layout";
import { ResetSuccessPage } from "./pages/auth/reset-success";
import { VerifiedPage } from "./pages/auth/verified";
import { VerifyPage } from "./pages/auth/verify";
import { StorePage } from "./pages/seller/store-page";
import { ProfilePage } from "./pages/profile/profile";
import { EditProfilePage } from "./pages/profile/edit-profile";
import { CartList } from "@/components/cart/cartlist";
import { AuthorizeNav } from "@/components/authorize/authorize-nav";
import { CheckoutPage } from "./pages/buyer/checkout/checkout";
import { BuyerHomePage } from "./pages/buyer/home";
import {
  HaveStoreAndRedirect,
  MustHaveStoreOrRedirect,
} from "@/components/authorize/have-store-or-redirect";
import { Landing } from "@/features/landing/landing";
import { ProductPage } from "./pages/buyer/product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        children: [
          { path: "", element: <Landing /> },
          {
            path: "cart",
            element: <CartList />,
          },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "products", element: <BuyerHomePage /> },
          { path: "products/:id", element: <ProductPage /> },
        ],
        element: <BuyerLayout />,
        errorElement: <ErrorPage />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <Authored />,
            children: [
              { path: "login", element: <LoginPage /> },
              { path: "register", element: <RegisterPage /> },
            ],
          },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password/:token", element: <ResetPasswordPage /> },
          {
            path: "verify-account",
            element: (
              <AuthorizeNav redirectUrl="/seller/dashboard" whenVerified>
                <VerifyPage />
              </AuthorizeNav>
            ),
          },
          {
            path: "verified",
            element: (
              <AuthorizeNav redirectUrl="/seller/dashboard" whenVerified>
                <VerifiedPage />
              </AuthorizeNav>
            ),
          },
          { path: "reset-success", element: <ResetSuccessPage /> },
        ],
      },
      {
        path: "",
        id: "private-admin-only",
        element: <Authorize roles={["ADMIN"]} />,
        children: [
          {
            path: "admin",
            errorElement: <ErrorPage />,
            element: <AdminLayout />,
            children: [
              { path: "", element: <AdminHomePage /> },
              {
                path: "withdrawal/pending",
                element: <PendingWithdrawalPage />,
              },
              {
                path: "withdrawal/success",
                element: <SuccessWithdrawalPage />,
              },
              {
                path: "withdrawal/rejected",
                element: <RejectedWithdrawalPage />,
              },
              {
                path: "withdrawal/on-process",
                element: <OnProcessWithdrawalPage />,
              },
              { path: "withdrawal/:id", element: <WithdrawalDetails /> },
            ],
          },
        ],
      },
      {
        path: "seller",
        id: "private",
        element: <Authorize />,
        children: [
          {
            path: "stores",
            children: [
              {
                path: "create",
                element: (
                  <HaveStoreAndRedirect>
                    <StorePage />
                  </HaveStoreAndRedirect>
                ),
              },
            ],
          },
          {
            path: "",
            errorElement: <ErrorPage />,
            element: (
              <MustHaveStoreOrRedirect>
                <SellerLayout />
              </MustHaveStoreOrRedirect>
            ),
            children: [
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
                element: <PaymentMethod />,
              },
              { path: "profile", element: <ProfilePage /> },
              { path: "profile/edit", element: <EditProfilePage /> },
            ],
          },
        ],
      },
      { path: "oauth/callback", element: <OAuthCallback /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
