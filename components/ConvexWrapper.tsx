"use client"
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React from 'react'

export default function ConvexWrapper({children}: {children: React.ReactNode}) {
const convex = new ConvexReactClient("https://kindhearted-lion-687.convex.cloud")

  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  )
}
