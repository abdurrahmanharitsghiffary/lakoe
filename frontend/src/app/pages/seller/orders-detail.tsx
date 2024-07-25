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
import { Order } from "@/types/order";
import { Link } from "react-router-dom";
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
import { Helmet } from "react-helmet-async";

const ORDER_STATUS_LABEL = {
  CANCELLED: "Dibatalkan",
  READY_TO_DELIVER: "Siap Dikirim",
  NOT_PAID: "Belum Dibayar",
  ON_DELIVERY: "Dalam Pengiriman",
  SUCCESS: "Pesanan Selesai",
  NEW_ORDER: "Pesanan Baru",
} as const;

const ORDER_STATUS_DESCRIPTION = {
  CANCELLED:
    "Pesanan dibatalkan karena pembeli tidak melakukan pembayaran tepat waktu.",
  NEW_ORDER:
    "Segera proses pesanan yang telah masuk. Jangan membuat pembeli menunggu terlalu lama.",
  NOT_PAID: (endDate: Date) =>
    `Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai ${endDate?.toLocaleDateString()}. Silakan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan barang.`,
  SUCCESS: "Produk telah diterima oleh pembeli dan pesanan ini diselesaikan.",
  ON_DELIVERY:
    "Pesanan sudah dalam proses pengiriman. Silakan tunggu penerimaan barang oleh pembeli.",
  READY_TO_DELIVER:
    "Pesanan telah di-pickup oleh Kurir dan siap untuk dikirim.",
} as const;

export function OrderDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const order: Order = {
    createdAt: new Date("2024-07-23T02:49:04.824Z"),
    description: "Hallo bang rumahku yg disebelah pohon jubleg",
    id: "3b94819e-912c-4135-9d37-a3ebe506f662",
    status: "NEW_ORDER",
    updatedAt: new Date("2024-07-23T03:46:25.966Z"),
    invoice: {
      id: "8a8b8d26-534f-4fff-ba16-d9a425e980e9",
      invoiceNumber: "INV/20240723/MPL/D0D7376F3CFE",
      amount: "98",
      receiverAddress: "Jakarta lb bulus",
      receiverAddressPhone: "+628170032123",
      receiverCity: "Bogor",
      receiverContactName: "John Doe",
      receiverContactPhone: "+628170032123",
      receiverDistrict: "Parung",
      receiverLatitude: "-6.436870204535388",
      receiverLongitude: "106.7109946274437",
      receiverName: "John Doe",
      receiverPostalCode: "12950",
      receiverProvince: "Jawa Barat",
      serviceCharge: "0",
      updatedAt: new Date("2024-07-23T02:49:04.824Z"),
      createdAt: new Date("2024-07-23T02:49:04.824Z"),
    },
    courier: {
      id: 2,
      biteshipOrderId: "",
      biteshipTrackingId: "",
      biteshipWaybillId: "",
      price: "10000",
      courierCode: "jne",
      courierServiceCode: "reg",
    },
    orderDetails: [
      {
        sku: {
          sku: "RFNB17B7E",
          product: {
            name: "Refined Metal Chips",
            isActive: true,
            id: 465,
          },
          discount: "0",
          createdAt: new Date("2024-07-23T02:04:51.810Z"),
          updatedAt: new Date("2024-07-23T02:49:04.824Z"),
          id: 149,
          discountType: "FIXED",
          isActive: true,
          image: null,
          price: "98",
          stock: 96,
          weightInGram: 98,
          skuAttributes: [
            {
              value: "XXL",
              attribute: {
                name: "Size",
              },
            },
          ],
        },
        qty: 1,
        pricePerProduct: "98",
        weightPerProductInGram: 98,
      },
    ],
    _count: {
      orderDetails: 1,
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Helmet>
        <title>Order</title>
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/orders">Daftar Pesanan</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* <BreadcrumbLink asChild>
              <Link to={`/${order?.id}`}>{order?.productVariant?.name}</Link>
            </BreadcrumbLink> */}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <section className="flex gap-2 p-4">
          <MdListAlt size={24} className="text-lakoe-primary flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <Badge
              className={cn(
                orderTabVariants({ variant: order.status }),
                "rounded-sm w-fit"
              )}
            >
              {ORDER_STATUS_LABEL[order.status]}
            </Badge>
            <div className=" text-sm">
              {order.status === "NOT_PAID"
                ? ORDER_STATUS_DESCRIPTION[order.status](order?.createdAt)
                : ORDER_STATUS_DESCRIPTION[order.status]}
            </div>
            <OrderHistory />
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
            {moment(order.createdAt).format("LLL")}
          </div>
          <div className="flex gap-2 p-2 justify-between text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <PiInvoice size={24} className="text-lakoe-primary" />
              <p>Invoice</p>
            </div>
            <div className="flex items-center gap-2">
              <ButtonCopy
                text={order.invoice.invoiceNumber}
                className="w-6 h-6"
                size="icon"
                variant="ghost"
              >
                <BsCopy />
              </ButtonCopy>
              {order.invoice.invoiceNumber}
            </div>
          </div>
          <div className="flex gap-2 p-2 justify-between text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <BiUserCircle size={24} className="text-lakoe-primary" />
              <p>Pembeli</p>
            </div>
            <div className="flex items-center gap-2">
              <RiWhatsappFill size={22} color="#4FCE5D" />{" "}
              {order.invoice.receiverContactName}
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
              {order.orderDetails.map((detail) => (
                <Card className="p-2 flex gap-2">
                  <Image
                    src={
                      detail?.sku?.image ||
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
                    {/* <p className="font-semibold">
                    Rp.{order.pricePerProduct * order.qty}
                  </p> */}
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
                <tr className="pb-4">
                  <td className="mr-4">Kurir</td>
                  <td>{order.courier.courierCode}</td>
                </tr>
                <tr className="pb-4">
                  <td className="flex gap-2 items-center mr-4">
                    <span>No Resi</span>
                    <ButtonCopy
                      className="w-6 h-6"
                      text={order.courier.biteshipWaybillId}
                      size="icon"
                      variant="ghost"
                    >
                      <BsCopy />
                    </ButtonCopy>
                  </td>
                  <td>{order.courier.biteshipWaybillId || "-"}</td>
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
                    <p>{order.invoice.receiverAddress}</p>
                    <p className="text-muted-foreground font-normal">
                      085612123434
                    </p>
                    <p className="text-muted-foreground font-normal">
                      Jamal Boolean{" "}
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
              <span className="font-semibold">Rp. 180.000</span>
            </div>
            <div className="w-full flex justify-between text-sm">
              <span>Total Ongkir</span>
              <span className="font-semibold">Rp. 10.000</span>
            </div>
            <div className="w-full flex justify-between text-sm">
              <span>Diskon</span>
              <span className="font-semibold">Rp. 0</span>
            </div>
            <div className="w-full flex justify-between text-sm">
              <span>Biaya Layanan</span>
              <span className="font-semibold">Rp. 0</span>
            </div>
            <hr />
            <div className="w-full flex justify-between text-base font-semibold">
              <span>Total Penjualan</span>
              <span>Rp. 180.000</span>
            </div>
          </div>
        </section>
      </Card>
      {order.status === "NEW_ORDER" && (
        <Card>
          <section className="flex justify-between w-full items-center p-4">
            <Button variant="destructive" className="rounded-full" size="sm">
              Tolak Pesanan
            </Button>
            <Button variant="lakoePrimary" className="rounded-full" size="sm">
              Proses Pesanan
            </Button>
          </section>
        </Card>
      )}
      <TrackingDialog isOpen={isOpen} onOpen={setIsOpen} />
    </div>
  );
}

// before:bg-zinc-200 before:w-[3px] before:h-[100%] before:block before:absolute before:bottom-[50%] before:rounded-md before:left-[19.5px]
