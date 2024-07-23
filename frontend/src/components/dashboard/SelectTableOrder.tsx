import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FiDownload } from "react-icons/fi";
export function TableOrderHeader(){
    return(
        <div color="gray" className="flex flex-row justify-between mx-4">
                <Select>
                    <SelectTrigger className="w-[110px]">
                        <FiDownload className="mr-1"/>
                        <SelectValue placeholder="Export"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="CSV">CSV</SelectItem>
                        <SelectItem value="XLS">XLS</SelectItem>
                    </SelectContent>
                </Select>

            <div className="flex gap-2">
                <Select>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="All Variant"/>
                            
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Biru">Biru</SelectItem>
                        <SelectItem value="Merah">Merah</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Terbaru">Belum Pengiriman</SelectItem>
                        <SelectItem value="Harga Terendah">Dalam Pengiriman</SelectItem>
                        <SelectItem value="Harga Tertinggi">Selesai Pengiriman</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Order ID" type="text"/>
            </div>

        </div>

    )
}