import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputForm } from "@/features/products/components/input/input-form";
import { Button } from "@/components/ui/button";
import { useStoreUpdate } from "@/hooks/use-store-update";
import { useWatchImage } from "@/hooks/use-watch-image";
import { MdAddBusiness } from "react-icons/md";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { InputFileHiddenControlled } from "@/components/input/input-file-hidden-controller";

export function CardStore() {
  const { register, handleSubmit, errors, onSubmit, control, watch } =
    useStoreUpdate();
  console.log(errors, "ERRORS");
  const logo = useWatchImage(watch("logo") as any) as string;
  const banner = useWatchImage(watch("banner") as any) as string;

  return (
    <div className="flex-col justify-center m-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-xl mb-4">Informasi Toko</h1>
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-2 mr-4">
            <InputForm
              label="Slogan"
              placeholder="Buat slogan untuk tokomu"
              focus={"lakoePrimary"}
              {...register("slogan")}
            />
            <p className="text-xs text-destructive">{errors.slogan?.message}</p>
            <InputForm
              label="Nama Toko"
              placeholder="Fesyen Store"
              focus={"lakoePrimary"}
              {...register("name")}
            />
            <p className="text-xs text-destructive">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label>Deskripsi</Label>
            <Textarea
              placeholder="Masukkan Deskripsi Tokomu"
              className="resize-none h-28"
              {...register("description")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-start">
          <div className="flex flex-col gap-2">
            <Label>Logo</Label>
            <InputFileHiddenControlled
              divProps={{
                className:
                  "border-input flex justify-center items-center border rounded-md overflow-hidden min-w-28 max-w-28 min-h-28 max-h-28",
              }}
              control={control}
              name="logo"
            >
              {logo ? (
                <img src={logo} alt="logo" className="aspect-square w-full" />
              ) : (
                <MdAddBusiness size={40} className="text-gray-400" />
              )}
            </InputFileHiddenControlled>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Banner</Label>
            <InputFileHiddenControlled
              divProps={{
                className:
                  "border-input flex justify-center items-center border min-h-[150px] max-h-[150px] w-full max-w-md rounded-md overflow-hidden",
              }}
              control={control}
              name="banner"
            >
              {banner ? (
                <img
                  src={banner}
                  alt="banner"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <MdOutlineAddAPhoto size={60} className="text-gray-400" />
              )}
            </InputFileHiddenControlled>
          </div>
        </div>
        <div className="text-end m-3">
          <Button variant="lakoePrimary" className="rounded-full" type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
