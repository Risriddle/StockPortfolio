// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ArrowUpIcon, Plus, X } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { addToWatchlist, removeFromWatchlist } from "@/app/actions/watchlist"
// import { toast } from "sonner"

// interface WatchlistStock {
//   name: string
//   ticker: string
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
//   analysis: string
// }

// interface Props {
//   stocks: WatchlistStock[]
//   userId: string
// }

// export default function WatchlistAnalysis({ stocks, userId }: Props) {
//   const [newSymbol, setNewSymbol] = useState("")
//   const [isAdding, setIsAdding] = useState(false)

//   const handleAddToWatchlist = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsAdding(true)

//     try {
//       const result = await addToWatchlist(userId, newSymbol)
//       if (result.error) {
//         toast.error(result.error)
//       } else {
//         toast.success("Added to watchlist")
//         setNewSymbol("")
//       }
//     } catch (error) {
//       toast.error("Failed to add to watchlist")
//     }

//     setIsAdding(false)
//   }

//   const handleRemove = async (symbol: string) => {
//     try {
//       const result = await removeFromWatchlist(userId, symbol)
//       if (result.error) {
//         toast.error(result.error)
//       } else {
//         toast.success("Removed from watchlist")
//       }
//     } catch (error) {
//       toast.error("Failed to remove from watchlist")
//     }
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Watchlist Analysis</h2>
//         <form onSubmit={handleAddToWatchlist} className="flex gap-2">
//           <Input
//             type="text"
//             placeholder="Enter stock symbol"
//             value={newSymbol}
//             onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
//             className="w-40"
//           />
//           <Button type="submit" disabled={isAdding}>
//             <Plus className="h-4 w-4 mr-2" />
//             Add
//           </Button>
//         </form>
//       </div>

//       <div className="border rounded-lg overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Stock</TableHead>
//               <TableHead>Recommendation</TableHead>
//               <TableHead>Style Scores</TableHead>
//               <TableHead>Industry Rank</TableHead>
//               <TableHead>Current Price</TableHead>
//               <TableHead>Return Since Added</TableHead>
//               <TableHead>Target Price</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {stocks.map((stock) => (
//               <TableRow key={stock.ticker}>
//                 <TableCell>
//                   <div>
//                     <div className="font-medium">{stock.name}</div>
//                     <div className="text-sm text-muted-foreground">{stock.ticker}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant={stock.zacksRank === "Strong Buy" ? "default" : "secondary"} className="h-7 text-xs">
//                     {stock.zacksRank}
//                   </Button>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex gap-1">
//                     <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-100 text-blue-700">
//                       {stock.styleScores.value}
//                     </Badge>
//                     <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-100 text-blue-700">
//                       {stock.styleScores.growth}
//                     </Badge>
//                     <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-100 text-blue-700">
//                       {stock.styleScores.momentum}
//                     </Badge>
//                     <Badge variant="secondary" className="bg-green-100 hover:bg-green-100 text-green-700">
//                       {stock.styleScores.vgm}
//                     </Badge>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div>
//                     <div>{stock.industryRank}</div>
//                     <div className="text-sm text-muted-foreground">{stock.sector}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-1 text-green-600">
//                     <ArrowUpIcon className="h-4 w-4" />
//                     {stock.returnSince.percentage.toFixed(2)}%
//                   </div>
//                   <div className="text-sm text-muted-foreground">Since {stock.returnSince.date}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div>${stock.targetPrice.price.toFixed(2)}</div>
//                   <div className="text-sm text-muted-foreground">{stock.targetPrice.upside.toFixed(2)}% upside</div>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant="ghost" size="sm" onClick={() => handleRemove(stock.ticker)}>
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }

