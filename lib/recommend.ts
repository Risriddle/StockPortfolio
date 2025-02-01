// import  fetchAllStockData  from "@/lib/yahoo-finance";
// import { NextApiRequest, NextApiResponse } from "next";


// interface Stock{
//   symbol: string
//   price: number
//   peRatio: number
//   eps:number
//   dividendYield: number
//   volume: number
//   marketCap: number

// }

// interface StockRecommendation extends Stock {
//   aiScore: number; // Add aiScore to this new type
// }

// // Simple AI-based recommendation (Using basic scoring)
// const recommendStocks = async () => {
//   const stocks = await fetchAllStockData();
// console.log(stocks,"in recomeedn tessssssssssssss")
//   let recommendedStocks = stocks.filter(Boolean).map((s:Stock) => ({
//     ...s,
//     aiScore: (s.peRatio ? 100 / s.peRatio : 0) + (s.dividendYield || 0) * 100,
//   }));

//   recommendedStocks = recommendedStocks.sort((a:StockRecommendation, b:StockRecommendation) => b.aiScore - a.aiScore);
  
//   return recommendedStocks.slice(0, 3); // Top 3 recommendations
// };

// // // API Route
// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   try {
// //     const recommendations = await recommendStocks();
// //     res.status(200).json({ recommended: recommendations });
// //   } catch (error) {
// //     res.status(500).json({ error: "Something went wrong" });
// //   }
// // }


// export default recommendStocks;