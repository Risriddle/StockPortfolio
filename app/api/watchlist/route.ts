import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { Watchlist } from "@/lib/models/Watchlist"; 
import { dbConnect } from "@/lib/dbConnect";
import { getStockQuote,getStockHistory } from "@/lib/alpha-vantage"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    await dbConnect();

    const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log("No token found");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Extract userId from the payload
    const userId = payload.userId;
    console.log(userId, "userId from token in route.js of GET watchlist");

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      return NextResponse.json({ stocks: [] });
    }

    // Get real-time data for each stock
    const stocksWithQuotes = await Promise.all(
      watchlist.stocks.map(async (stock: any) => {
        try {
          // Fetch historical data based on addedDate
          const historicalData = await getStockHistory(stock.symbol);

          if (historicalData.error && historicalData.error.includes("API call limit")) {
            return {
              symbol: stock.symbol,
              initialPrice: stock.price,
              addedDate: stock.addedDate,
              error: "API call limit reached for historical data.",
              totalReturn: 0,
            };
          }

          // Assuming historicalData is an array and contains a 'close' price for the latest date
          const closePrice = historicalData.close;

          if (!closePrice) {
            return {
              symbol: stock.symbol,
              addedDate: stock.addedDate,
              initialPrice: stock.initialPrice,
              error: "No valid close price found.",
              totalReturn: 0,
            };
          }

          // Calculate total return
          const totalReturn = calculateReturn(stock.initialPrice, closePrice);

          // Return the stock data with the quote, added date, initial price, and total return
          return {
            symbol: stock.symbol,
            addedDate: stock.addedDate,
            price: stock.initialPrice,
            changePercent:stock.changePercent,
            totalReturn: totalReturn,
          };
        } catch (error: any) {
          // If there's an error while calling getStockHistory or getStockQuote
          if (error.message.includes("API call limit reached")) {
            return {
              symbol: stock.symbol,
              addedDate: stock.addedDate,
              error: "API call limit reached. Please try again later.",
              totalReturn: 0,
            };
          }
          // Catch any other unforeseen errors
          console.error("Error fetching stock data:", error);
          return {
            symbol: stock.symbol,
            addedDate: stock.addedDate,
            error: "Internal Server Error",
            totalReturn: 0,
          };
        }
      })
    );

    return NextResponse.json({ stocks: stocksWithQuotes });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


const calculateReturn = (current: number, initial: number) => {
  return ((current - initial) / initial) * 100;
}



export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const { symbol, name } = await request.json()

    const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

        // Get the token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
    
        if (!token) {
          console.log("No token found");
          return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }
    
        const secret = new TextEncoder().encode(JWT_SECRET);
              const { payload } = await jwtVerify(token, secret);
        
              // Extract userId from the payload
              const userId = payload.userId;
              console.log(userId, "userId from token in route.js POST of watchlist");
       

    // Get current stock price
    const quote = await getStockQuote(symbol)

   


    // Find or create watchlist for user
    let watchlist = await Watchlist.findOne({ userId })

    if (!watchlist) {
      watchlist = new Watchlist({ userId, stocks: [] })
    }

    // Check if stock already exists in watchlist
    const stockExists = watchlist.stocks.some((stock: any) => stock.symbol === symbol)

    if (stockExists) {
      return NextResponse.json({ error: "Stock already in watchlist" }, { status: 400 })
    }

    // Add new stock to watchlist
    watchlist.stocks.push({
      symbol,
      name,
      initialPrice: quote.price,
      changePercent:quote.changePercent,
      addedDate: new Date(),
    })

    await watchlist.save()

    return NextResponse.json({ success: true, stock: quote })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get("symbol")

    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
    }

    const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

    // Get the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log("No token found");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
          const { payload } = await jwtVerify(token, secret);
    
          // Extract userId from the payload
          const userId = payload.userId;
          console.log(userId, "userId from token in route.js POST of watchlist");
  
    const watchlist = await Watchlist.findOne({ userId })

    if (!watchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 })
    }

    watchlist.stocks = watchlist.stocks.filter((stock: any) => stock.symbol !== symbol)
    await watchlist.save()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

