"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, MapPin, Search, TriangleAlert } from 'lucide-react'
// import { useParams } from 'next/navigation'
import React from 'react'
import {QRCodeCanvas} from 'qrcode.react';
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-menubar';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const tabs =[
    {
        title: "tracking location",
        icon: MapPin
    },
    {
        title: "issues",
        icon: TriangleAlert
    },
]
const URL = "https://hudddle-dem.netlify.app/packages/"

export default function Order() {
    const params = useParams()
    const orderId = params.id as Id<"orders">
    const  order = useQuery(api.order.getOrderById, {orderId})


  return (
    <div className='flex-grow lg:flex justify-center bg-gray-50'>
      <div className='lg:w-2/3 lg:h-full capitalize lg:p-10 p-5 flex flex-col gap-5'>
        <div className='flex text-sm lg:text-base text-gray-400 items-center gap-2'>
            <span className='font-medium'>all packages</span>
            <ChevronLeft className='p-1'/>
            <span className='text-claimed-text font-bold'>#{orderId.slice(0, 11)}</span>
        </div>
        <div className='flex items-center lg:px-0 px-7 gap-3'>
            <h1 className='font-extrabold text-gray-800'>Order: #{orderId.slice(0, 11)}</h1>
            <span className='bg-[#FF91F2] px-4 py-0.5 rounded-full font-medium text-white text-sm'>{order?.category}</span>
        </div>
        <div className='flex lg:flex-row flex-col lg:gap-5 gap-7 px-7'>
            <div className=' lg:w-1/4 flex items-center'>
                <div className='bg-gray-300 rounded-3xl lg:size-40 size-60'></div>
            </div>
            <div className='lg:w-1/4 flex flex-col justify-center gap-7 font-bold text-sm'>
                <span>data received: <span className='text-claimed-text'>{order?.dateReceived? order.dateReceived : <i>pending...</i>}</span></span>
                <span>status: <span className='px-5 text-claimed-text bg-claimed py-0.5 rounded-full font-medium'>{order?.status}</span></span>
                <span>product description: <br /> <span className='font-normal normal-case w-3/4 block'>{order?.description.slice(0, 50)}...</span></span>
            </div>
            <div className='lg:w-1/4 flex flex-col justify-center gap-7 font-bold text-sm'>
                <span>ordered to: <br /> <span className='font-medium text-claimed-text'> baserterne, st kitts</span></span>
                <span>ordered from: <br /> <span className='font-medium text-claimed-text'>{order?.location}</span></span>
                <span>package content: <br /> <span className='font-medium text-claimed-text'>{order?.packageContent}</span></span>
            </div>
            <div className='lg:w-1/4 flex flex-col justify-center gap-7 font-bold text-sm'>
                <span>location: <br /><span className='font-medium text-claimed-text'>{order?.location}</span></span>
                <span>product description: <br /><span className='font-medium text-claimed-text'> baserterne, st kitts</span></span>
            </div>
        </div>
        <Tabs defaultValue="tracking location" className="w-ful pt-12">
            <TabsList>
                {tabs.map((item)=> 
                <TabsTrigger className='lg:w-80 min-w-40  h-12 !font-bold text-gray-700 flex gap-3 items-center !capitalize bg-[#EAEAEA] rounded-none rounded-t-3xl' key={item.title} value={item.title}>
                    <item.icon className='text-hudddle'/>
                    <span className='lg:text-base text-sm'>{item.title}</span>
                    {/* <span className='bg-hudddle py-0.5 px-3.5 text-xs font-medium rounded-xl text-white'>21</span> */}
                </TabsTrigger>
                )}
            </TabsList>
            <TabsContent value="tracking location">
                <div className='bg-white rounded-lg lg:p-10 p-5'>
                    <div className='bg-hudddle/10 lg:p-5 p-4 rounded-3xl'>
                        <span className='font-bold text-sm'>status: <span className='px-7 text-claimed-text bg-claimed py-0.5 rounded-full font-medium'>{order?.status}</span></span>
                    </div>
                    <div className='min-h-32 flex p-5 gap-3'>
                        <div className='flex flex-col items-center'>
                            <MapPin className='text-hudddle'/>
                            <div className="w-px mt-2 h-20 bg-hudddle"></div> 
                            <div className="w-2 h-2 bg-hudddle rounded-full"></div>
                        </div>
                        <span className='font-bold text-sm'>departure: <br /> <span className='font-normal pt-1.5 block'>Item leaves our {order?.location} station</span></span>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="issues">
                <div className='bg-white text-center normal-case rounded-lg lg:p-10 p-5'>
                    There is no issue with this order
                </div>
            </TabsContent>
        </Tabs>
      </div>
      <div className='lg:w-1/3 lg:p-10 p-10 pt-0 lg:h-full flex flex-col items-center justify-center lg:gap-20 gap-10'>
        <div className='border border-claimed-text p-1 rounded-3xl'>
                <div className='grid place-items-center bg-claimed-text p-5 rounded-3xl size-80'>
                    <QRCodeCanvas size={200} bgColor='#0D6534' fgColor='#BCBCBC' value={`${URL}${order?._id}`} />
                </div>
        </div>
        <div className='space-y-5'>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-sm'>Next Steps</span>
                <ol className='list-decimal pl-4 space-y-3'>
                    <li className='pl-2'>Open your <b>ShipIt</b> Admin phone application.</li>
                    <li className='pl-2'>Check your notifications for the QR code notification.</li>
                </ol>
            </div>
            <div className='flex flex-col gap-5' >
                <Label><b>or enter tracking code</b></Label>
                <div className='relative'>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </span>
                    <Input className='h-12 rounded-3xl'/>
                </div>
                <Button className='w-full bg-claimed-text !text-sm h-10 text-claimed !py-2'>See shelf location</Button>
            </div>
        </div>
      </div>
    </div>
  )
}
