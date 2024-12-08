import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";

export const useGetCartCollectionId = () => {
  const [collectionId, setCollectionId] = useState<string | null>(null);

  useEffect(() => {
    const setData = async () => {
      const collectionId = localStorage.getItem("x.ccl.ids");

      if (collectionId) {
        setCollectionId(collectionId);
      }
      const response = await axios.post("/cart-collections");
      console.log("set data: ", response.data);

      const cartCollectionId = response.data?.data?.cartCollectionId;

      if (cartCollectionId) {
        localStorage.setItem("x.ccl.ids", cartCollectionId);
        setCollectionId(collectionId);
      } else {
        console.log("Data not set in local storage");
      }
    };

    setData();
  }, []);

  return collectionId;
};
