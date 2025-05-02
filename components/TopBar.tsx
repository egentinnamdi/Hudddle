import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

export default function TopBar() {
    const dateToday = new Date();

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
            <h2 className='text-2xl font-light'>good morning, <span className='font-bold text-hudddle'>Nnamdi</span></h2>
            <span className='pt-1 text-sm text-gray-400 font-medium'>{formattedDate}</span>
        </div>
        <div></div>
    </div>
  )
}
