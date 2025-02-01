
// "use client"

// import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
// import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"

// interface WatchlistStock {
//   symbol: string
//   name: string
//   price: number
//   change: number
//   totalReturn: number
//   changePercent: number
//   addedDate: string
//   initialPrice: number
// }

// export type WatchlistRef = {
//   fetchWatchlist: () => void
// }
// const Watchlist = forwardRef<WatchlistRef>((_, ref) => {
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
//         throw new Error(data.error)
//       }
//       setWatchlist(data.stocks)
//     } catch (error ) {

//       console.error("Failed to fetch watchlist:", error)
//       if (error instanceof Error){
//         toast({
//           title: "Error",
//           description: error.message || "Failed to fetch watchlist. Please try again.",
//           variant: "destructive",
//         })
//       }
     
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useImperativeHandle(ref, () => ({ fetchWatchlist }))

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
//       toast({ title: "Success", description: "Stock removed from watchlist" })
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
//           {watchlist.map((stock) => (
//             <div key={stock.symbol} className="flex items-center justify-between p-4 border rounded-lg">
//               <div>
//                 <h3 className="font-semibold">{stock.symbol}</h3>
//                 <p className="text-xs text-muted-foreground">
//                   Added on {new Date(stock.addedDate).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="text-right">
//                   <p className="font-mono">${stock.price.toFixed(2)}</p>
//                   <p
//                     className={`text-sm flex items-center ${
//                       stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {stock.changePercent >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
//                     {Math.abs(stock.changePercent).toFixed(2)}%
//                   </p>
//                   <p className={`text-xs ${stock.totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
//                     Total: {stock.totalReturn.toFixed(2)}%
//                   </p>
//                 </div>
//                 <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(stock.symbol)}>
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//           {watchlist.length === 0 && (
//             <p className="text-center text-muted-foreground py-8">
//               Your watchlist is empty. Add some stocks to get started!
//             </p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// })

// Watchlist.displayName = "Watchlist"  // Adding display name here

// export default Watchlist


















"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
// import { ArrowUpIcon,  Trash2 } from "lucide-react"

import { useToast } from "@/hooks/use-toast"

// interface WatchlistStock {
//   name: string
//   symbol: string
//   addedDate:Date
//   price: number
//   // change: number
//   totalReturn: number
//   changePercent: number
//   initialPrice: number

//   zacksRank: "Strong Buy" | "Buy"
//   styleScores: {
//     value: string
//     growth: string
//     momentum: string
//     vgm: string
//   }
//   industryRank: string
//   sector: string
//   currentPrice: number
//   returnSince: {
//     percentage: number
//     date: string
//   }
//   targetPrice: {
//     price: number
//     upside: number
//   }
// }


interface WatchlistStock {
  symbol: string
  name: string
  price: number
  totalReturn: number
  changePercent: number
  addedDate: string
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




      // if (data.error) {
      //   throw new Error(data.error)
      // }
      setWatchlist(data.stocks)
    } catch (error) {
      console.error("Failed to fetch watchlist:", error)
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch watchlist. Please try again.",
          variant: "destructive",
        })
      }
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
    <div className="p-4">
    <div className="border rounded-lg overflow-x-auto">
      <Table className="w-full">
        {/* Caption with more bottom margin for spacing */}
        <caption className="text-lg font-semibold p-4 border-b bg-gray-100 text-center caption-top mb-4">
          Watchlist Stock Analysis
        </caption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Stock</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Zacks Rank</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Style Scores</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Industry Rank</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Current Price</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Return Since Added</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Target Price</TableHead>
            <TableHead className="px-6 py-3 text-left whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {watchlist.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                </div>
              </TableCell>
              <TableCell>
                {/* <Button variant={stock.zacksRank === "Strong Buy" ? "default" : "secondary"} className="h-7 text-xs">
                  {stock.zacksRank}
                </Button> */}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-100 text-blue-700">
                    {/* {stock.styleScores.value} */}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-100 text-blue-700">
                    {/* {stock.styleScores.growth} */}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-100 text-blue-700">
                    {/* {stock.styleScores.momentum} */}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 hover:bg-green-100 text-green-700">
                    {/* {stock.styleScores.vgm} */}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {/* <div>{stock.industryRank}</div>
                  <div className="text-sm text-muted-foreground">{stock.sector}</div> */}
                </div>
              </TableCell>
              <TableCell>$${stock.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className={`text-xs ${stock.totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {/* <ArrowUpIcon className="h-4 w-4" /> */}
                  {stock.changePercent >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}               
                  {stock.totalReturn.toFixed(2)}%
                 
                </div>
                <div className="text-sm text-muted-foreground">Since {new Date(stock.addedDate).toLocaleDateString()}</div>
              </TableCell>
              <TableCell>
                {/* <div>${stock.targetPrice.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">{stock.targetPrice.upside.toFixed(2)}% upside</div>*/}
              </TableCell> 
              <TableCell>
              <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(stock.symbol)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  )
})
Watchlist.displayName = "Watchlist"
export default Watchlist
