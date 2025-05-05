"use client"
import DeleteBtn from "@/components/DeleteBtn";
import OrderForm from "@/components/OrderForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Package, TriangleAlert, Truck } from "lucide-react";
import { useState } from "react";

const  dashItem= [
  {
    title: "unclaimed",
    color: "bg-unclaimed",
    icon: Package
  },
  {
    title: "overdue",
    color: "bg-overdue",
    icon: TriangleAlert
  },
  {
    title: "in-transit",
    color: "bg-transit",
    icon: Truck
  },
  {
    title: "claimed",
    color: "bg-claimed",
    icon: Package,
    span: "col-span-3"
  }
]
export default function Home() {
  // const params = useParams()
  const [open, setOpen]= useState(false)
  const unclaimed = useQuery(api.order.getByStatus, { status: "claimed"})
  const claimed = useQuery(api.order.getByStatus, { status: "unclaimed"})
  const overdue = useQuery(api.order.getByStatus, { status: "overdue"})
  const inTransit = useQuery(api.order.getByStatus, { status: "in-transit"})
  const statusObj= {unclaimed, claimed, overdue, inTransit}


  
  const condition = unclaimed === undefined || claimed === undefined || overdue === undefined || inTransit === undefined
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex-grow flex justify-center bg-gray-50 rounded-xl">
        <div className="w-screen lg:pb-0 pb-10  lg:w-11/12 gap-7 lg:gap-0 flex flex-col justify-evenly capitalize">
          <div className="lg:flex justify-between px-8 pt-7 space-y-5 lg:space-y-0 lg:p-0">
            <h1 className="font-bold text-gray-700 text-3xl">dashboard</h1>
            <div className="flex gap-3 lg:flex-row flex-row-reverse items-center justify-end">
              <DeleteBtn/>
              <DialogTrigger asChild>
                <Button className="!p-3 bg-claimed-text">Register Package</Button>
              </DialogTrigger>
              <OrderForm onSuccess={()=> setOpen(false)}/>
            </div>
          </div>
          <div className="w-full lg:gap-3 lg:grid grid-cols-[1.5fr_1fr_1fr] flex flex-col items-center  gap-5 grid-rows-2">
            {dashItem.map((item)=>{
              const {title} = item
              return(
                <div key={item.title} className={`${item.color} w-5/6 flex flex-col gap-4 lg:gap-5 justify-between ${title === "in-transit"? "text-gray-800" : title === "claimed"?  "text-claimed-text" :"text-white"} p-10  bg-claimed ${item?.span} rounded-2xl`}>
                  <span className="text-xl text-gray-800">{item.title}</span>
                  <span className="text-4xl font-bold">
                    {condition 
                      ? "loading..." 
                      : ` ${statusObj[title === "in-transit"? "inTransit" : title as keyof typeof statusObj]?.length || 0} packages`}
                  </span>
                  <item.icon className="" size={60}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
