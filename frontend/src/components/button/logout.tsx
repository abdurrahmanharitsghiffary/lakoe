import { useConfirm } from "@/providers/alert-dialog-provider";
import { Button, ButtonProps } from "../ui/button";
import { FiLogOut } from "react-icons/fi";
import { useSessionActions } from "@/hooks/use-session";
import { useQueryClient } from "@tanstack/react-query";
import { getMeOptions } from "@/features/me/api/me-api";
import { useNavigate } from "react-router-dom";

export function LogoutButton(props: ButtonProps) {
  const confirm = useConfirm();
  const { logout } = useSessionActions();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await confirm({
      title: "Logout",
      body: "Are you sure want to logout?",
      actionProps: { variant: "destructive" },
      cancelProps: { variant: "secondary" },
    });
    logout();
    queryClient.invalidateQueries({ queryKey: getMeOptions().queryKey });
    navigate("/auth/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="flex gap-2 ml-auto"
      variant="lakoePrimary"
      {...props}
    >
      <FiLogOut size={20} />
      Logout
    </Button>
  );
}
