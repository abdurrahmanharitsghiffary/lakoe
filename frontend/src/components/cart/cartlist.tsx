
import { useState, useEffect } from 'react';
import { Store } from './store'
import { Card } from "../ui/card";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Button } from "../ui/button";
import { BiSolidDiscount } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Label } from "../ui/label";
import { formatRupiah } from "@/utils/format-currency";
import { CheckoutDialogVoucher } from '../dialog/checkout-dilalog-voucher';
import { SKUAttribute,StoreType} from '@/types/cart';
import { useCartCollection } from '@/features/cart/api/get-cart';
import { deleteProduct,deleteCart } from '@/features/cart/api/delete-cart';
export function CartList() {
  const cartId = '034a015c-bd4b-41cc-82e3-0fc7d57409fb';
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [note, setNote] = useState('');
  const [noteLength, setNoteLength] = useState(0);
  const [stores, setStores] = useState<StoreType[]>([]);
  const {data: cartData, error, isLoading } = useCartCollection(cartId);

 
  useEffect(() => {
    if(cartData){
    const fetchedStores:StoreType[] = cartData.map((cart: any) => ({
        id: cart.store.id,
        name:cart.store.name,
        checked: false,
        disabled: false,
        cartId: cart.id,
        products: cart.cartItems.map((item: any) => ({
          id: item.sku.product.id,
          name: item.sku.product.name,
          image: item.sku.image,
          count: item.qty,
          skuId: item.sku.id,
          checked: false,
          price: parseFloat(item.sku.price),
          attributes: item.sku.skuAttributes.map((attr: any) => ({
            value: attr.value,
            attribute: attr.attribute,
        })),
      })),
    }));
    setStores(fetchedStores);
  }
  }, [cartData]);

  // const setAllChecked = useState(false);

  // useEffect(() => {
  //   const allStoresChecked = carts.every(cart => cart.checked);
  //   setAllChecked(allStoresChecked);
  // }, [carts]);

  useEffect(() => {
    const total = stores.reduce((sum, cart) =>
      sum + cart.products.reduce((productSum, product) =>
        product.checked ? productSum + product.price * product.count : productSum, 0), 0);

    setTotalPrice(total);
  }, [stores]);

  useEffect(() => {
    const total = stores.reduce((sum, cart) =>
      sum + cart.products.reduce((productSum, product) =>
        product.checked ? productSum + product.count : productSum, 0), 0);

    setTotalCount(total);
  }, [stores]);

  const handleIncrement = (storeId: number, productId: number, attributes: SKUAttribute[]) => {
    setStores(prevStores =>
      prevStores.map(store =>
        store.id === storeId ?
          {
            ...store,
            products: store.products.map(product => product.id === productId && JSON.stringify(product.attributes) === JSON.stringify(attributes)
              ? { ...product, count: product.count + 1, checked: true }
              : product
            ),
            checked: store.products.some(product => product.checked || product.id === productId)
          }
          : store
      )
    );
  };

  const handleDecrement = (storeId: number, productId: number, attributes: SKUAttribute[]) => {
    setStores(prevStores =>
      prevStores.map(store =>
        store.id === storeId ?
          {
            ...store,
            products: store.products.map(product => product.id === productId && JSON.stringify(product.attributes) === JSON.stringify(attributes) && product.count > 1
              ? { ...product, count: product.count - 1 }
              : product
            ),
          }
          : store
      )
    );
  };

  const handleStoreCheck = (storeId: number) => {
    setStores(prevStores => {
      const newStores = prevStores.map(store =>
        store.id === storeId
          ? {
              ...store,
              checked: !store.checked,
              products: store.products.map(product => ({ ...product, checked: !store.checked })),
            }
          : store
      );

      const anyChecked = newStores.some(store => store.checked || store.products.some(product => product.checked));
      return newStores.map(store => ({
        ...store,
        disabled: anyChecked && !store.checked && !store.products.some(product => product.checked),
      }));
    });
  };

  const handleProductCheck = (storeId: number, productId: number, attributes: SKUAttribute[]) => {
    setStores(prevStores => {
      const newStores = prevStores.map(store => {
        if (store.id === storeId) {
          const newProducts = store.products.map(product =>
            product.id === productId && JSON.stringify(product.attributes) === JSON.stringify(attributes)
              ? { ...product, checked: !product.checked }
              : product
          );

          const allProductsChecked = newProducts.every(product => product.checked);

          return {
            ...store,
            checked: allProductsChecked,
            products: newProducts,
          };
        }
        return store;
      });

      const anyChecked = newStores.some(store => store.products.some(product => product.checked));
      return newStores.map(store => ({
        ...store,
        disabled: anyChecked && store.id !== storeId,
      }));
    });
  };
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNote = e.target.value;
    if (newNote.length <= 150) {
      setNote(newNote);
      setNoteLength(newNote.length);
    }
  };

  const handleCheckout = () => {
    const checkedItems = stores.flatMap(store =>
      store.products
        .filter(product => product.checked)
        .map(product => ({
          name: product.name,
          count: product.count,
          totalprice: product.count * product.price,
        }))
    );


    const totalProducts = checkedItems.reduce((acc, item) => acc + item.count, 0);
    const totalPrice = checkedItems.reduce((acc, item) => acc + item.totalprice, 0);

    const checkoutData = {
      products: checkedItems,
      totalProducts,
      totalPrice,
      note,
    };

    console.log(checkoutData);

  const HandleDeleteProduct = async (cartId:string, skuId:number) =>{
    try {
      await deleteProduct(cartId, skuId);
      setStores(prevStores =>{
        const updatedStores = prevStores.map(store =>({
          ...store,
          products: store.products.filter(product => product.skuId !== skuId),

        }));
        
        
        // Remove cart if no products are left
        const cartIdsToDelete = updatedStores
          .filter(store => store.products.length === 0)
          .map(store => store.cartId);

        // Remove carts
        cartIdsToDelete.forEach(async (id) => {
          try {
            await deleteCart(id);
            console.log(`Cart ${id} deleted successfully`);
          } catch (error) {
            console.error(`Failed to delete cart ${id}:`, error);
          }
        });
  
        return updatedStores.filter(store => store.products.length > 0);
      });
      
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col w-full px-6">
      <h1 className="text-[30px] mt-10 my-6 ml-4">Keranjang</h1>
      <div className='flex flex-row'>
        <div className='flex flex-col w-full'>
          <Store
            stores={stores}
            setStores={setStores}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onStoreCheck={handleStoreCheck}
            onProductCheck={handleProductCheck}
            onProductDelete={HandleDeleteProduct}
          />
        </div>
        <div className="basis-1/4">
          <Card className="rounded-xl border-blue-500 mt-6 ml-[-8px] mr-2 ">
            <Button className="border-b-2 bg-transparent text-black hover:bg-white rounded-b-none w-full flex justify-between py-8" onClick={() => setIsVoucherOpen(true)}>
      
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

          <Card className='rounded-xl mt-6 ml-[-8px] mr-2  border-blue-500'>

            <div className="flex flex-col px-5 text-lg py-7 gap-1">
              <Label className="text-xl font-bold ">Catatan</Label>
              <div className="flex flex-col">
                <Input
                  placeholder="Tulis Catatan/intruksi pesananmu"
                  className="text-lg  rounded-[10px] py-6 w-full"
                  value={note}
                  onChange={handleNoteChange}
                  maxLength={150}
                />
                <span className="text-lg text-end ">{noteLength}/150</span>
              </div>
            </div>
          </Card>
          <Button className="bg-blue-500 w-[403px] text-xl py-6 my-4 mt-5 mr-2 ml-[-7px] drop-shadow-lg hover:bg-blue-400 space-x-3 " onClick={handleCheckout} >
            <span><FaRegCircleCheck className="h-6 w-6" /></span>
            <span>Checkout({totalCount})</span>

          </Button>
          <CheckoutDialogVoucher onOpen={setIsVoucherOpen} isOpen={isVoucherOpen} />
        </div>
      </div>
    </div>
  );
}
