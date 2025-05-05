import React from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function DeleteBtn() {
    const deleteAllOrders = useMutation(api.order.deleteAllOrders)
  return (
    <Button onClick={()=>{
        deleteAllOrders()
        toast.success("Orders table deleted successfully...")
      } } variant="outline" className="p-3 border-claimed-text">
        Clear Package
    </Button>
  )
}
