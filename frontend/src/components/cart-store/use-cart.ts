// import { axios } from "@/lib/axios";
// import { useCartStore } from "./cart-store";
// import { useQuery } from "@tanstack/react-query";

// const fetchCart = async (id: string) => {
//   const response = await axios.get(`/cart/${id}`);
//   console.log("fetchCart: ", response.data);
//   return response.data;
// };
// export const useCart: React.FC<{cartId: string}> = ({cartId}) => {
//     const setCartData = useCartStore((state) => state.setCartData);

//     const {data, isLoading, error} = useQuery({
//         queryKey: ["cart", cartId],
//         queryFn: () => fetchCart(cartId)
//     })

//     return {}
// };
