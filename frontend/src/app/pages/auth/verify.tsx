import { VerifyForm } from "@/components/form/verify-account";
import { Helmet } from "react-helmet-async";

export function VerifyPage() {
  return (
    <>
      <Helmet>
        <title>Verifikasi Akun</title>
      </Helmet>
      <VerifyForm />
    </>
  );
}
