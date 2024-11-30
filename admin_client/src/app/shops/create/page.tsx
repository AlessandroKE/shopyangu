"use client"
import {
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
import { Shop } from "@/types"



export default function MyForm() {

  const [state, formAction, isPending] = useActionState(createShop, null);

  const [files, setFiles] = useState < File[] | null > (null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm < z.infer < typeof createShopSchema >> ({
    mode: "all",
    resolver: zodResolver(createShopSchema),
    defaultValues: {
        name: "",
        description: "",
        logo: ""
      }
  })

  useEffect(() => {
    if(state && state.error) {
        toast.error("An error occured", {description: state.error} );
      } else if(state) {
        toast.success("Form submitted successfully", {description: "Your shop has been created and saved."} );
      } 
  },[state]);

  return (
    <Form {...form}>
      <form action={(formData: FormData) =>  {form.handleSubmit(()=> formAction(formData))}}
        className="space-y-5 max-w-3xl mx-auto py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <FormField
              control={form.control}
              {...form.register('name')}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input className={form.formState.errors.name ? 'border-red-500' : ''}
                    placeholder="ShopYangu"
                    type="text"
                    {...field} />
                  </FormControl>
                  {!form.formState.errors.name && <FormDescription>What's the name of your shop?</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          {...form.register('description')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ShopYangu is an ecommerce shop for eletronics."
                  className={cn('resize-none', form.formState.errors.description ? 'border-red-500' : '')}
                  {...field}
                />
              </FormControl>
              {!form.formState.errors.description && <FormDescription>Describe your shop.</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        
            <FormField
              control={form.control}
              {...form.register("logo")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a logo</FormLabel>
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
                        <div className="flex items-center justify-center flex-col p-4 w-full ">
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
                  <FormDescription>Select an image to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting || isPending || !form.formState.isValid}>
                  {form.formState.isSubmitting || isPending && <Loader2 className="animate-spin"></Loader2>}
                  Create Shop
                </Button>
            </div>
      </form>
    </Form>
  )
}