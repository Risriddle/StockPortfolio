// "use server"

// import { dbConnect } from "@/lib/dbConnect"
// import { Watchlist } from "@/lib/models/Watchlist"
// import { analyzeWatchlistStock } from "@/lib/recommend"
// import { revalidatePath } from "next/cache"

// export async function addToWatchlist(userId: string, symbol: string, notes?: string) {
//   try {
//     await dbConnect()

//     const watchlistItem = await Watchlist.create({
//       userId,
//       symbol: symbol.toUpperCase(),
//       notes,
//     })

//     revalidatePath("/watchlist")
//     return { success: true, watchlistItem }
//   } catch (error) {
//     // if (error instanceof Error && error.code === 11000) {
//     //   return { error: "Stock is already in your watchlist" }
//     // }
//     return { error: "Failed to add to watchlist" }
//   }
// }

// export async function getWatchlistAnalysis(userId: string) {
//   try {
//     await dbConnect()

//     const watchlist = await Watchlist.find({ userId })

//     const analysisPromises = watchlist.map((item) => analyzeWatchlistStock(item.symbol, item.addedDate))

//     const analyses = await Promise.all(analysisPromises)

//     return { analyses }
//   } catch (error) {
//     return { error: "Failed to analyze watchlist" }
//   }
// }

// export async function removeFromWatchlist(userId: string, symbol: string) {
//   try {
//     await dbConnect()
//     await Watchlist.findOneAndDelete({ userId, symbol })
//     revalidatePath("/watchlist")
//     return { success: true }
//   } catch (error) {
//     return { error: "Failed to remove from watchlist" }
//   }
// }

