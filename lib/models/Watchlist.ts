import mongoose from "mongoose"

const WatchlistSchema = new mongoose.Schema(
  {
    userId: {
       type: mongoose.Schema.Types.ObjectId, ref: "User", required: true 
    },
    stocks: [
      {
        symbol: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        addedDate: {
          type: Date,
          default: Date.now,
        },
        initialPrice: {
          type: Number,
          required: true,
        },
        changePercent: {
          type: Number,
          required: true, // or you can make it optional depending on whether it's always present in the API
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Watchlist = mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema)








