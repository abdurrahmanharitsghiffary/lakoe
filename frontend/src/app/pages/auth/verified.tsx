import { VerifiedAccount } from "@/components/form/verified";
import { getMeOptions } from "@/features/me/api/me-api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function VerifiedPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: getMeOptions().queryKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VerifiedAccount />
    </>
  );
}
