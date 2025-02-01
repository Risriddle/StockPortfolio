
"use client"

import { useRef } from "react"
import StockSearch from "../components/stocks/stock-search"
import Watchlist, { type WatchlistRef } from "../components/stocks/watchlist"
import { ErrorBoundary } from "../components/error-boundary"
// import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const watchlistRef = useRef<WatchlistRef>(null)


  // const handleRecommend=()=>{
  //   router.push("/analysis")
  // }

  const handleStockAdded = () => {
    watchlistRef.current?.fetchWatchlist()
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Stock Portfolio Watchlist</h1>
     
    <div className="grid md:grid-cols-4 gap-8">
  <div className="md:col-span-1">
    <h2 className="text-xl font-semibold mb-4">Add Stocks</h2>
    <ErrorBoundary>
      <StockSearch onStockAdded={handleStockAdded} />
    </ErrorBoundary>
  </div>
  <div className="md:col-span-3">
    <ErrorBoundary>
      <Watchlist ref={watchlistRef} />
    </ErrorBoundary>
  </div>
  {/* <button onClick={handleRecommend}>Recommend Stocks</button> */}
</div>
 
    </div>
  )
}

