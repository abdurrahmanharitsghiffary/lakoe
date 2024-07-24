import { useState, useEffect } from "react";
import { Store } from "./store";
import { Card } from "../ui/card";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Button } from "../ui/button";
import { BiSolidDiscount } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Label } from "../ui/label";
import { formatRupiah } from "@/utils/format-currency";
import { CheckoutDialogVoucher } from "../dialog/checkout-dilalog-voucher";
import { Textarea } from "../ui/textarea";

interface ProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
  variant: string;
  checked: boolean;
}

interface CartType {
  id: number;
  name: string;
  products: ProductType[];
  checked: boolean;
  disabled: boolean;
}

export function CartList() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [carts, setCarts] = useState<CartType[]>([
    {
      id: 1,
      name: "Toko A",
      products: [
        {
          id: 1,
          name: "Sepatu Mantap",
          image: "assets/sepatuputih.jpeg",
          variant: "Putih",
          price: 210000,
          count: 1,
          checked: false,
        },
        {
          id: 2,
          name: "Sepatu Mantap",
          variant: "Merah",
          image: "assets/sepatuputih.jpeg",
          price: 310000,
          count: 1,
          checked: false,
        },
      ],
      checked: false,
      disabled: false,
    },
    {
      id: 2,
      name: "Toko B",
      products: [
        {
          id: 1,
          name: "Sepatu Mantap",
          image: "assets/sepatuputih.jpeg",
          variant: "Putih",
          price: 210000,
          count: 2,
          checked: false,
        },
        {
          id: 2,
          name: "Sepatu Mantap",
          variant: "Merah",
          image: "assets/sepatuputih.jpeg",
          price: 310000,
          count: 3,
          checked: false,
        },
      ],
      checked: false,
      disabled: false,
    },
  ]);

  // const setAllChecked = useState(false);

  // useEffect(() => {
  //   const allStoresChecked = carts.every(cart => cart.checked);
  //   setAllChecked(allStoresChecked);
  // }, [carts]);

  useEffect(() => {
    const total = carts.reduce(
      (sum, cart) =>
        sum +
        cart.products.reduce(
          (productSum, product) =>
            product.checked
              ? productSum + product.price * product.count
              : productSum,
          0
        ),
      0
    );
    setTotalPrice(total);
  }, [carts]);

  useEffect(() => {
    const total = carts.reduce(
      (sum, cart) =>
        sum +
        cart.products.reduce(
          (productSum, product) =>
            product.checked ? productSum + product.count : productSum,
          0
        ),
      0
    );
    setTotalCount(total);
  }, [carts]);

  const handleIncrement = (cartId: number, productId: number) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              products: cart.products.map((product) =>
                product.id === productId
                  ? { ...product, count: product.count + 1, checked: true }
                  : product
              ),
              checked: cart.products.some(
                (product) => product.checked || product.id === productId
              ),
            }
          : cart
      )
    );
  };

  const handleDecrement = (cartId: number, productId: number) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              products: cart.products.map((product) =>
                product.id === productId
                  ? { ...product, count: Math.max(product.count - 1, 1) }
                  : product
              ),
            }
          : cart
      )
    );
  };

  const handleStoreCheck = (cartId: number) => {
    setCarts((prevCarts) => {
      const newCarts = prevCarts.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              checked: !cart.checked,
              products: cart.products.map((product) => ({
                ...product,
                checked: !cart.checked,
              })),
            }
          : {
              ...cart,
              disable: !prevCarts.find((c) => c.id === cartId)!.checked,
            }
      );
      const anyChecked = newCarts.some((cart) => cart.checked);
      return newCarts.map((cart) => ({
        ...cart,
        disabled: anyChecked && !cart.checked,
      }));
    });
  };

  const handleProductCheck = (cartId: number, productId: number) => {
    setCarts((prevCarts) => {
      const newCarts = prevCarts.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              products: cart.products.map((product) =>
                product.id === productId
                  ? { ...product, checked: !product.checked }
                  : product
              ),
              checked: cart.products.some((product) =>
                product.id === productId ? !product.checked : product.checked
              ),
            }
          : cart
      );
      const anyChecked = newCarts.some(
        (cart) =>
          cart.checked || cart.products.some((product) => product.checked)
      );
      return newCarts.map((cart) => ({
        ...cart,
        disabled:
          anyChecked &&
          !cart.checked &&
          !cart.products.some((product) => product.checked),
      }));
    });
  };

  return (
    <div className="flex flex-col w-full px-6">
      <h1 className="text-[30px] mt-4 ml-4 font-bold">Keranjang</h1>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-[70%]">
          {carts.map((cart) => (
            <Store
              key={cart.id}
              storeName={cart.name}
              products={cart.products}
              onIncrement={(productId) => handleIncrement(cart.id, productId)}
              onDecrement={(productId) => handleDecrement(cart.id, productId)}
              checked={cart.checked}
              onStoreCheck={() => handleStoreCheck(cart.id)}
              onProductCheck={(productId) =>
                handleProductCheck(cart.id, productId)
              }
              disabled={cart.disabled}
            />
          ))}
          `
        </div>
        <div className="w-[30%]">
          <Card className="mx-2 rounded-xl border-blue-500 mt-6">
            <Button
              className="border-b-2 bg-transparent text-black hover:bg-white rounded-b-none w-full flex justify-between py-8"
              onClick={() => setIsVoucherOpen(true)}
            >
              <div className="flex flex-row w-100 ">
                <div className="flex flex-row w-full items-center gap-4">
                  <BiSolidDiscount className="h-7 w-7" color="blue" />
                  <p className="text-lg">Gunakan / Masukkan Voucher</p>
                </div>
              </div>
              <div className="flex flex-row py-3 items-center">
                <IoIosArrowForward className="h-5 w-5" />
              </div>
            </Button>
            <div className="flex flex-col px-5 py-4">
              <span className="text-[22px] font-bold">Ringkasan Pesanan</span>
              <div className="flex flex-row justify-between text-lg py-3">
                <span>Subtotal</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>
              <div className="border-[1px]"></div>
              <div className="flex flex-row justify-between text-[22px] font-bold py-3">
                <span>Total</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>
            </div>
          </Card>
          <Card className="rounded-xl mt-6 mx-2 border-blue-500">
            <div className="flex flex-col px-5 text-lg py-7 gap-1">
              <Label className="text-xl font-bold ">Catatan</Label>
              <div className="flex flex-col">
                <Textarea
                  placeholder="Tulis Catatan/intruksi pesananmu"
                  className="text-lg resize-none rounded-[10px] h-[150px] w-full"
                />
                <span className="text-lg text-end ">0/150</span>
              </div>
            </div>
          </Card>
          <Button className="bg-blue-500 w-full text-xl py-6 my-4 mt-5 ml-2 drop-shadow-lg hover:bg-blue-400 space-x-3 ">
            <span>
              <FaRegCircleCheck className="h-6 w-6" />
            </span>
            <span>Checkout ({totalCount})</span>
          </Button>
          <CheckoutDialogVoucher
            onOpen={setIsVoucherOpen}
            isOpen={isVoucherOpen}
          />
        </div>
      </div>
    </div>
  );
}
