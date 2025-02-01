import axios from "axios";
import {Watchlist} from '@/lib/models/Watchlist'

interface Stock{
  symbol: string
  regularMarketPrice: number
  trailingPE:number 
  epsTrailingTwelveMonths: number 
  regularMarketVolume: number 
  marketCap: number
  dividendYield:number
}
// Yahoo Finance API URL
const YAHOO_API = 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes';

// Function to get symbols from Watchlist
const getWatchlistSymbols = async () => {
  const symbols = await Watchlist.find({}, 'symbol');
  const stockSymbols = symbols.map(item => item.symbol);
  const encodedSymbols = encodeURIComponent(stockSymbols.join(','));
  console.log(stockSymbols, encodedSymbols);
  return encodedSymbols;
};

// Function to fetch stock data for all symbols
const fetchAllStockData = async () => {
  try {
    const symbols = await getWatchlistSymbols();  // Get all symbols
    const response = await axios.get(YAHOO_API, {
      params: { ticker: symbols },  // Send the encoded symbols as params
      headers: {
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        'x-rapidapi-key': '4b247d563amsha743563d3a0ff68p1e0fd0jsn1dc8313b5523',
      },
    });

    

    const stocks = response.data.body.map((stock:Stock) => ({
      symbol: stock.symbol,
      price: stock.regularMarketPrice,
      peRatio: stock.trailingPE || 0,
      eps: stock.epsTrailingTwelveMonths || 0,
      dividendYield: stock.dividendYield || 0,
      volume: stock.regularMarketVolume,
      marketCap: stock.marketCap,
    }));

    console.log(stocks,"in yahooooooooooooooooooooo");  // Log the stock details
    return stocks;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

// Call the function to fetch stock data
export default fetchAllStockData;
