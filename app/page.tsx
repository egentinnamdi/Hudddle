import { Button } from "@/components/ui/button";
import { Package, TriangleAlert, Truck } from "lucide-react";
// import { useParams } from "next/navigation";

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
  
  return (
    <div className="flex-grow flex justify-center bg-gray-100 rounded-xl">
      <div className="w-11/12 flex flex-col justify-evenly capitalize">
        <div className="flex  justify-between">
          <h1 className="font-bold">dashboard</h1>
          <div className="flex gap-3 items-center">
            <Button variant="outline" className="p-3 border-claimed-text">Clear Package</Button>
            <Button className="!p-3 bg-claimed-text">Register Package</Button>
          </div>
        </div>
        <div className="w-full h-3/4 gap-3 grid grid-cols-[1.5fr_1fr_1fr] grid-rows-2">
          {dashItem.map((item)=>{
            const {title} = item
            return(
              <div key={item.title} className={`${item.color} flex flex-col justify-between ${title === "in-transit"? "text-gray-800" : title === "claimed"?  "text-claimed-text" :"text-white"} p-10  bg-claimed ${item?.span} rounded-2xl border`}>
                <span className="text-xl text-gray-800">{item.title}</span>
                <span className="text-4xl font-bold">10 packages</span>
                <item.icon className="" size={60}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
