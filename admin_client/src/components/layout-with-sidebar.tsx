'use client'
import React, { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NavUser } from "@/components/nav-user"


interface IBreadCrumb {href: string, label: string}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export default function LayoutWithSidebar({children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{[key:string]: string}>
}>) {

  const path = usePathname()

  const [crumbs, setCrumbs] = useState<IBreadCrumb[]>([])
  console.log(path)
  useEffect(()=> {
    const crumbsList = path.split("/").filter(crumb => crumb.length)
    const formattedCrumbs: IBreadCrumb[] = []
    for(let i = 0; i < crumbsList.length; i++) {
      formattedCrumbs.push(
        {label: crumbsList[i].toUpperCase(), href: '/'+ crumbsList.slice(0, i+1).join('/')}
      )
     // console.log('paths', formattedCrumbs)
      setCrumbs(formattedCrumbs)
    }
  }, [path])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-10 shrink-0 items-center gap-2 sticky top-0 bg-background rounded-xl z-50">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
              {crumbs.map((crumb, index) => 
              <div key={crumb.href} className="flex gap-1 items-center">
                <BreadcrumbItem className="hidden md:block" >
                  {index !== 0 ? 
                  <BreadcrumbLink href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
                :
                crumb.label
                  }
                </BreadcrumbItem>
                {(index != crumbs.length - 1) && <BreadcrumbSeparator className="hidden md:block" />}
              </div>
              )}
              </BreadcrumbList>
            </Breadcrumb>
            </div>
            <div className="">
              <NavUser user={data.user} />
            </div>
          </div>
        </header>
        <main className="p-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
