import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";

const categories = [
  {
    image: "https://id-test-11.slatic.net/p/41089aaad211b080abc54995580af4a8.jpg",
    category: "Tas Slempang",
  },
  {
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-66533080/no-brand_ifra-crop-outer-korean-style-outer-crop-korea-fashion-wanita-korea_full01.jpg",
    category: "Pakaian Wanita",
  },
  {
    image: "https://img.id.my-best.com/product_images/1c3ecdf73dd7d8edcac6ecca7f1c0cfc.png?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=f0dce39fd9b185aecec97dbe447f626f",
    category: "Sepatu Wanita",
  },
  {
    image: "https://flexypack.com/wp-content/uploads/2022/02/minyak-goreng-kemasan-compress.jpg",
    category: "Sembako",
  },
  {
    image: "https://cdnpro.eraspace.com/media/wysiwyg/artikel/Tahun_2024/April/Produk_Aksesoris_Mobil_2.jpg",
    category: "Teknologi",
  },
];

export function TopCategories() {
  return (
    <div className="my-10">
      <Typography
        variant="h2"
        className="text-2xl font-bold mb-4 flex ml-5 border-none"
      >
        Top Categories
      </Typography>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-full px-10"
      >
        <CarouselContent className="flex gap-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex-shrink-0">
              <Card className="p-1 shadow-lg rounded-lg overflow-hidden">
                <img src={category.image} alt={category.category} className="w-full h-48 object-cover" />
                <CardContent>
                  <CardDescription className="text-center mt-2">{category.category}</CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
      </Carousel>
    </div>
  );
}
