import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { orderTabVariants } from "@/components/variants/order-tab-variants";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import { OrderHistory } from "@/features/orders/components/seller/history";
import { BiCalendar, BiUserCircle } from "react-icons/bi";
import { PiInvoice } from "react-icons/pi";
import moment from "moment";
import { BsCopy } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { Image } from "@/components/image";
import { TbTruckDelivery } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { ButtonCopy } from "@/components/button/copy";
import { MdListAlt } from "react-icons/md";
import { LuBox } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { TrackingDialog } from "@/components/dialog/tracking-dialog";
import { useState } from "react";
import { useGetOrder } from "@/features/orders/api/get-order";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useAcceptOrder } from "@/features/orders/api/accept-order";
import { useRejectOrder } from "@/features/orders/api/reject-order";
import { toast } from "react-toastify";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { ORDER_STATUS_DESCRIPTION, ORDER_STATUS_LABEL } from "@/constants";

export function OrderDetails() {
  const { id } = useParams();
  console.log(id);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetOrder({ id: id ?? "" });

  const { acceptOrderAsync } = useAcceptOrder();
  const { rejectOrderAsync } = useRejectOrder();

  const order = data?.data;

  const handleAcceptOrder = async () => {
    if (!id) return;
    await toast.promise(
      acceptOrderAsync(id)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
      {
        success: "Order berhasil diterima",
        error: {
          render({ data }) {
            return getAxiosErrMessage(data);
          },
        },
      }
    );
  };

  const handleRejectOrder = async () => {
    if (!id) return;
    await toast.promise(
      rejectOrderAsync(id)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
      {
        success: "Order berhasil ditolak",
        error: {
          render({ data }) {
            return getAxiosErrMessage(data);
          },
        },
      }
    );
  };

  const totalPrice =
    +(order?.invoice?.amount ?? "0") +
    +(order?.courier?.price ?? "0") +
    +(order?.invoice?.serviceCharge ?? "0");

  console.log(order, "ORDER");
  if (isLoading)
    return (
      <div className="flex justify-center items-center p-4">
        <LoadingSpinner className="text-lakoe-primary" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/seller/orders">Daftar Pesanan</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/seller/orders/${id}`}>
                {order?.invoice?.invoiceNumber}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <section className="flex gap-2 p-4">
          <MdListAlt size={24} className="text-lakoe-primary flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <Badge
              className={cn(
                orderTabVariants({ variant: order?.status }),
                "rounded-sm w-fit"
              )}
            >
              {ORDER_STATUS_LABEL[order?.status ?? "NEW_ORDER"]}
            </Badge>
            <div className=" text-sm">
              {order?.status === "NOT_PAID"
                ? ORDER_STATUS_DESCRIPTION[order?.status](order?.createdAt)
                : ORDER_STATUS_DESCRIPTION[order?.status ?? "NEW_ORDER"]}
            </div>
            <OrderHistory orderId={id ?? ""} />
          </div>
        </section>
      </Card>
      <Card>
        <section className="flex flex-col py-4 px-2">
          <div className="flex gap-2 p-2 justify-between text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <BiCalendar size={24} className="text-lakoe-primary" />
              <p>Tanggal</p>
            </div>
            {moment(order?.createdAt).format("LLL")}
          </div>
          <div className="flex gap-2 p-2 justify-between text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <PiInvoice size={24} className="text-lakoe-primary" />
              <p>Invoice</p>
            </div>
            <div className="flex items-center gap-2">
              <ButtonCopy
                text={order?.invoice?.invoiceNumber}
                className="w-6 h-6"
                size="icon"
                variant="ghost"
              >
                <BsCopy />
              </ButtonCopy>
              {order?.invoice?.invoiceNumber}
            </div>
          </div>
          <div className="flex gap-2 p-2 justify-between text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <BiUserCircle size={24} className="text-lakoe-primary" />
              <p>Pembeli</p>
            </div>
            <div className="flex items-center gap-2">
              <RiWhatsappFill size={22} color="#4FCE5D" />{" "}
              {order?.invoice?.receiverContactName}
            </div>
          </div>
        </section>
      </Card>
      <Card>
        <section className="flex gap-2 p-4">
          <LuBox size={24} className="text-lakoe-primary" />
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-semibold">Detail Produk</p>
            <div className="text-sm">
              {(order?.orderDetails ?? []).map((detail) => (
                <Card className="p-2 flex gap-2">
                  <Image
                    src={
                      detail?.sku?.image ??
                      detail?.sku?.product?.images?.[0] ??
                      "https://cdn-icons-png.flaticon.com/512/13406/13406810.png"
                    }
                    className="aspect-square min-w-[50px] min-h-[50px] max-h-[50px] max-w-[50px]"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">
                      {detail?.sku?.product?.name + " " + detail?.sku?.sku}
                    </p>
                    <p className="font-semibold">
                      {detail?.qty} x Rp.{detail?.pricePerProduct}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-auto items-end">
                    <p className="text-muted-foreground font-semibold">
                      Total Belanja
                    </p>
                    <p className="font-semibold">
                      Rp.{+detail?.pricePerProduct * +detail?.qty}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Card>
      <Card>
        <section className="flex flex-col gap-2 p-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <TbTruckDelivery size={24} className="text-lakoe-primary" />
              <p className="font-semibold text-sm">Detail Pengiriman</p>
            </div>
            <p
              onClick={() => setIsOpen(true)}
              className="font-semibold text-sm text-lakoe-primary"
            >
              Lacak Pengiriman
            </p>
          </div>
          <div>
            <table className="text-sm font-semibold border-separate border-spacing-y-2 pl-8">
              <tbody>
                <tr className="pb-4 capitalize">
                  <td className="mr-4">Kurir</td>
                  <td>{order?.courier?.courierCode}</td>
                </tr>
                <tr className="pb-4">
                  <td className="flex gap-2 items-center mr-4">
                    <span>No Resi</span>
                    <ButtonCopy
                      className="w-6 h-6"
                      text={order?.courier?.biteshipWaybillId ?? "-"}
                      size="icon"
                      variant="ghost"
                    >
                      <BsCopy />
                    </ButtonCopy>
                  </td>
                  <td>{order?.courier?.biteshipWaybillId || "-"}</td>
                </tr>
                <tr className="pb-4">
                  <td className="flex gap-2 items-centers mr-4">
                    <span>Alamat</span>
                    <ButtonCopy
                      className="w-6 h-6"
                      text="COPIED NO RESI..."
                      size="icon"
                      variant="ghost"
                    >
                      <BsCopy />
                    </ButtonCopy>
                  </td>
                  <td>
                    <p>{order?.invoice?.receiverAddress}</p>
                    <p className="text-muted-foreground font-normal">
                      {order?.invoice?.receiverAddressPhone}
                    </p>
                    <p className="text-muted-foreground font-normal">
                      {order?.invoice?.receiverName}{" "}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </Card>
      <Card>
        <section className="p-4 flex gap-2 w-full">
          <IoWalletOutline size={24} className="text-lakoe-primary" />
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-semibold">Rincian Pembayaran</p>
            <div className="w-full flex justify-between text-sm">
              <span>Total Harga (1 Barang)</span>
              <span className="font-semibold">
                Rp. {order?.invoice?.amount}
              </span>
            </div>
            <div className="w-full flex justify-between text-sm">
              <span>Total Ongkir</span>
              <span className="font-semibold">Rp. {order?.courier?.price}</span>
            </div>
            <div className="w-full flex justify-between text-sm">
              <span>Diskon</span>
              <span className="font-semibold">Rp. 0</span>
            </div>
            <div className="w-full flex justify-between text-sm">
              <span>Biaya Layanan</span>
              <span className="font-semibold">
                Rp. {order?.invoice?.serviceCharge}
              </span>
            </div>
            <hr />
            <div className="w-full flex justify-between text-base font-semibold">
              <span>Total Penjualan</span>
              <span>Rp. {totalPrice}</span>
            </div>
          </div>
        </section>
      </Card>
      {order?.status === "NEW_ORDER" && (
        <Card>
          <section className="flex justify-between w-full items-center p-4">
            <Button
              variant="destructive"
              className="rounded-full"
              size="sm"
              onClick={handleRejectOrder}
            >
              Tolak Pesanan
            </Button>
            <Button
              variant="lakoePrimary"
              className="rounded-full"
              size="sm"
              onClick={handleAcceptOrder}
            >
              Proses Pesanan
            </Button>
          </section>
        </Card>
      )}
      <TrackingDialog orderId={id ?? ""} isOpen={isOpen} onOpen={setIsOpen} />
    </div>
  );
}

// before:bg-zinc-200 before:w-[3px] before:h-[100%] before:block before:absolute before:bottom-[50%] before:rounded-md before:left-[19.5px]
