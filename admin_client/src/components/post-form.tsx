// import { Copy } from "lucide-react"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { toast } from 'sonner'
// import { useRouter } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//   } from "@/components/ui/form"
// import { ScrollArea } from "./ui/scroll-area"


//   const FormSchema = z.object({
//     id: z.string().min(1, { message: "ID is required." }),
//     title: z.string().min(2, { message: "Title must be at least 2 characters." }),
//   })
// export function PostFormDialog() {
//     const router = useRouter()
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//           id: "",
//           title: "",
//         },
//       })
    
//       async function onSubmit(data: z.infer<typeof FormSchema>) {
//         try {
//           const response = await fetch("http://localhost:8000/posts", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           })
    
//           if (!response.ok) {
//             throw new Error("Failed to submit data")
//           }
    
//           const result = await response.json()
          
//           toast.success('Post created successfully', {
//             description: 'Your post has been created and saved.'
//           })
          
//           // Redirect to posts list or the new post
//           router.push("/posts")
//           router.refresh()
          
//         } catch (error) {
//           toast.error('Error creating post', {
//             description: error instanceof Error ? error.message : "Something went wrong"
//           })
//         }
//       }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Create Post</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//        <Form {...form}>
//          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6">
//         <DialogHeader>
//           <DialogTitle>Create Post</DialogTitle>
//           <DialogDescription>
//             Create a new post in your blog.
//           </DialogDescription>
//         </DialogHeader>
//          <ScrollArea className="max-h-[70dvh] py-4 px-1 w-full" >
       
//            <FormField
//              control={form.control}
//              name="id"
//              render={({ field }) => (
//                <FormItem>
//                  <FormLabel>ID</FormLabel>
//                  <FormControl>
//                    <Input placeholder="Enter ID" {...field} />
//                  </FormControl>
//                  <FormMessage />
//                </FormItem>
//              )}
//            />

//            <FormField
//              control={form.control}
//              name="title"
//              render={({ field }) => (
//                <FormItem>
//                  <FormLabel>Title</FormLabel>
//                  <FormControl>
//                    <Input placeholder="Enter Title" {...field} />
//                  </FormControl>
//                  <FormMessage />
//                </FormItem>
//              )}
//            />
          
           
//      </ScrollArea>
//         <DialogFooter className="sm:justify-start">
//           <DialogClose asChild>
//             <div className="flex gap-2 justify-end w-full">
//                 <Button type="button" variant="secondary">
//                 Cancel
//                 </Button>
//                 <Button type="submit" disabled={form.formState.isSubmitting}>
//                 {form.formState.isSubmitting ? "Creating..." : "Create Post"}
//             </Button>
//             </div>
//           </DialogClose>
//         </DialogFooter>
//          </form>
//        </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }
