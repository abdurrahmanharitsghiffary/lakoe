import { axios } from "@/lib/axios";
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CartType } from '@/types/cart'; // Adjust the import path as necessary

// Define the query function
const fetchCartCollection = async (id: string) => {
  const response = await axios.get(`/cart-collections/${id}`);
  console.log(response, "RES");
  return response.data.data.carts;
};

// Define the custom hook that uses the query function
export const useCartCollection = (id: string): UseQueryResult<CartType[], Error> => {
  return useQuery({
    queryKey: ['cartCollection',id],
    queryFn: () =>fetchCartCollection(id),
  });
};