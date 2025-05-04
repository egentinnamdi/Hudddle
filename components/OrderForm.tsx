"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { z } from "zod"
import { Button } from './ui/button'
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from './ui/form'
import { Input } from './ui/input'
// import { toast } from 'sonner'


//  order no, category, warehouse receipt, supplier, weight, date sent, date received, status, description, package content, location


const formItems: Array<{title: string; type?: string; options?: Array<string>}>= [
    {
        title: "package content",
    },
    {
        title: "category",
        options: ["electronics", "fashion", "furniture"]
    },
    {
        title: "warehouse receipt",
    },
    {
        title: "supplier",
    },
    {
        title: "weight",
        type: "number"
    },
    {
        title: "description",
    },
    {
        title: "status",
        options: ["unclaimed", "overdue", "in-transit", "claimed"]
    },
    {
        title: "location",
    },
]


export default function OrderForm() {
    const formSchema= z.object({
        packageContent: z.string().min(5, {message: "Must be % or more characters long"}),
        category: z.union([z.literal("electronics"), z.literal("furniture"), z.literal("fashion")]),
        warehouseReceipt: z.number(),
        supplier: z.string(),
        weight: z.number(),
        description: z.string().refine((val)=> val.length >= 20, {message: "Description length is too short"}),
        status: z.union([z.literal("unclaimed"), z.literal("overdue"), z.literal("in-transit"), z.literal("claimed")]),
        location: z.string()
    })
    
    type OrderFormType = z.infer<typeof formSchema>

    const form = useForm<OrderFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            packageContent: "",
            category: "electronics",
            warehouseReceipt: 0,
            supplier: "",
            weight: 0,
            description: "",
            status: "unclaimed",
            location: ""
        }
    })

    function onSubmit(values: OrderFormType){
        console.log("hello")
        // try{
        //     toast("New Order Created...", {description: "You will be redirected"})

        // }catch(err){
        //     console.log(err)
        // }finally{
        //     form.reset()
        // }
    }
  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription>Create A New Order</DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form className='flex flex-col gap-7' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-5'>
                    {formItems.map((item, index)=>(
                        <FormField
                          key={index}
                          control={form.control}
                          name={item.title as keyof OrderFormType}
                          render={({field})=>(
                              <FormItem>
                                  <FormLabel className='capitalize'>{item.title}</FormLabel>
                                  <FormControl>
                                      <Input  type={item.type === "number"? "number" : "text"} {...field} 
                                        onChange={(e)=>{
                                            if(item.type === "number"){
                                                field.onChange(e.target.value === ""? "" : Number(e.target.value))
                                            }else{
                                                field.onChange(e.target.value)
                                            }
                                        }}
                                        value={field.value}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}
                        />
                    ))}
                </div>
                <div className='flex justify-end'>
                    <DialogClose className="w-1/4" asChild
                    >
                        <Button 
                        type="submit" 
                        onClick={() => {
                            form.handleSubmit(onSubmit)();
                        }}
                        className='w-2/4 h-10'
                        >
                        Submit
                        </Button>
                    </DialogClose>
                </div>
            </form>
        </Form>      
    </DialogContent>
  )
}
