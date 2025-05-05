"use client"
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React from 'react'

export default function ConvexWrapper({children}: {children: React.ReactNode}) {
    // Development
// const convex = new ConvexReactClient("https://precious-anteater-32.convex.cloud")

// Production
const convex = new ConvexReactClient("https://kindhearted-lion-687.convex.cloud")


  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  )
}
