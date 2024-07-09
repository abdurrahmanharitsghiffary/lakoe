import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductProps {
    status: keyof typeof status;
    invoice: string;
    name: string;
    variant: string;
    size: string;
    image: string;
    totalItem: number;
    totalPrice: number;
}

export const status = {
    belum: { label: "Belum Dibayar", cn: "#e8c600", buttonLabel: "Hubungi Pembeli" },
    pesanBaru: { label: "Pesanan Baru", cn: "#008f5d", buttonLabel: "Proses Pesanan"},
    siapDikirim: { label: "Siap Dikirim", cn: "#147af3", buttonLabel: "Kabari Pembeli"},
    dalamPengiriman: { label: "Dalam Pengiriman", cn: "#f68511", buttonLabel: "Lihat Rincian Pengiriman" },
    pesananSelesai: { label: "Pesanan Selesai", cn: "#ffffff", buttonLabel: "Hubungi Pembeli" },
    dibatalkan: { label: "Dibatalkan", cn: "#ea3829", buttonLabel: ""},
}

export const ProductComponent: React.FC<ProductProps> = ({ status: statusKey, invoice, name, variant, size, image, totalItem, totalPrice }) => {
    const handleSubmit = () => {
        // Logic for order submission
    };

    const { label, cn, buttonLabel } = status[statusKey]

    return (
        <div className="flex justify-center">
            <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-300 w-full h-auto">
                <CardHeader className="items-left bg-gray-50">
                    <div className="flex justify-between pt-4">
                        <div className="flex-shrink-0">
                        <p className="py-1 px-4 block w-fit text-white rounded-sm w-1/5 h-7 flex justify-center pb-7" style={{ backgroundColor: cn }}>{label}</p>
                        <p className="text-gray-500 mt-2">{invoice}</p>
                        </div>

                        {buttonLabel && (
                            <Button className="py-2 px-4 text-black bg-white rounded-full border border-gray-300 mt-10" onClick={handleSubmit}>
                            {buttonLabel}
                         </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent className=" flex justify-end ">
                    <div className="flex items-center mr-auto">
                        <img className="w-20 h-20 object-cover border border-gray-300" src={image} alt={name} />
                        <div className="ml-4">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                {name} | {variant} - {size}
                            </CardTitle>
                            <CardDescription className="text-gray-500 mt-2">{totalItem} Barang</CardDescription>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-lg text-gray-500">Total belanja</p>
                        <p className="text-xl font-semibold text-gray-900">Rp{totalPrice}</p>
                    </div>


                </CardContent>
            </Card >
        </div>

    );
};


