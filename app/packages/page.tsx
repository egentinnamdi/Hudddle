import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox';


const tabs= ["all packages", "arrived", "in-transit"]
const headers= ["order#", "category", "warehouse receipt", "supplier", "weight", "data sent", "data received", "action"]
export default function Packages() {
  return (
    <div className='flex-grow flex justify-center bg-gray-100'>
      <div className='w-11/12  capitalize flex flex-col gap-5 !text-gray-800'>
        <h1 className='font-bold'>Packages</h1>
        <div>
        <Tabs defaultValue="all packages" className="w-full space-y-7">
            <TabsList className="">
                {tabs.map((item)=> 
                <TabsTrigger className='w-80 h-12 !font-bold text-gray-700 flex gap-3 items-center !capitalize bg-[#EAEAEA] rounded-none rounded-t-3xl' key={item} value={item}>
                    <List className='text-hudddle'/>
                    {item} 
                    <span className='bg-hudddle py-0.5 px-3.5 text-xs font-medium rounded-xl text-white'>21</span>
                </TabsTrigger>
                )}
            </TabsList>
            <div className='flex justify-between'>
                <Input className='w-1/4'/>
                <div className="flex gap-3 items-center">
                    <Button variant="outline" className="p-3 border-claimed-text">Clear Package</Button>
                    <Button className="!p-3 bg-claimed-text">Register Package</Button>
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
                        {Array.from({length: 5}).map((_, index) => (
                        <TableRow key={index} className='!border-none !p-2'>
                            <TableCell><Checkbox className='border-claimed-text bg-white'/></TableCell>
                            <TableCell>#0001</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>1124</TableCell>
                            <TableCell>Kings way</TableCell>
                            <TableCell>200g</TableCell>
                            <TableCell>27/11/25</TableCell>
                            <TableCell>In-transit</TableCell>
                            <TableCell>In-transit</TableCell>
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
        </Tabs>
        </div>
      </div>
    </div>
  )
}
