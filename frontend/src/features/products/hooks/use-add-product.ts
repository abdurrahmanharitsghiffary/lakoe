import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddProductSchema,
  addProductSchema,
} from "../validator/use-add-product";
import { useState, useEffect, useMemo } from "react";
import {
  Attribute,
  generateCombinations,
  AttributeValue,
} from "@/utils/gen-combination";
import { useCreateProducts } from "../api/create-product";
import { toast } from "react-toastify";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";

const getSkus = (
  combinations: AttributeValue[][]
): AddProductSchema["skus"] => {
  const isAttrNotAvailable = combinations?.[0]?.length === 0;
  return isAttrNotAvailable
    ? []
    : combinations.map((combination) => {
        return {
          isActive: true,
          price: 0,
          skuAttribute: combination.map((c) => ({
            value: c.value,
            attributeName: c.name,
          })),
          stock: 0,
          weightInGram: 0,
        };
      });
};

export const useAddProduct = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      name: "SIZE",
      values: ["SM", "XL", "XXL", "LG"],
    },
    { name: "COLOR", values: ["RED", "GREEN"] },
    { name: "MOTIVE", values: ["POLCADOT"] },
  ]);

  const combinations = useMemo(
    () => generateCombinations(attributes),
    [attributes]
  );

  const { createProductAsync } = useCreateProducts();

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: [],
      images: [],
      minimumOrder: 0,
      skus: getSkus(combinations),
    },
  });

  const { setValue } = form;

  const skusFields = useFieldArray({
    control: form.control,
    name: "skus",
  });

  useEffect(() => {
    if (combinations) {
      setValue("skus", getSkus(combinations));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinations]);

  const onSubmit = (values: AddProductSchema) => {
    toast.promise(
      createProductAsync(values)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
      {
        success: {
          render() {
            form.reset();
            return "Produk berhasil disimpan";
          },
        },
        pending: "Menyimpan produk...",
        error: {
          render({ data }) {
            return getAxiosErrMessage(data);
          },
        },
      }
    );
    console.log(values);
  };

  return {
    form,
    onSubmit,
    skusFields,
    setAttributes,
    attributes,
  };
};
