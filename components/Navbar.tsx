"use client"
import React from 'react'
import { AlertCircle, HelpCircle, LayoutDashboard, LogOut, MessageCircle, Package } from 'lucide-react'
import {Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
    {
      title: 'dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'packages',
      icon: Package,
    },
    {
      title: 'pre-alerts',
      icon: AlertCircle,
    },
    {
      title: 'invoices',
      icon: MessageCircle,
    },
    {
      title: 'help desk',
      icon: HelpCircle,
    },
    {
      title: 'messages',
      icon: MessageCircle,
    },
    {
      title: 'logout',
      icon: LogOut,
    },
  ]

export default function Navbar() {
    // const {
    //     state,
    //     open,
    //     setOpen,
    //     openMobile,
    //     setOpenMobile,
    //     isMobile,
    //     toggleSidebar,
    //   } = useSidebar()
    const pathname = usePathname()
  return (
    <Sidebar>
        <SidebarContent className='p-5 '>
            <SidebarGroup className='h-full'>
                <SidebarGroupLabel className='text-hudddle text-2xl py-10 font-bold'>
                    Hudddle
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu className=' capitalize'>
                        {sidebarItems.map((item) => {
                          const href =`/${item.title === "dashboard"? "" : item.title}`
                          const isActive = pathname === href
                               return <SidebarMenuItem className='py-5' key={item.title}>
                                    <SidebarMenuButton className={` ${isActive? "text-orange-500 hover:text-orange-600": "text-gray-700"} text-base font-bold`} asChild>
                                        <Link href={href}>
                                            <item.icon className={`text-claimed-text ${isActive && "text-orange-500 hover:text-orange-600"}`}/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                               </SidebarMenuItem>
                              })}           
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

    </Sidebar>   
  )
}
