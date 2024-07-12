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
import { OrderHistory } from "@/features/orders/seller/components/history";
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

const getInvoice = (status: Order["status"]) => {
  if ((["ON_DELIVERY", "SUCCESS"] as Order["status"][]).includes(status))
    return "JTI81SAH18H";
  return "-";
};

export default function OrderDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const order: Order = {
    courier: {
      courierCode: "jne",
      courierServiceCode: "reg",
      courierServiceName: "Regular",
      createdAt: new Date("2024-07-09"),
      id: 1,
      price: 100000,
      updatedAt: new Date("2024-07-09"),
    },
    createdAt: new Date("2024-07-09"),
    updatedAt: new Date("2024-07-09"),
    discount: 0,
    id: 1,
    pricePerProduct: 10000,
    productVariant: { name: "XL", price: 170000, stock: 10 },
    qty: 11,
    receiverAddress:
      "RT.08 / RW.07, No. 174, Jln. Haji Mawi, Desa Waru Jaya, Parung, Bogor",
    receiverCityDistrict: "bogor",
    receiverLatitude: "-6.436880880006719",
    receiverLongitude: "106.71093027943792",
    receiverPostalCode: "63330",
    receiverProvince: "jawa_barat",
    status: "NEW_ORDER",
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
            <BreadcrumbLink asChild>
              <Link to={`/${order?.id}`}>{order?.productVariant?.name}</Link>
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
                orderTabVariants({ variant: order.status }),
                "rounded-sm w-fit"
              )}
            >
              {ORDER_STATUS_LABEL[order.status]}
            </Badge>
            <div className=" text-sm">
              {order.status === "NOT_PAID"
                ? ORDER_STATUS_DESCRIPTION[order.status](order.createdAt)
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
                text="COPIED INVOICE..."
                className="w-6 h-6"
                size="icon"
                variant="ghost"
              >
                <BsCopy />
              </ButtonCopy>
              INV/1010101/MPL/BLABLABLA
            </div>
          </div>
          <div className="flex gap-2 p-2 justify-between text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <BiUserCircle size={24} className="text-lakoe-primary" />
              <p>Pembeli</p>
            </div>
            <div className="flex items-center gap-2">
              <RiWhatsappFill size={22} color="#4FCE5D" /> Jamal Boolean
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
              <Card className="p-2 flex gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1720582760044-c4d220f09305?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="aspect-square min-w-[50px] min-h-[50px] max-h-[50px] max-w-[50px]"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{order.productVariant?.name}</p>
                  <p className="font-semibold">
                    {order.qty} x Rp.{order.pricePerProduct}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-auto items-end">
                  <p className="text-muted-foreground font-semibold">
                    Total Belanja
                  </p>
                  <p className="font-semibold">
                    Rp.{order.pricePerProduct * order.qty}
                  </p>
                </div>
              </Card>
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
                  <td>{order.courier.courierServiceName}</td>
                </tr>
                <tr className="pb-4">
                  <td className="flex gap-2 items-center mr-4">
                    <span>No Resi</span>
                    <ButtonCopy
                      className="w-6 h-6"
                      text="COPIED NO RESI..."
                      size="icon"
                      variant="ghost"
                    >
                      <BsCopy />
                    </ButtonCopy>
                  </td>
                  <td>{getInvoice(order.status)}</td>
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
                    <p>{order.receiverAddress}</p>
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
