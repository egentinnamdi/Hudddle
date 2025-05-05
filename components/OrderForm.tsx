"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { z } from "zod"
import { Button } from './ui/button'
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { toast } from 'sonner'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api'


//  order no, category, warehouse receipt, supplier, weight, date sent, date received, status, description, package content, location


const formItems: Array<{title: string; type?: string; options?: Array<string>}>= [
    {
        title: "packageContent",
    },
    {
        title: "category",
        options: ["electronics", "fashion", "furniture"]
    },
    {
        title: "warehouseReceipt",
    },
    {
        title: "supplier",
    },
    {
        title: "description",
    },
    {
        title: "weight",
    },
    {
        title: "status",
        options: ["unclaimed", "overdue", "in-transit", "claimed"]
    },
    {
        title: "location",
    },
]


export default function OrderForm({onSuccess}: {onSuccess: ()=> void}) {
    const createNewOrder= useMutation(api.order.createOrder)
    const formSchema= z.object({
        packageContent: z.string().min(5, {message: "Must be 5 or more characters long"}),
        category: z.union([z.literal("electronics"), z.literal("furniture"), z.literal("fashion")]),
        warehouseReceipt: z.string(),
        supplier: z.string(),
        weight: z.string(),
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
            warehouseReceipt: "",
            supplier: "",
            weight: "",
            description: "",
            status: "unclaimed",
            location: ""
        }
    })

    async function onSubmit(values: OrderFormType){
        try{
            createNewOrder({...values, weight: Number(values.weight)})
            console.log(values)
            onSuccess()
            toast("New Order Created...", {description: "You will be redirected"})
        }catch(err){
            toast.error("Something went wrong, please try again")
            console.log(err)
        }finally{
            form.reset()
        }
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
                    {formItems.map((item, index)=>{
                        const {title} = item
                    return <FormField
                          key={index}
                          control={form.control}
                          name={item.title as "packageContent" | "category" | "status" | "warehouseReceipt" | "supplier" | "weight" | "description" | "location"}
                          render={({field})=>(
                              <FormItem className={`${title === "description" && "col-span-2"}`}>
                                  <FormLabel className='capitalize'>{item.title}</FormLabel>
                                  <FormControl>
                                      {title === "category" || title === "status"? 
                                        <Select 
                                            onValueChange={(value: string) => {
                                              if (title === "category") {
                                                form.setValue("category", value as "electronics" | "fashion" | "furniture");
                                              } else if (title === "status") {
                                                form.setValue("status", value as "unclaimed" | "overdue" | "in-transit" | "claimed");
                                              }
                                            }} 
                                            value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={title} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {item.options?.map((option, index)=>(
                                                        <SelectItem key={index} value={option}><span className='capitalize'>{option}</span></SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                      : title === "description"?
                                      <Textarea {...field} value={field.value} rows={5} className='col-span-2' placeholder="Type your message here." />
                                      : <Input {...field} value={field.value}/>}
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}
                        />
                    })}
                </div>
                <div className='flex justify-end'>
                        <Button type="submit" className='w-2/4 h-10'>Submit</Button>
                </div>
            </form>
        </Form>      
    </DialogContent>
  )
}
