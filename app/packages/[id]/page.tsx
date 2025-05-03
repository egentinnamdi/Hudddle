"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, MapPin, Search, TriangleAlert } from 'lucide-react'
// import { useParams } from 'next/navigation'
import React from 'react'
import {QRCodeCanvas} from 'qrcode.react';
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-menubar';
import { Input } from '@/components/ui/input';

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
export default function Order() {
    // const params = useParams()

  return (
    <div className='flex-grow flex justify-center bg-gray-50'>
      <div className='w-2/3 h-full capitalize p-10 flex flex-col gap-5'>
        <div className='flex text-gray-400 items-center gap-2'>
            <span className='font-medium'>all packages</span>
            <ChevronLeft className='p-1'/>
            <span className='text-claimed-text font-bold'>#0002</span>
        </div>
        <div className='flex items-center gap-3'>
            <h1 className='font-extrabold text-gray-800'>Order: #0002</h1>
            <span className='bg-[#FF91F2] px-4 py-0.5 rounded-full font-medium text-white text-sm'>furniture</span>
        </div>
        <div className='flex gap-5'>
            <div className=' w-1/4 flex justify-center items-center'>
                <div className='bg-gray-300 rounded-3xl size-40'></div>
            </div>
            <div className='w-1/4 flex flex-col justify-center gap-7 font-bold text-sm'>
                <span>data received: <span className='text-claimed-text'>27/11/25</span></span>
                <span>status: <span className='px-5 text-claimed-text bg-claimed py-0.5 rounded-full font-medium'>arrived</span></span>
                <span>product description: <br /> <span className='font-normal normal-case w-3/4 block'>I know there are moments when on abundance of jobs...</span></span>
            </div>
            <div className='w-1/4 flex flex-col justify-center gap-7 font-bold text-sm'>
                <span>ordered to: <br /> <span className='font-medium text-claimed-text'> baserterne, st kitts</span></span>
                <span>ordered from: <br /> <span className='font-medium text-claimed-text'> baseterre,st kitts</span></span>
                <span>package content: <br /> <span className='font-medium text-claimed-text'>new oraimo  head </span></span>
            </div>
            <div className='w-1/4 flex flex-col justify-center gap-7 font-bold text-sm'>
                <span>location: <br /><span className='font-medium text-claimed-text'> baserterne, st kitts</span></span>
                <span>product description: <br /><span className='font-medium text-claimed-text'> baserterne, st kitts</span></span>
            </div>
        </div>
        <Tabs defaultValue="tracking location" className="w-ful pt-12">
            <TabsList>
                {tabs.map((item)=> 
                <TabsTrigger className='w-80 h-12 !font-bold text-gray-700 flex gap-3 items-center !capitalize bg-[#EAEAEA] rounded-none rounded-t-3xl' key={item.title} value={item.title}>
                    <item.icon className='text-hudddle'/>
                    {item.title} 
                    {/* <span className='bg-hudddle py-0.5 px-3.5 text-xs font-medium rounded-xl text-white'>21</span> */}
                </TabsTrigger>
                )}
            </TabsList>
            <TabsContent value="tracking location">
                <div className='bg-white rounded-lg p-10'>
                    <div className='bg-hudddle/10 p-5 rounded-3xl'>
                        <span className='font-bold text-sm'>status: <span className='px-7 text-claimed-text bg-claimed py-0.5 rounded-full font-medium'>arrived</span></span>
                    </div>
                    <div className='min-h-32 flex p-5 gap-3'>
                        <div className='flex flex-col items-center'>
                            <MapPin className='text-hudddle'/>
                            <div className="w-px mt-2 h-20 bg-hudddle"></div> 
                            <div className="w-2 h-2 bg-hudddle rounded-full"></div>
                        </div>
                        <span className='font-bold text-sm'>departure: <br /> <span className='font-normal pt-1.5 block'>Item leaves our St. Kitts Ports en route to USA</span></span>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
      </div>
      <div className='w-1/3 p-10 h-full flex flex-col items-center justify-center gap-20'>
        <div className='border border-claimed-text p-1 rounded-3xl'>
                <div className='grid place-items-center bg-claimed-text p-5 rounded-3xl size-80'>
                    <QRCodeCanvas size={200} bgColor='#0D6534' fgColor='#BCBCBC' value="https://example.com" />
                </div>
        </div>
        <div className='space-y-5'>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-sm'>Next Steps</span>
                <span className='pl-2'>1. Open your <b>ShipIt</b> Admin phone application.</span>
                <span className='pl-2'>2. Check your notifications for the QR code <span className='pl-4'>notification.</span></span>
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
