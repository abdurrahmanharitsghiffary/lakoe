import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Typography } from "@/components/ui/typography";
  
  export function Shop() {
    const productData = [
      {
        name: "Mainan Ayam Berjalan",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis illo",
        price: "$19.99",
        image: "https://ae01.alicdn.com/kf/S5966f993fc764290a76e8d6f0e55d6eei.jpg_640x640Q90.jpg_.webp",
      },
      {
        name: "IPhone",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis illo",
        price: "$29.99",
        image: "https://p-id.ipricegroup.com/media/Maria/iPhone.jpg",
      },
      {
        name: "Jepit Rambut",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis illo",
        price: "$39.99",
        image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/97/MTA-140573724/no-brand_no-brand_full01.jpg",
      },
      {
        name: "Hijab Motif",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis illo",
        price: "$49.99",
        image: "https://www.matahari.com/media/catalog/product/1/5/15750753_1.jpg?optimize=medium&fit=bounds&height=379&width=293",
      },
    ];
  
    return (
      <div className="mt-20">
        <Typography variant="h2" className="text-2xl font-bold mb-4 flex items-center justify-center border-none">
          Shop
        </Typography>
        <p className="flex items-center justify-center mb-10">
          Browse our selection of high-quality products.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[1200px] m-auto">
          {productData.map((product, index) => (
            <Card key={index} className="p-4 shadow-lg rounded-lg bg-white">
              <CardHeader>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                <CardDescription className="mt-2">{product.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Typography variant="h4" className="text-lg font-medium text-green-600">
                  {product.price}
                </Typography>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  