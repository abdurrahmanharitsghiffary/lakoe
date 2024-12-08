  export interface SKUAttribute{
    value: string;
    attribute:{
      name: string;
    }
  }
  export interface ProductType {
    id: number;
    skuId:number;
    name: string;
    image: string;
    count: number;
    price: number;
    checked: boolean;
    attributes: SKUAttribute[];
  
  }
  
  export interface StoreType{
    id:number;
    name: string;
    products: ProductType[];
    checked: boolean;
    disabled: boolean;
    cartId: string;
  
  }

  export interface CartType{
    id:string;
    stores:StoreType[];
  }