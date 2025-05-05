"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { EllipsisVertical, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import OrderForm from '@/components/OrderForm';
import { api } from '@/convex/_generated/api';
import {useMutation, useQuery } from 'convex/react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { toast } from 'sonner';
import DeleteBtn from '@/components/DeleteBtn';
import { useMediaQuery } from 'react-responsive';


const tabs= ["all packages", "arrived", "in-transit"]
const headers= ["order#", "category", "warehouse receipt", "supplier", "weight", "data sent", "data received", "status", "action"]
export default function Packages() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const allOrders = useQuery(api.order.getAllOrders)
    const deleteOrder = useMutation(api.order.deleteOrder)
    const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className='flex-grow flex justify-center bg-gray-50'>
                <div className='w-11/12  capitalize flex flex-col gap-5 !text-gray-800'>
                    <h1 className="font-bold p-5 lg:p-0 text-gray-700 text-3xl">packages</h1>
                    <div>
                    <Tabs defaultValue="all packages" className="w-full">
                        <TabsList className='min-w-96 lg:w-fit !overflow-x-auto overflow-y-hidden'>
                            {tabs.map((item)=> 
                            <TabsTrigger className='lg:w-80 w-1/4 h-12 !font-bold text-gray-700 flex gap-3 items-center !capitalize bg-[#EAEAEA] rounded-none rounded-t-3xl' key={item} value={item}>
                                <List className='text-hudddle'/>
                                {item} 
                                {isMobile? null :<span className='bg-hudddle py-0.5 px-3.5 text-xs font-medium rounded-xl text-white'>21</span>}
                            </TabsTrigger>
                            )}
                        </TabsList>
                        <div className='bg-white p-5 min-h-[65vh] rounded-lg space-y-5'>
                            <div className='flex lg:flex-row flex-col-reverse gap-5 lg:justify-between'>
                                <div className='relative lg:w-1/3'>
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Search size={18} />
                                    </span>
                                    <Input className='h-10 rounded-3xl'/>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <DeleteBtn/>
                                    <DialogTrigger asChild>
                                        <Button className="!p-3 bg-claimed-text">Register Package</Button>
                                    </DialogTrigger>
                                    <OrderForm onSuccess={()=> setOpen(false)}/>
                                </div>
                        </div>
                            <TabsContent value="all packages">
                                <Table>
                                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                    <TableHeader className='bg-hudddle/10'>
                                        <TableRow>
                                            <TableHead><Checkbox className='border-claimed-text bg-white'/></TableHead>
                                            {headers.map(item=><TableHead key={item} className='capitalize font-bold text-claimed-text'>{item}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {allOrders?.map((item, index) => (
                                            <TableRow onClick={()=> router.push(`/packages/${item._id}`) } key={index} className='cursor-pointer !border-none !p-2'>
                                                <TableCell><Checkbox className='border-claimed-text bg-white'/></TableCell>
                                                <TableCell>#{item._id.slice(0, 11)}</TableCell>
                                                <TableCell>{item.category}</TableCell>
                                                <TableCell>{item.warehouseReceipt}</TableCell>
                                                <TableCell>{item.supplier}</TableCell>
                                                <TableCell>{item.weight}</TableCell>
                                                <TableCell>{(new Date(item.dateSent)).toLocaleDateString()}</TableCell>
                                                <TableCell>{item.dateReceived? item.dateReceived: <i>pending...</i>}</TableCell>
                                                <TableCell>{item.status}</TableCell>
                                                <TableCell onClick={(e)=>{
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}>
                                                    <Menubar>
                                                        <MenubarMenu>                
                                                            <MenubarTrigger>
                                                                <EllipsisVertical/>
                                                            </MenubarTrigger>
                                                            <MenubarContent className='capitalize'>
                                                                <MenubarItem onClick={(e)=> {
                                                                     e.preventDefault()
                                                                     e.stopPropagation()
                                                                    try{
                                                                        deleteOrder({orderId: item._id})
                                                                    }catch(err){
                                                                        const error = err as Error
                                                                        console.log(error)
                                                                        toast.error(error.message)
                                                                    }
                                                                }}>delete</MenubarItem>
                                                            </MenubarContent>
                                                        </MenubarMenu>
                                                    </Menubar>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    {/* <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={3}>Total</TableCell>
                                            <TableCell className="text-right">$2,500.00</TableCell>
                                            </TableRow>
                                            </TableFooter> */}
                                </Table>
                            </TabsContent>
                        </div>
                    </Tabs>
                    </div>
                </div>
            </div>
        </Dialog>
  )
}
