"use client";
import {
  useEffect,
  useState,
} from "react";
import {
  zodResolver
} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createShopSchema } from "@/schema";
import { getShop, editShop } from "./actions";
import ShopForm from "@/components/shop-form";
import { useParams } from "next/navigation";
import { z } from "zod";

export default function EditShop() {
  const [is404, setIs404] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const form = useForm<z.infer<typeof createShopSchema>>({
    mode: "all",
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      logo: null,
    },
  });

  useEffect(() => {
    getShop(id as string).then((data) => {
      if (data) {
        form.reset(data);
        setIs404(false);
      } else {
        setIs404(true);
        console.error("No shop found with id:", id);
      }
      setLoading(false);
    });
  }, [id, form]);

  if (loading) return <div>Loading...</div>;
  if (is404) return <div>404 | SHOP NOT FOUND</div>;

  return <ShopForm action={editShop} editMode={true} form={form} />;
}
