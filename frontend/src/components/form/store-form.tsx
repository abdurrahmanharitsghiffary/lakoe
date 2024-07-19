import { Button } from "../ui/button";

import { InputForm } from "@/features/products/components/input/input-form";
import { AvatarInput } from "../input/logo-input";
import { BannerInput } from "../input/banner-input";
import { useStore } from "@/hooks/use-store";

export function StoreForm() {
  const { register, handleSubmit, errors, onSubmit } = useStore();
  console.log(errors);

  // const { onChange, ...bannerField } = register("bannerAttachment");

  return (
    <>
      <div className="w-full lg:grid  min-h-[100dvh]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Atur Toko</h1>
              <p className="text-balance text-muted-foreground">
                Buat toko impian kamu di Lakoe
              </p>
            </div>
            <div className="grid gap-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="flex justify-center">
                  <AvatarInput {...register("logo")} />
                </div>
                <div>
                  <BannerInput
                    {...register("banner")}
                    // {...bannerField}
                    // onChange={(e) => {
                    //   const file = e.target?.files?.[0];
                    //   onChange(file);
                    //   e.target.value = "";
                    // }}
                  />
                </div>
                <div className="grid gap-2">
                  <InputForm
                    label="Apa Nama Toko Kamu?"
                    type="text"
                    isRequired
                    focus="lakoePrimary"
                    {...register("name")}
                  />
                  <p className="text-xs text-destructive">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="grid gap-2">
                  <InputForm
                    label="Slogan Tokonya Dong"
                    isRequired
                    focus="lakoePrimary"
                    type="text"
                    {...register("slogan")}
                  />
                  <p className="text-xs text-destructive">
                    {errors.slogan?.message}
                  </p>
                </div>
                <div className="grid gap-2">
                  <InputForm
                    label="Deskripsikan Toko Kamu"
                    isRequired
                    focus="lakoePrimary"
                    type="text"
                    {...register("description")}
                  />
                  <p className="text-xs text-destructive">
                    {errors.description?.message}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant={"lakoePrimary"}
                >
                  Simpan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
