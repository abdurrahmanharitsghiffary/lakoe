import { axios } from "@/lib/axios";

export const deleteProduct = async (cartId: string, skuId: number) => {
    const response = await axios.delete(`/carts/${cartId}/skus/${skuId}`);
    return response.data;
};

export const deleteCart = async (id: string) => {
    const response = await axios.delete(`/carts/${id}`);
    return response.data;
};
