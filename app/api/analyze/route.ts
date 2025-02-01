// import  fetchAllStockData  from "@/lib/yahoo-finance";
// import  recommendStocks  from "@/lib/recommend";



// interface Stock{
//     symbol: string
//     price: number
//     peRatio: number
//     eps:number
//     dividendYield: number
//     volume: number
//     marketCap: number
  
//   }

// // Calculate VGM Score (Value, Growth, Momentum)
// const calculateVGM = (stocks:Stock[]) => {
//   const maxPe = Math.max(...stocks.map((s) => s.peRatio || 1));
//   return stocks.map((s) => ({
//     ...s,
//     vgmScore: (0.4 * (1 / (s.peRatio || maxPe))) + (0.4 * s.dividendYield || 0),
//   }));
// };

// // Estimate Target Price
// const calculateTargetPrice = (stocks:Stock[]) => {
//   return stocks.map((s) => ({
//     ...s,
//     targetPrice: s.eps * 20, // Assuming industry avg P/E ~20
//   }));
// };

// // API Route to analyze AI-recommended stocks
// export default async function handler(req, res) {
//   const recommended = await recommendStocks();
//   console.log(recommended,"in analysis tssssssssssssssssssssssssssssss")
//   let analyzedStocks = calculateVGM(recommended);
//   analyzedStocks = calculateTargetPrice(analyzedStocks);

//   res.status(200).json({ analyzed: analyzedStocks });
// }



import { NextRequest, NextResponse } from "next/server";
import recommendStocks from "@/lib/recommend";

interface Stock {
  symbol: string;
  price: number;
  peRatio: number;
  eps: number;
  dividendYield: number;
  volume: number;
  marketCap: number;
  vgmScore:number;
}

// Calculate VGM Score (Value, Growth, Momentum)
const calculateVGM = (stocks: Stock[]) => {
  const maxPe = Math.max(...stocks.map((s) => s.peRatio || 1));
  return stocks.map((s) => ({
    ...s,
    vgmScore: (0.4 * (1 / (s.peRatio || maxPe))) + (0.4 * s.dividendYield || 0),
  }));
};

// Estimate Target Price
const calculateTargetPrice = (stocks: Stock[]) => {
  return stocks.map((s) => ({
    ...s,
    targetPrice: s.eps * 20, // Assuming industry avg P/E ~20
  }));
};

// POST API Route to analyze AI-recommended stocks
export async function GET(request: NextRequest) {
  try {
    
const recommended = await recommendStocks();
  console.log(recommended,"in analysis tssssssssssssssssssssssssssssss")
  let analyzedStocks = calculateVGM(recommended);
  analyzedStocks = calculateTargetPrice(analyzedStocks);

    return NextResponse.json({ success: true, analyzed: analyzedStocks });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ success: false, message: "An error occurred during stock analysis" });
  }
}
