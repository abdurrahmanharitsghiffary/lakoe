import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useLogin } from "@/hooks/use-login";

type ProductDialogLoginProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckoutDialogLogin({
  isOpen,
  onOpen,
}: ProductDialogLoginProps) {
  const { handleSubmit, onSubmit, register, errors } = useLogin();
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          onOpen(open);
        }}
      >
        <DialogContent className="flex-col sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex flex-col items-center gap-3">
              <DialogTitle className="mx-3 text-[25px]">Rama Store</DialogTitle>
              <DialogTitle className="mx-3 text-[30px]">Masuk</DialogTitle>
              <DialogDescription className="flex w-100">
                <span className="text-lg">Welcome Back!</span>
              </DialogDescription>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <>
                <Label className="text-lg px-3">Nomor HP atau Email</Label>
                <Input
                  id="email"
                  placeholder="890823777 atau you@email.com"
                  className="mt-[-10px] text-lg h-12 w-[420px] ml-3"
                  {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </>
            </div>
            <DialogFooter className="mt-10">
              <div className="flex flex-col w-full px-3">
                <Button
                  type="submit"
                  onClick={() => {
                    onOpen(false);
                  }}
                  className=" rounded-full bg-lakoe-primary text-lg"
                  //   onClick={handleSubmit((data) => {
                  //     onSubmit(data)
                  //   })}
                >
                  Masuk
                </Button>
                <div className="flex flex-row text-lg gap-2 mt-6 justify-center">
                  <span>Belum Punya Akun?</span>
                  <span className="text-blue-500">Daftar</span>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
