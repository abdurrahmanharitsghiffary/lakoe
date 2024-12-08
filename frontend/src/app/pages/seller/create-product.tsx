import { FormProduct } from "@/features/products/components/form-product";
import { Helmet } from "react-helmet-async";

export function CreateProductPage() {
  return (
    <>
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      <FormProduct />
    </>
  );
}
