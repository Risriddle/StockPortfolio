


"use server";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";



export async function searchStocks(query: string) {
  try {
    console.log(query, "queryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
    );
    const data = await response.json();
    console.log(data, "search stocksssssssssssssssssssssssssssssssss");

    if (data.Information?.includes("Thank you for using Alpha Vantage")) {
      return { error: "API call limit reached. Please try again later." };
    }

    if (!data.bestMatches || data.bestMatches.length === 0) {
      return { error: "No stocks found for the given query." };
    }

    return data.bestMatches.map((match: { [key: string]: string }) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
      type: match["3. type"],
      region: match["4. region"],
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error searching for stocks:", error);
      return { error: error.message || "Failed to fetch search quote." };
    }
    return { error: "An unknown error occurred." };
  }
}

export async function getStockQuote(symbol: string) {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Information?.includes("Thank you for using Alpha Vantage")) {
      return { error: "API call limit reached. Please try again later." };
    }

    const quote = data["Global Quote"];
    if (!quote) {
      return { error: "Unable to fetch stock quote. Not found." };
    }

    return {
      symbol: quote["01. symbol"],
      price: parseFloat(quote["05. price"]),
      changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching stock quote:", error);
      return { error: error.message || "Failed to fetch stock quote." };
    }
    return { error: "An unknown error occurred." };
  }
}




// Define the return type for the getStockHistory function
type StockHistoryResponse = 
  | { data: { date: string; open: number; high: number; low: number; close: number; } }
  | { error: string };

export async function getStockHistory(symbol: string): Promise<StockHistoryResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Information?.includes("Thank you for using Alpha Vantage")) {
      return { error: "API call limit reached. Please try again later." };
    }

    if (!data["Time Series (Daily)"]) {
      return { error: "Stock history not found!" };
    }

    const historicalData = Object.entries(data["Time Series (Daily)"] as Record<string, Record<string, string>>)
      .map(([date, values]) => ({
        date,
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        close: parseFloat(values["4. close"]),
      }));

    // console.log(historicalData, "historical data in alphaaaa");

    // Return the latest stock data
    return { data: historicalData[0] };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching stock history:", error);
      return { error: error.message || "Failed to fetch historical stock quote." };
    }
    return { error: "An unknown error occurred." };
  }
}

