import {defineSchema, defineTable} from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    orders: defineTable({
        category: v.union(v.literal("fashion"), v.literal("furniture"), v.literal("electronics")),
        packageContent: v.string(),
        warehouseReceipt: v.string(),
        supplier: v.string(),
        weight: v.number(),
        dateSent: v.string(),
        dateReceived: v.optional(v.string()),
        status: v.union(v.literal("unclaimed"), v.literal("claimed"), v.literal("overdue"), v.literal("in-transit")),
        description: v.string(),
        location: v.string(),
    })
})