import { ProductComponent, status } from "./product"
import { CardTitle } from "@/components/ui/card";
import ProductTabs from "./product-tabs";

interface Product {
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

export function ProductList() {
    const products: Product[] = [
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
            <ProductTabs />
            {products.map((product) => (
                <ProductComponent
                    name={product.name}
                    invoice={product.invoice}
                    status={product.status}
                    variant={product.variant}
                    size={product.size}
                    image={product.image}
                    totalItem={product.totalItem}
                    totalPrice={product.totalPrice}
                />
            ))}
        </div>
    )
}

