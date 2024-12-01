"use client"
import {
  useEffect,
  useState
} from "react"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import { createProductSchema } from "@/schema"
import { useParams } from "next/navigation";
import {getProduct, updateProduct} from './actions'
import ProductForm from "@/components/product-form"


export default function UpdateProduct() {
  const [is404, setIs404] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const form = useForm < z.infer < typeof createProductSchema >> ({
    mode: 'all',
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1.00,
      stock: 0,
      image: "",
      shopId: "0"
    }
  })

  useEffect(() => {
    getProduct(id as string).then((data) => {
      if (data) {
        form.reset(data);
        setIs404(false);
      } else {
        setIs404(true);
        console.error("No product found with id:", id);
      }
      setLoading(false);
    });
  }, [id, form]);

  if (loading) return <div>Loading...</div>;
  if (is404) return <div>404 | PRODUCT NOT FOUND</div>;

  return (
    <ProductForm action={updateProduct} form={form} editMode={true}/>
  )
}
