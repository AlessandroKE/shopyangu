"use client"
import {
  startTransition,
    useActionState,
    useEffect,
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm,
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Textarea
} from "@/components/ui/textarea"
import {
  CloudUpload,
  Loader2,
  Paperclip
} from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/file-upload"
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
