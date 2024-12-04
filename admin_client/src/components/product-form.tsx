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
  UseFormReturn
} from "react-hook-form"
import * as z from "zod"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
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
import { createProductSchema } from "@/schema"
import { ServerActionState, Shop } from "@/types"
import { getShops } from "@/app/shops/view/actions"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { uploadImage } from "@/app/actions"
import { AspectRatio } from "./ui/aspect-ratio"
import Image from 'next/image'

export default function ProductForm({action, form, editMode}: {
    action: (previousState: ServerActionState | null, data: z.infer < typeof createProductSchema >) => Promise<ServerActionState>,
    form: UseFormReturn<{
      id?: string
      name: string;
      description: string;
      price: number;
      stock: number;
      shopId: string;
      image?: string | null; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, any, undefined>,
    editMode: boolean
  }) {

  const [state, formAction, isPending] = useActionState(action, null);
  const [files, setFiles] = useState < File[] | null > (null);
  const [currentImage, setCurrentImage] = useState(form.getValues().image)

  const [shops, setShops] = useState<Shop[]>([])

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  useEffect(() => {
    if(state && !state.success) {
        toast.error("An error occured", {description: state.message} );
      } else if(state) {
        toast.success("Form submitted successfully", {description: "Your product has been " + (editMode ? "edited." : "created and saved.")} );
      } 
  },[state]);

  useEffect(() => {
    getShops().then(shops => {
        setShops(shops as Shop[])
    })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(async (data)=> {
        let image = data.image
        if(files?.length) {
          const res = await uploadImage(files[0], 'images')
          if(!res.success) {
            toast.error('Try again. Unable to upload image')
            return
          } else {
            image = res.url
          }
        }
        startTransition(()=> formAction({...data, image}))
      })}
     className="space-y-8 max-w-3xl mx-auto py-10">
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          {...form.register('name')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="MacBook Pro Air 2017"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Name of the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          {...form.register('price')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input 
                placeholder="kES 2,000"
                
                type="number"
                {...field} />
              </FormControl>
              <FormDescription>Price of the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          {...form.register('description')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Powerful laptop with sleek design."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Describr your product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          {...form.register('stock')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input 
                placeholder="20"
                
                type="number"
                {...field} />
              </FormControl>
              <FormDescription>How  many items are there</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <FormField
          control={form.control}
          {...form.register('shopId')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a shop" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {shops.map((shop) => 
                    <SelectItem value={shop.id!} key={shop.id}>
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage src={shop.logo ?? ''} alt="Shop logo" />
                                <AvatarFallback>Logo</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-lg">{shop.name}</span>
                            <span className="w-32 truncate ml-4"> | {shop.description}</span>
                        </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
                <FormDescription>Link product to a shop</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {currentImage ?
                <>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                      src={form.getValues().image!}
                      alt="Product image"
                      fill
                      className="h-full w-full rounded-md object-cover"
                    />
                  </AspectRatio>
                  <Button type="button" variant="outline" className="text-red-500 border-red-500" onClick={()=>{form.setValue('image', null); setCurrentImage(null)}}>
                    remove image
                  </Button>
                </>
              :
            <FormField
              control={form.control}
              {...form.register('image')}
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className='text-gray-500 w-10 h-10' />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select product image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
        <div className="flex justify-end items-center gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting || isPending || !form.formState.isValid}>
            {form.formState.isSubmitting || isPending && <Loader2 className="animate-spin"></Loader2>}
            {editMode ? 'Edit' : 'Add'} Product
          </Button>
        </div>
      </form>
    </Form>
  )
}
