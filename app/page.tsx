import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, LineChart, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted pt-16">
        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Track Your Stocks with Confidence</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Create your personalized stock watchlist and monitor your portfolio performance in real-time.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button variant="ghost" size="lg">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to track your investments
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features to help you make informed investment decisions
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
              <TrendingUp className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Real-time Tracking</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Monitor your stocks in real-time with live price updates and alerts
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
              <BarChart2 className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Portfolio Analytics</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Get detailed insights into your portfolio performance and returns
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
              <LineChart className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Custom Watchlists</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Create and manage multiple watchlists for different investment strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-muted sm:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why choose StockWatch?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                StockWatch provides you with the tools and insights you need to make better investment decisions. Our
                platform is designed to be intuitive and powerful, helping both novice and experienced investors track
                their portfolios effectively.
              </p>
              <div className="mt-8">
                <Link href="/signup">
                  <Button size="lg">Start Tracking Now</Button>
                </Link>
              </div>
            </div>
            <div className="lg:flex lg:items-center">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100">
                <div className="flex items-center justify-center">
                  <BarChart2 className="h-32 w-32 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

