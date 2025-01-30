

"use server"

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY
const BASE_URL = "https://www.alphavantage.co/query"

async function checkRateLimit(data: any) {
  // Check for rate limit exceeded message in the response
  if (data["Note"] && data["Note"].includes("Thank you for using Alpha Vantage")) {
    throw new Error("API call limit reached. Please try again later.");
  }
}

export async function searchStocks(query: string) {
  try {
    console.log(query,"queryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    const response = await fetch(`${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`)
    const data = await response.json()
console.log(data,"search stocksssssssssssssssssssssssssssssssss")
  
if (data.Information && data.Information.includes("Thank you for using Alpha Vantage")) {
  return { error: "API call limit reached. Please try again later." };
}


if (data.bestMatches && data.bestMatches.length === 0) {
  return { error: "No stocks found for the given query." };
}
    return (
      data.bestMatches?.map((match: any) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
        type: match["3. type"],
        region: match["4. region"],
      })) || []
    )
  } catch (error:any) {
    console.error("Error searching for stocks:", error)
    if (error.message === "API call limit reached. Please try again later.") {
      return { error: "API call limit reached. Please try again later." }
    }
    return { error: error.message || "Failed to fetch search quote." }
  }
}

export async function getStockQuote(symbol: string) {
  try {
    const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
    const data = await response.json()

    if (data.Information && data.Information.includes("Thank you for using Alpha Vantage")) {
      return { error: "API call limit reached. Please try again later." };
    }

   

    const quote = data["Global Quote"]

    if (!quote) {
      return { error: "unable to fetch stock quote..not found." };
    }

    return {
      symbol: quote["01. symbol"],
      price: Number.parseFloat(quote["05. price"]),
      changePercent: Number.parseFloat(quote["10. change percent"].replace("%", "")),
    }
  } catch (error:any) {
    console.error("Error fetching stock quote:", error)
    if (error.message === "API call limit reached. Please try again later.") {
      return { error: "API call limit reached. Please try again later." }
    }
    return { error: error.message || "Failed to fetch stock quote." }

  }
}
export async function getStockHistory(symbol: string) {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`)
    const data = await response.json()

    if (data.Information && data.Information.includes("Thank you for using Alpha Vantage")) {
      return { error: "API call limit reached. Please try again later." };
    }

    if (!data["Time Series (Daily)"]) {
      return { error: "Stock history not found!." };
    }

    
    // Extract and format historical data
    const historicalData = Object.entries(data["Time Series (Daily)"])
      .map(([date, values]: [string, any]) => ({
        date,
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        close: parseFloat(values["4. close"]),
      }))
      // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by most recent first
      console.log(historicalData, "historical data in alphaaaa")

    return historicalData[0];
   
  } catch (error: any) {
    console.error("Error fetching stock history:", error)

    // Handle rate limit error
    if (error.message === "API call limit reached. Please try again later.") {
      return {
        error: "API call limit reached. Please try again later."
      }
    }

    return { error: error.message || "Failed to fetch historical stock quote." }
  }
}
