"use client"
import {
    useEffect,
} from "react"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/ui/multi-select"
import {
  Input
} from "@/components/ui/input"
import { Shop } from "@/types"

const formSchema = z.object({
  shopId_in: z.array(z.string()),
  price_gte: z.coerce.number().min(0).optional(),
  price_lte: z.coerce.number().min(0).optional(),
  stock_gte: z.coerce.number().min(0).optional(),
  stock_lte: z.coerce.number().min(0).optional()
});

export default function ProductFiltersForm({shops}: {shops: Shop[]}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "shopId_in": [],
      // 'price_gte': null,
      // 'price_lte': null,
      // 'stock_gte': null,
      // 'stock_lte': null,
    },
  })

  const formData = form.watch()

  useEffect(()=> {
    console.log(formData)
  }, [formData])

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       console.log(values);
//       toast(
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
//         </pre>
//       );
//     } catch (error) {
//       console.error("Form submission error", error);
//       toast.error("Failed to submit the form. Please try again.");
//     }
//   }

  return (
    <Form {...form}>
      <form className="w-full items-center mx-auto py-1 grid grid-cols-12 gap-2">

        <div className="grid grid-cols-12 col-span-4 gap-4">

          <div className="col-span-12">

            <FormField
              control={form.control}
              {...form.register('shopId_in')}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Filter by Shops</FormLabel> */}
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className=""
                    >
                      <MultiSelectorTrigger shops={shops}>
                        <MultiSelectorInput placeholder="Filter by shops" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {shops.map(shop => (
                            <MultiSelectorItem key={shop.id} value={shop.id!}>{shop.name}</MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  {/* <FormDescription>Filter by shops</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        <div className="grid grid-cols-12 col-span-4 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              {...form.register('price_gte')}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Lowest Price</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Lowest price"

                      type="number"
                      {...field} />
                  </FormControl>
                  {/* <FormDescription>Lowest price</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              {...form.register('price_lte')}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Highest Price</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Highest Price"

                      type="number"
                      {...field} />
                  </FormControl>
                  {/* <FormDescription>Highest Price</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        <div className="grid grid-cols-12 col-span-4 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              {...form.register('stock_gte')}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Minimum Stock</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Minimum stock"

                      type="number"
                      {...field} />
                  </FormControl>
                  {/* <FormDescription>Minimum stock</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              {...form.register('stock_lte')}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Maximum Stock</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Maximum Stock"

                      type="number"
                      {...field} />
                  </FormControl>
                  {/* <FormDescription>Maximum Stock</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
      </form>
    </Form>
  )
}
