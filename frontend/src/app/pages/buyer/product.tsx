import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { Typography } from "@/components/ui/typography";
import { RiAddFill } from "react-icons/ri";
import { StoreAvatar } from "@/components/store/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "@/features/products/api/get-product";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useSetSkus } from "@/hooks/use-checkout";
import { useGetStoreAddress } from "@/features/address/api/get-store-address";
import { Image } from "@/components/image";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function ProductPage() {
  const { id } = useParams();
  const setSkus = useSetSkus();
  const productId = Number(id);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetProduct({ productId });
  const product = data?.data;
  const images = product?.images ?? [];
  console.log(images, "IMAGES");
  const { data: storeAddress } = useGetStoreAddress({
    storeId: product?.store?.id || -1,
  });

  const address = storeAddress?.data ?? [];

  const skus = product?.skus ?? [];
  const sortedSkus = skus.slice().sort((a, b) => +a.price - +b.price);
  const priceLabel =
    sortedSkus?.length > 1
      ? `Rp ${sortedSkus?.[0]?.price} - Rp ${sortedSkus?.slice(-1)?.[0]?.price}`
      : `Rp ${sortedSkus?.[0]?.price}`;

  const defaultAttrs: Record<string, string> = {};
  product?.attributtes.forEach((attr) => {
    defaultAttrs[attr.name] = attr.skuAttributes[0].value;
  });

  const [selectedAttrs, setSelectedAttrs] = useState(defaultAttrs);

  const selectedSku =
    skus.find((sku) =>
      sku.skuAttributes.every(
        (attribute) =>
          selectedAttrs[attribute.attribute.name] === attribute.value
      )
    ) ?? skus?.[0];
  const selectedProductImage = selectedSku?.image ?? product?.images?.[0];
  console.log(selectedProductImage, "SKUSELECTEDD");

  const [qty, setQty] = useState(0);
  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(+e.target.value);
  };

  const isCheckoutDisabled =
    +(product?.minimumOrder ?? 0) > qty ||
    (selectedSku?.stock ?? 0) < qty ||
    address.length === 0;

  const handleCheckout = () => {
    if (selectedSku?.id) {
      setSkus([{ sku: selectedSku, qty, name: product?.name ?? "" }]);
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (isSuccess) setSelectedAttrs(defaultAttrs);
  }, [isSuccess]);

  return (
    <div className="w-full gap-2 flex">
      <div className="w-[30%] px-14 max-h-[100dvh] flex items-center  min-h-[100dvh] h-full">
        <Carousel className="h-full w-full flex items-center">
          <CarouselContent className="aspect-square max-w-sm">
            {images.map((image, i) => (
              <CarouselItem>
                <Image
                  src={image}
                  alt={(product?.name ?? "") + i}
                  className="w-full block rounded-lg h-full aspect-square object-cover object-center"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="w-[40%] pt-28 flex flex-col gap-2 px-2 overflow-y-auto max-h-[100dvh] hide-scrollbar p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/products/${product?.id}`}>{product?.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Typography className="text-2xl font-bold">{product?.name}</Typography>
        <Typography
          className="text-3xl font-bold
        "
        >
          {priceLabel}
        </Typography>
        {/* <div className="flex gap-2 items-center">
          <p>Terjual 41+</p>•
          <p className="flex items-center gap-1">
            <FaStar className="text-yellow-300" />
            4.5 (10 Rating)
          </p>
        </div> */}

        <div className="flex flex-col gap-2">
          {product?.attributtes.map((attr) => (
            <>
              <p className="text-md">
                <span className="font-semibold">
                  Pilih {attr.name}: {selectedAttrs[attr.name]}
                </span>
              </p>
              <div className="flex gap-2">
                {attr.skuAttributes.map((skuAttr) => (
                  <Button
                    onClick={() => {
                      setSelectedAttrs((c) => ({
                        ...c,
                        [attr.name]: skuAttr.value,
                      }));
                    }}
                    variant={
                      skuAttr.value === selectedAttrs?.[attr.name]
                        ? "lakoeOutline"
                        : "outline"
                    }
                    className="rounded-lg"
                  >
                    {skuAttr.value}
                  </Button>
                ))}
              </div>
            </>
          ))}
        </div>

        <hr />
        <p>
          <span className="font-semibold">Min. Pemesanan:</span>{" "}
          {product?.minimumOrder} buah
        </p>
        <Typography className="text-xl font-semibold">Summary</Typography>
        <p>{product?.description}</p>
        <hr />
        <div className="flex gap-4 my-2 justify-between items-center">
          <StoreAvatar
            fallback={product?.store?.name?.slice(0, 1) ?? ""}
            name={product?.store?.name ?? ""}
            src={product?.store?.logoAttachment ?? ""}
          />
          <Button variant="lakoeOutline">Follow</Button>
        </div>
        <div className="flex flex-col gap-2">
          {address.length === 0 ? (
            "Toko tidak mempunyai alamat aktif"
          ) : (
            <>
              <Typography className="text-xl font-semibold">
                Pengiriman
              </Typography>
              <div className="flex items-center gap-2">
                <FiMapPin /> Dikirim Dari{" "}
                <strong>{address?.[0]?.province}</strong>
              </div>

              <div className="flex items-center gap-2">
                <FiTruck /> Ongkir reguler 8rb - 10rb
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-[30%] h-full max-h-[100dvh] min-h-[100dvh] flex items-center p-4">
        <Card className="w-full py-4">
          <CardContent className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Atur jumlah dan catatan</h2>
            <div className="flex gap-4 items-center">
              <img
                src={selectedProductImage}
                className="w-full block h-full aspect-square object-cover object-center max-w-[70px]"
              />
              <p className="font-semibold">
                {product?.name}{" "}
                {Object.entries(selectedAttrs)
                  .map(([, value]) => value)
                  .join(", ")}
              </p>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <div className="flex -space-x-px items-center">
                <Button
                  disabled={qty === 0}
                  onClick={() => setQty((c) => c - 1)}
                  variant="outline"
                  className="rounded-r-none focus:z-10"
                >
                  <FaMinus />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none focus:z-10 p-0"
                >
                  <input
                    type="number"
                    value={qty.toString()}
                    className="hide-input-arrow outline-none h-full px-4 w-16 text-center"
                    onChange={handleQtyChange}
                  />
                </Button>
                <Button
                  disabled={qty + 1 > (selectedSku?.stock ?? 0)}
                  variant="outline"
                  onClick={() => setQty((c) => c + 1)}
                  className="rounded-l-none focus:z-10"
                >
                  <FaPlus />
                </Button>
              </div>
              <span>
                <span className="font-semibold">Stock: </span>
                {selectedSku?.stock ?? 0}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="w-full flex text-lg">
              <p className="font-semibold">
                Harga per produk: Rp. {selectedSku?.price}
              </p>
            </div>
            <div className="w-full flex justify-between text-lg">
              <p className="text-muted-foreground">Subtotal:</p>
              <p className="font-semibold">
                Rp {qty * +(selectedSku?.price ?? 0)}
              </p>
            </div>
            <Button className="w-full" disabled={isCheckoutDisabled}>
              <RiAddFill />
              Keranjang
            </Button>
            <Button
              className="w-full"
              variant="outline"
              disabled={isCheckoutDisabled}
              onClick={handleCheckout}
            >
              Beli langsung
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
