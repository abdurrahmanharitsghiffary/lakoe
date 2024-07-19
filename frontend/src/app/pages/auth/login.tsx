import { LoginForm } from "@/components/form/login";
import React from "react";
import { Helmet } from "react-helmet-async";

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm />;
    </>
  );
}
