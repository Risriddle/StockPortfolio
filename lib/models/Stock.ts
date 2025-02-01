import mongoose from "mongoose"

const stockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ticker: { type: String, required: true, unique: true },
    zacksRank: {
      type: String,
      required: true,
      enum: ["Strong Buy", "Buy"],
    },
    styleScores: {
      value: { type: String, required: true },
      growth: { type: String, required: true },
      momentum: { type: String, required: true },
      vgm: { type: String, required: true },
    },
    industryRank: { type: String, required: true },
    sector: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    returnSince: {
      percentage: { type: Number, required: true },
      date: { type: String, required: true },
    },
    targetPrice: {
      price: { type: Number, required: true },
      upside: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  },
)

export const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema)

