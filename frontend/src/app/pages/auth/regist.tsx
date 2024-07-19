import { RegisterForm } from "@/components/form/register";
import { Helmet } from "react-helmet-async";

export function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterForm />;
    </>
  );
}
