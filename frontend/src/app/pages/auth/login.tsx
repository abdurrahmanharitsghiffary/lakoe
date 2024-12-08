import { LoginForm } from "@/components/form/login";
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
