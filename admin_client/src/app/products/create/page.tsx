"use client"

import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import { createProductSchema } from "@/schema"
import { createProduct } from "./actions"
import ProductForm from "@/components/product-form"

export default function CreateProduct() {
  const form = useForm < z.infer < typeof createProductSchema >> ({
    mode: 'all',
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1.00,
      stock: 0,
      image: "",
      shopId: ""
    }

  })

  return (
    <ProductForm action={createProduct} form={form} editMode={false} />
  )
}
