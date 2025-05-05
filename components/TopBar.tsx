"use client"
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronDown } from 'lucide-react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';
import { useMediaQuery } from 'react-responsive';

export default function TopBar() {
    const dateToday = new Date();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    function getGreeting(){
        const hour = dateToday.getHours();
        if(hour < 12) return "good morning";
        if(hour < 18) return "good afternoon";
        return "good evening"
    }

    function getOrdinal(n: number) {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const day = dateToday.getDate();
    const month = dateToday.toLocaleString('default', { month: 'long' });
    const year = dateToday.getFullYear();
    const formattedDate = `${day}${getOrdinal(day)} ${month}, ${year}`;
  return (
    <div className="items-center capitalize min-h-20 p-5 flex shadow-lg justify-between">
        <div className='flex gap-x-3 items-center'>
            <SidebarTrigger/>
            <h2 className='lg:text-2xl font-light'>{getGreeting()}, <span className='font-bold text-hudddle'>Nnamdi</span></h2>
            {!isMobile && <span className='pt-1 text-sm text-gray-400 font-medium'>{formattedDate}</span>}
        </div>
        <div className='flex text-gray-500 gap-3 item-center justify-center min-w-1/4'>
            <Avatar className='size-10'>
                <AvatarImage src="/image.png" alt="profile" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {!isMobile && <p className='font-medium lg:text-base text-sm pt-1.5 px-2.5'>Nnamdi James</p>}
            <div>
                <Menubar>
                    <MenubarMenu>                
                        <MenubarTrigger>
                            <ChevronDown className='text-claimed-text'/>
                        </MenubarTrigger>
                        <MenubarContent className='capitalize'>
                            <MenubarItem>details</MenubarItem>
                            <MenubarItem>delete</MenubarItem>
                            <MenubarItem>clear</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    </div>
  )
}
