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
  UseFormReturn,
} from "react-hook-form"
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
import { ServerActionState } from "@/types"
import { createShopSchema } from "@/schema"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ShopForm({action, form, editMode}: {
  action: (previousState: ServerActionState | null, data: z.infer < typeof createShopSchema >) => Promise<ServerActionState>,
  form: UseFormReturn<{
    id?: string
    name: string;
    description: string;
    logo?: string | null; // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, any, undefined>, 
  editMode: boolean
}) {

  const [state, formAction, isPending] = useActionState(action, null);

  const [files, setFiles] = useState < File[] | null > (null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  useEffect(() => {
    if(state && !state.success) {
        toast.error("An error occured", {description: state.message} );
      } else if(state) {
        toast.success("Form submitted successfully.", {description: "Your shop has been" + editMode ? "edit." : "created and saved."} );
      } 
  },[state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data)=> startTransition(()=> formAction(data)))}
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
                  {!form.formState.errors.name && <FormDescription>What&apos;s the name of your shop?</FormDescription>}
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
              render={() => (
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
                  {editMode ? 'Edit' : 'Create'} Shop
                </Button>
            </div>
      </form>
    </Form>
  )
}