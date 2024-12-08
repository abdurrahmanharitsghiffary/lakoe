import { Link } from "react-router-dom";
import { useGetCartItemsCount } from "@/features/cart/api/get-item-count";
import { useGetCartCollectionId } from "@/hooks/use-cart-collection";
import { Badge } from "../ui/badge";
import { SlBasket } from "react-icons/sl";

export default function CartButton() {
  const collectionId = useGetCartCollectionId();
  const { data } = useGetCartItemsCount(collectionId ?? "");
  const count = data?.data?.count ?? 0;

  return (
    <Link to="/cart" className="relative">
      <SlBasket className="text-gray-500 w-6 h-6" />
      {count > 0 && (
        <Badge
          variant="lakoePrimary"
          className="absolute w-6 h-6 flex justify-center items-center p-0 -top-3 -right-3"
        >
          {count}
        </Badge>
      )}
    </Link>
  );
}
