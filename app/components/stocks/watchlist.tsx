


// "use client"

// import { useState, useEffect } from "react"
// import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"

// interface WatchlistStock {
//   symbol: string
//   name: string
//   price: number
//   change: number
//   totalReturn:number
//   changePercent: number
//   addedDate: string
//   initialPrice: number
// }


// export default function Watchlist() {
//   const [watchlist, setWatchlist] = useState<WatchlistStock[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const { toast } = useToast()

//   const fetchWatchlist = async () => {
//     try {
//       const response = await fetch("/api/watchlist")
//       if (!response.ok) {
//         throw new Error("Failed to fetch watchlist")
//       }
//       const data = await response.json()
  
//       if (data.error) {
//         // If the API returns an error, show it in the toast
//         throw new Error(data.error)
        
//       }
//     setWatchlist(data.stocks)
     
//     } catch (error: any) {
//       console.error("Failed to fetch watchlist:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to fetch watchlist. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }
  

//   useEffect(() => {
//     fetchWatchlist()
//     const interval = setInterval(fetchWatchlist, 5 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [])

//   const removeFromWatchlist = async (symbol: string) => {
//     try {
//       const response = await fetch(`/api/watchlist?symbol=${symbol}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to remove stock")
//       }

//       setWatchlist((prev) => prev.filter((stock) => stock.symbol !== symbol))
//       toast({
//         title: "Success",
//         description: "Stock removed from watchlist",
//       })
//     } catch (error) {
//       console.error("Failed to remove stock:", error)
//       toast({
//         title: "Error",
//         description: "Failed to remove stock. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   if (isLoading) {
//     return (
//       <Card>
//         <CardContent className="p-8">
//           <p className="text-center">Loading watchlist...</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Your Watchlist</CardTitle>
//         <CardDescription>Track the performance of your selected stocks</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {watchlist.map((stock) => {
//             return (
//               <div key={stock.symbol} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div>
//                   <h3 className="font-semibold">{stock.symbol}</h3>
//                   <p className="text-xs text-muted-foreground">
//                     Added on {new Date(stock.addedDate).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="text-right">
//                     <p className="font-mono">${stock.price.toFixed(2)}</p>
//                     <p
//                       className={`text-sm flex items-center ${
//                         stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {stock.changePercent >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
//                       {Math.abs(stock.changePercent).toFixed(2)}%
//                     </p>
//                     <p className={`text-xs ${stock.totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
//                       Total: {stock.totalReturn.toFixed(2)}%
//                     </p>
//                   </div>
//                   <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(stock.symbol)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             )
//           })}
//           {watchlist.length === 0 && (
//             <p className="text-center text-muted-foreground py-8">
//               Your watchlist is empty. Add some stocks to get started!
//             </p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface WatchlistStock {
  symbol: string
  name: string
  price: number
  change: number
  totalReturn: number
  changePercent: number
  addedDate: string
  initialPrice: number
}

export type WatchlistRef = {
  fetchWatchlist: () => void
}

const Watchlist = forwardRef<WatchlistRef>((_, ref) => {
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchWatchlist = async () => {
    try {
      const response = await fetch("/api/watchlist")
      if (!response.ok) {
        throw new Error("Failed to fetch watchlist")
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setWatchlist(data.stocks)
    } catch (error: any) {
      console.error("Failed to fetch watchlist:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to fetch watchlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({ fetchWatchlist }))

  useEffect(() => {
    fetchWatchlist()
    const interval = setInterval(fetchWatchlist, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const removeFromWatchlist = async (symbol: string) => {
    try {
      const response = await fetch(`/api/watchlist?symbol=${symbol}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to remove stock")
      }
      setWatchlist((prev) => prev.filter((stock) => stock.symbol !== symbol))
      toast({ title: "Success", description: "Stock removed from watchlist" })
    } catch (error) {
      console.error("Failed to remove stock:", error)
      toast({
        title: "Error",
        description: "Failed to remove stock. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center">Loading watchlist...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Watchlist</CardTitle>
        <CardDescription>Track the performance of your selected stocks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{stock.symbol}</h3>
                <p className="text-xs text-muted-foreground">
                  Added on {new Date(stock.addedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-mono">${stock.price.toFixed(2)}</p>
                  <p
                    className={`text-sm flex items-center ${
                      stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.changePercent >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </p>
                  <p className={`text-xs ${stock.totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                    Total: {stock.totalReturn.toFixed(2)}%
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(stock.symbol)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {watchlist.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Your watchlist is empty. Add some stocks to get started!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

export default Watchlist
