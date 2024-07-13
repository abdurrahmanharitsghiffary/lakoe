import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { InputForm } from "@/features/products/components/input/input-form";
import { useWithdrawalCredit } from "@/hooks/use-withdrawal-credit";
import { Card } from "../ui/card";

type ProductDialogTarikCreditProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DashboardDialogTarikCredit({
  isOpen,
  onOpen,
}: ProductDialogTarikCreditProps) {
  const { form, onSubmit } = useWithdrawalCredit();
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          onOpen(open);
        }}
      >
        <DialogContent className="flex-col sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="mx-3">Tarik Credit</DialogTitle>
            <DialogDescription className="flex w-100">
              <Card className=" bg-gray w-full h-auto py-4 mx-3 mt-3 justify-start">
                <div className="flex px-3 gap-3 mx-3 ">
                  <p> • </p>
                  <p>Withdraw hanya dilakukan maksimal 1x per hari.</p>
                </div>
                <div className="flex px-3 gap-3 mx-3 ">
                  <p> • </p>
                  <p>Dan akan diproses dihari kerja pada jam 09:00 - 17:00</p>
                </div>
                <div className="flex px-3 gap-3 mx-3 ">
                  <p> • </p>
                  <p>
                    Direkomendasikan Withdraw ke Rekening BCA, Selain rekening
                    BCA akan memakan waktu 2-3 hari kerja
                  </p>
                </div>
              </Card>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <InputForm
                            label="Berapa Banyak yang ingin anda Tarik?"
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="flex mx-3 gap-2">
                          <p className="text-blue-500 italic">
                            Jumlah Maksimal:{" "}
                          </p>
                          <p className="text-blue-500 font-bold italic">Rp0</p>
                        </FormDescription>
                      </FormItem>
                      <FormMessage className="ms-4"></FormMessage>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <div className="m-3">
                      <Label>Tarik Ke :</Label>
                      <FormItem>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Rekening Bank untuk penarikan" />
                            </SelectTrigger>
                            <SelectContent {...field}>
                              <SelectItem value="BNI">BNI</SelectItem>
                              <SelectItem value="Mandiri">Mandiri</SelectItem>
                              <SelectItem value="BCA">BCA</SelectItem>
                              <SelectItem value="BRI">BRI</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                      <FormMessage className="ms-2" />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <InputForm
                            label="Password"
                            placeholder="Masukkan Kata Sandi Anda"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="ms-4"></FormMessage>
                    </>
                  )}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button
                  onClick={() => {
                    onOpen(false);
                  }}
                  className=" rounded-full"
                  variant="outline"
                >
                  Batalkan
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    onOpen(false);
                  }}
                  className=" rounded-full bg-lakoe-primary"
                  //   onClick={handleSubmit((data) => {
                  //     onSubmit(data)
                  //   })}
                >
                  Tarik Credit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
