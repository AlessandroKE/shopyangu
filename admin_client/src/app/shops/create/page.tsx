"use client"

import {
  useForm,
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import { createShop } from "./actions"
import { createShopSchema } from "@/schema"
import ShopForm from "@/components/shop-form"

export default function CreateShop() {

  const form = useForm < z.infer < typeof createShopSchema >> ({
    mode: "all",
    resolver: zodResolver(createShopSchema),
    defaultValues: {
        name: "",
        description: "",
        logo: ""
      }
  })

  return <ShopForm action={createShop} editMode={false} form={form}/>
}
