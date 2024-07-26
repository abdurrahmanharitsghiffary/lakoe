import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  images: string[];
  categories: { name: string }[];
  description: string;
  isActive: boolean;
  name: string;
  price: number;
}

interface ApiResponse {
  data: Product[];
}

const fetchProducts = async (): Promise<ApiResponse> => {
  const response = await axios.get("/products");
  return response.data;
};

export function Product() {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch products</div>;

  if (!Array.isArray(data?.data)) {
    return <div>No products available</div>;
  }

  return (
    <div className="mt-20">
      <Typography
        variant="h2"
        className="text-2xl font-bold mb-4 ml-5 border-none text-center"
      >
        Hanya Untuk Anda
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[1200px] m-auto">
        {data.data.map((product) => (
          <Card key={product.id} className="shadow-lg rounded-lg bg-white">
            <CardHeader>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </CardHeader>
            <CardContent className="relative">
              <Link
                className="absolute inset-0"
                to={`/products/${product.id}`}
              ></Link>
              <CardTitle className="text-xl font-semibold">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-2">
                {product.description}
              </CardDescription>
              <CardDescription className="mt-2">
                {product.price}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
