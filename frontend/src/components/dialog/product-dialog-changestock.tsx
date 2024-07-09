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
    FormMessage,
  } from "@/components/ui/form";
import { InputForm } from "@/features/products/components/input/input-form";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeStokSchema } from "@/validator/validator";
import { ChangeStokType } from "@/types/type";
import { CardProductProps } from "@/features/products/card-product";

type ProductDialogChangeStockProps = {
    isOpen: boolean;
    onOpen:React.Dispatch<React.SetStateAction<boolean>>
    product: CardProductProps
  };

export default function ProductDialogChangeStock({
    isOpen,
    onOpen,
    product
  }: ProductDialogChangeStockProps) {
    const form = useForm<ChangeStokType>({
        resolver: zodResolver(ChangeStokSchema),
        defaultValues: {
            stok: product.stock
          },
    });
    return (
        <>
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              onOpen(open)
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ubah Stok</DialogTitle>
                <DialogDescription className="flex gap-1">
                  Ubah Stok Untuk Produk <p style={{fontWeight:"bold"}}>{product.title}</p>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-1">
                    <Form {...form}>
                        <FormControl>
                        <InputForm
                                placeholder="Masukkan Stock Barang"
                                />
                        </FormControl>
                        <FormMessage />
                    </Form>
              </div>
              <DialogFooter>
                <Button onClick={(
                )=>{
                    onOpen(false)
                }} className=" rounded-full"  
                    variant="outline">
                    Batalkan
                </Button>
                <Button
                  type="submit"
                  onClick={(
                )=>{
                    onOpen(false)
                }}
                className=" rounded-full bg-lakoe-primary" 
                //   onClick={handleSubmit((data) => {
                    //     onSubmit(data)
                    //   })}
                    >
                    Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    }