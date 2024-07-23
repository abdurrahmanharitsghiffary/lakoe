import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const initialItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Air Jordan 1 Mid",
    description: "Black/White",
    count: 0,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?q=80&w=1541&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Air Jordan 2 Mid",
    description: "Green/White",
    count: 0,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Air Jordan 3 Mid",
    description: "Black",
    count: 0,
  },
];

export function Cart() {
  const [items, setItems] = useState(initialItems);
  const handleDecrement = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, count: item.count < 1 ? 0 : item.count - 1 }
          : item
      )
    );
  };
  const handleIncrement = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="flex gap-2">
          <IoStorefrontOutline size={24} />
          <h2 className="text-xl font-semibold mb-4">Name Store</h2>
        </div>
        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                className="grid grid-cols-[80px_1fr_100px] items-center gap-4 border-b pb-4"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt="Product Image"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDecrement(item.id)}
                    variant="outline"
                    size="icon"
                    className="p-1"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-center w-8">{item.count}</span>
                  <Button
                    onClick={() => handleIncrement(item.id)}
                    variant="outline"
                    size="icon"
                    className="p-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className=" rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">$99.97</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Shipping</span>
              <span className="font-bold">$5.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold text-2xl">$104.97</span>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" className="flex-1">
                Continue Shopping
              </Button>
              <Button variant="lakoePrimary" className="flex-1">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
