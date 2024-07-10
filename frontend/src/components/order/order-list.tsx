import { ProductComponent, status } from "./order"
import { CardTitle } from "@/components/ui/card";
import ProductTabs from "./order-tabs";

interface IOrder {
    id: number;
    name: string;
    invoice: string;
    status: keyof typeof status;
    variant: string;
    size: string;
    image: string;
    totalItem: number;
    totalPrice: number;
}

export function OrderList() {
    const orders: IOrder[] = [
        {
            id: 1,
            name: "Basic cotton kenary",
            invoice: "1234",
            status: "dalamPengiriman",
            variant: "Black Mamba",
            size: "L",
            image: "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
            totalItem: 0,
            totalPrice: 0,
        },
        {
            id: 1,
            name: "Kaos",
            invoice: "1234",
            status: "belum",
            variant: "Black",
            size: "L",
            image: "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
            totalItem: 0,
            totalPrice: 0,
        },
    ]


    return (
        <div>
            {orders.map((order) => (
                <ProductComponent
                    name={order.name}
                    invoice={order.invoice}
                    status={order.status}
                    variant={order.variant}
                    size={order.size}
                    image={order.image}
                    totalItem={order.totalItem}
                    totalPrice={order.totalPrice}
                />
            ))}
        </div>
    )
}

