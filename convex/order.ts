import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all Orders
export const getAllOrders= query({
    args: {},
    handler: async (ctx)=>{
        const allOrders= await ctx.db.query("orders").collect()
        return allOrders
    }
})

// Get Order By Id

export const getOrderById =  query({
    args: {
        orderId: v.id("orders"),
    },
    handler: async (ctx, args)=>{
        const orderById= await ctx.db.get(args.orderId)

        if(!orderById){
            throw Error("Order Not Found")
        }

        return orderById
    }
})

// Get Order by status
export const getByStatus= query({
    args:{
        status: v.union(v.literal("unclaimed"), v.literal("claimed"), v.literal("overdue"), v.literal("in-transit"))
    },
    handler: async (ctx, args)=>{
        const orders = await ctx.db.query("orders").filter((q)=> q.eq(q.field("status"), args.status)).collect()

        return orders
    }
})

// Create Order

export const createOrder= mutation({
    args:{
        category: v.union(v.literal("fashion"), v.literal("furniture"), v.literal("electronics")),
        warehouseReceipt: v.string(),
        packageContent: v.string(),
        supplier: v.string(),
        weight: v.number(),
        status: v.union(v.literal("unclaimed"), v.literal("claimed"), v.literal("overdue"), v.literal("in-transit")),
        description: v.string(),
        location: v.string(),
    },
    handler: async (ctx, args)=>{
        const orderId = await ctx.db.insert("orders", {
            category: args.category,
            packageContent: args.packageContent,
            warehouseReceipt: args.warehouseReceipt,
            supplier: args.supplier,
            weight: args.weight,
            dateSent: new Date().toISOString(),
            status: args.status,
            description: args.description,
            location: args.location,
        })

        return orderId
    }
})

// Delete an Order
export const deleteOrder = mutation({
    args:{
        orderId: v.id("orders")
    },
    handler: async (ctx, args)=> {
        try{
            await ctx.db.delete(args.orderId)          
        }catch(error){
            console.log(error)
            throw Error("Something went wrong...")
        }
    }
})

// Delete all orders

export const deleteAllOrders = mutation({
    handler: async (ctx) => {
        // Get all order IDs
        const allOrders = await ctx.db.query("orders").collect();
        for (const order of allOrders) {
            await ctx.db.delete(order._id);
        }
        return { deleted: allOrders.length };
    }
})