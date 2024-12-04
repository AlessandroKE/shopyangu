'use client'

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Loader2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Product, Shop } from "@/types"
import { useEffect, useState } from "react"
import * as Actions from "./actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getShops } from "@/app/shops/view/actions"


export default function ProductsView() {
    const [products, setProducts] = useState<Product[]>([])
    const [shops, setShops] = useState<Shop[]>([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [isDeletingProducts, setIsDeletingProducts] = useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState<{ [key: number]: boolean }>({})

    // const [filters, setFilters] = useState()
    useEffect(() => {
        Actions.getProducts().then(products => {
            setProducts(products as Product[])
        }).finally(() => setLoadingProducts(false))
    }, [])

    useEffect(() => {
        getShops().then(shops => {
            setShops(shops as Shop[])
        })
      }, [])

    useEffect(()=> {
        setProducts(products.map(product => {return {...product, shopName: shops.find(shop => shop.id == product.shopId)?.name ?? '-'}}))
    }, [shops])


    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("id")}</div>
            ),
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <Avatar>
                    <AvatarImage src={row.getValue("image")} alt="Product Image" />
                    <AvatarFallback><span className="text-xs">Image</span></AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "description",
            header: 'Description',
            cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button className="w-full text-center"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KES",
                }).format(amount)

                return <div className="text-center font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "stock",
            header: ({ column }) => {
                return (
                    <Button className="w-full text-center"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Stock
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-center">{row.getValue("stock")}</div>,
        },
        {
            accessorKey: "shopName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Shop Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase text-center">{row.getValue("shopName")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button className="w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-center">{formatDate(row.getValue("createdAt"))}</div>,
        },
        {
            accessorKey: "modifiedAt",
            header: ({ column }) => {
                return (
                    <Button className="w-full"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Modified At
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-center">{row.getValue("modifiedAt") ? formatDate(row.getValue("modifiedAt")) : '-'}</div>,
        },
    
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const product = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                            <DropdownMenuItem className="text-blue-500 cursor-pointer" onClick={() => editProduct(product.id!)}>
                                Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => deleteProduct(product.id!)}>
                                Delete Product
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const router = useRouter()
    const editProduct = (id: string) => {
      router.push('/products/' + id + '/edit')
    }

    const deleteProduct = (id: string) => {
        Actions.deleteProduct(id).then((res) => {
            if (res.success) {
                toast.success('Product deleted successfully')
                setProducts(products.filter(product => product.id !== id))
            } else {
                toast.error(res.message)
            }
        }
        ).catch(err => {
            toast.error('Failed to delete shop. Please try again later.')
            console.log(err)
        });
    }

    const deleteProducts = () => {
        setIsDeletingProducts(true)
        const trueKeys = Object.keys(rowSelection).filter(key => rowSelection[parseInt(key)]);
        const productIds = trueKeys.map(key => products[parseInt(key)].id!);

        Actions.deleteProducts(productIds).then((res) => {
            if (res.success) {
                toast.success('Products deleted successfully')
                setProducts(products.filter(product => !productIds.includes(product.id!)))
            } else {
                toast.error(res.message)
            }
        }
        ).catch(err => {
            toast.error('Failed to delete shop. Please try again later.')
            console.log(err)
        }).finally(() => {
            setIsDeletingProducts(false)
            setRowSelection({})
        });
    }

    const table = useReactTable({
        data: products,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-start flex-wrap md:flex-nowrap pt-4 pb-1 gap-1">
                <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-2 items-center flex-wrap w-full">
                        <Input
                            placeholder="Filter by product name.."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <Input
                            placeholder="Filter by shop name.."
                            value={(table.getColumn("shopName")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("shopName")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>
                    {/* <div className="grid grid-cols-12 col-span-12 w-full gap-2">
                        <Input
                            placeholder="Lowest Price"
                            value={(table.getColumn("price")?.getFilterValue() as number)}
                            onChange={(event) =>
                                table.getColumn("price")?.setFilterValue((itemValue: any) => event.target.value ? itemValue >= event.target.value : itemValue)
                            }
                            className="col-span-6 md:col-span-3"
                        />
                        <Input
                            placeholder="Highest Price"
                            value={(table.getColumn("price")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("price")?.setFilterValue(event.target.value)
                            }
                            className="col-span-6 md:col-span-3"
                        />
                        <Input
                            placeholder="Minimum Stock"
                            value={(table.getColumn("price")?.getFilterValue() as number) ?? ""}
                            onChange={(event) =>
                                table.getColumn("price")?.setFilterValue(event.target.value)
                            }
                            className="col-span-6 md:col-span-3"
                        />
                        <Input
                            placeholder="Maximum Stock"
                            value={(table.getColumn("price")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("price")?.setFilterValue(event.target.value)
                            }
                            className="col-span-6 md:col-span-3"
                        />
                    </div> */}
                </div>
                <div className="ml-auto flex items-center gap-2 flex-wrap">
                    {(Object.keys(rowSelection).filter(key => rowSelection[parseInt(key)]).length !== 0) &&
                        <Button variant="outline" className="border-red-500 text-red-500" onClick={deleteProducts} disabled={isDeletingProducts}>
                            {isDeletingProducts ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    deleting shops...
                                </>
                            ) : (
                                `delete ${Object.keys(rowSelection).filter(key => rowSelection[parseInt(key)]).length} selected shops`
                            )}
                        </Button>
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* <ProductFiltersForm shops={shops} /> */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loadingProducts ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <Loader2 className="mr-2 h-8 w-8 animate-spin inline-block" />
                                    <span className="ml-2">Loading...</span>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="even:bg-gray-100 dark:even:bg-gray-800">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) :
                            (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
