
"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { searchStocks } from "@/lib/alpha-vantage";
import { useDebounce } from "use-debounce";
import { useToast } from "@/hooks/use-toast";

interface Stock {
  symbol: string;
  name: string;
  type:string;
  region: string;
 
}

export default function StockSearch({ onStockAdded }: { onStockAdded: () => void }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [stocks, setStocks] = useState<Stock[]>([]); 
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to hold error message
  const { toast } = useToast();

  // Search stocks when input changes
  useEffect(() => {
    async function fetchStocks() {
      if (debouncedSearch.length < 2) {
        setStocks([]);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null); // Reset error message on new search
      try {
        const results = await searchStocks(debouncedSearch);

        if (results.error) {
          setErrorMessage(results.error); // Set error message if there's an error
          toast({
            title: "Error",
            description: results.error,
            variant: "destructive",
          });
        } else {
          setStocks(results);
        }
      } catch (error) {
        console.error("Failed to search stocks:", error);
        toast({
          title: "Error",
          description: "Failed to search stocks. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchStocks();
  }, [debouncedSearch, toast]);

  const toggleStock = (symbol: string) => {
    setSelectedStocks((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]));
  };

  const addToWatchlist = async () => {
    setIsAdding(true);
    try {
      for (const symbol of selectedStocks) {
        const stock = stocks.find((s) => s.symbol === symbol);
        const response = await fetch("/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol: stock.symbol,
            name: stock.name,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add stock to watchlist");
        }
      }

      toast({
        title: "Success",
        description: "Stocks added to watchlist",
      });

      setSelectedStocks([]);
      onStockAdded();
    } catch (error) {
      console.error("Failed to add stocks:", error);
      toast({
        title: "Error",
        description: "Failed to add stocks to watchlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p> // Display error message
      )}

      <div className="grid gap-4">
        {isLoading ? (
          <p className="text-center py-4">Loading...</p>
        ) : stocks.length > 0 ? (
          stocks.map((stock) => (
            <Card key={stock.symbol} className="cursor-pointer hover:bg-muted/50">
              <CardContent className="flex items-center justify-between p-4" onClick={() => toggleStock(stock.symbol)}>
                <div>
                  <h3 className="font-semibold">{stock.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                  <p className="text-xs text-muted-foreground">{stock.region}</p>
                </div>
                <Badge variant={selectedStocks.includes(stock.symbol) ? "default" : "outline"}>
                  {selectedStocks.includes(stock.symbol) ? "Selected" : "Select"}
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : search.length > 0 ? (
          <p className="text-center py-4">No stocks found</p>
        ) : null}
      </div>

      {selectedStocks.length > 0 && (
        <Button onClick={addToWatchlist} className="w-full" disabled={isAdding}>
          {isAdding ? "Adding..." : `Add ${selectedStocks.length} stocks to watchlist`}
        </Button>
      )}
    </div>
  );
}
