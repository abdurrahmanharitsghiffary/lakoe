import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";


export function Faq() {
  return (
    <div id="faq" className="py-10 px-4 bg-gray-50">
      <Typography
        variant={"h2"}
        className="text-center text-3xl font-bold mb-8"
      >
        Frequently Asked Questions
      </Typography>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="py-4 px-6 text-lg font-semibold text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition">
              Apa itu Lakoe?
            </AccordionTrigger>
            <AccordionContent className="py-4 px-6 text-gray-700 bg-gray-50">
              Kami adalah toko e-commerce yang menyediakan berbagai produk
              berkualitas, termasuk elektronik, pakaian, dan aksesori. Kami
              berkomitmen untuk memberikan pengalaman belanja yang memuaskan
              dengan pelayanan pelanggan terbaik.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-200">
            <AccordionTrigger className="py-4 px-6 text-lg font-semibold text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition">
              Bagaimana cara membuat akun di Lakoe?
            </AccordionTrigger>
            <AccordionContent className="py-4 px-6 text-gray-700 bg-gray-50">
              Untuk membuat akun, klik tombol "Daftar" di pojok kanan atas situs
              kami. Isi informasi yang diminta, seperti nama, alamat email, dan
              kata sandi, lalu klik "Daftar" untuk menyelesaikan proses. Anda
              akan menerima email konfirmasi untuk mengaktifkan akun Anda.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-gray-200">
            <AccordionTrigger className="py-4 px-6 text-lg font-semibold text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition">
              Bagaimana cara melakukan pembelian?
            </AccordionTrigger>
            <AccordionContent className="py-4 px-6 text-gray-700 bg-gray-50">
              Telusuri produk yang Anda inginkan dan tambahkan ke keranjang
              belanja Anda. Klik ikon keranjang belanja di pojok kanan atas dan
              pilih "Checkout." Masukkan informasi pengiriman dan pilih metode
              pembayaran. Konfirmasi pesanan Anda dan klik "Kirim Pesanan" untuk
              menyelesaikan transaksi.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
