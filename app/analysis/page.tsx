// "use client"
// import { useEffect, useState } from "react";


// interface Stock{
//     symbol: string
//     rank: number
//     price: number
//     eps:number
//     vgmScore: number
//     targetPrice: number

  
//   }
// export default function Analysis() {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/analyze")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data,"=========================================")
//         setStocks(data.analyzed);
//         setLoading(false);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-4">📈 AI Stock Recommendations</h1>
//       {loading ? (
//         <p>Loading recommendations...</p>
//       ) : (
//         <table className="w-full max-w-2xl border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800">
//               <th className="py-2 px-4">Rank</th>
//               <th className="py-2 px-4">Symbol</th>
//               <th className="py-2 px-4">Price ($)</th>
//               <th className="py-2 px-4">VGM Score</th>
//               <th className="py-2 px-4">Target Price ($)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {stocks.map((stock:Stock, index) => (
//               <tr key={stock.symbol} className="border-t border-gray-700">
//                 <td className="py-2 px-4">{index + 1}</td>
//                 <td className="py-2 px-4">{stock.symbol}</td>
//                 <td className="py-2 px-4">${stock.price.toFixed(2)}</td>
//                 <td className="py-2 px-4">{stock.vgmScore.toFixed(2)}</td>
//                 <td className="py-2 px-4">${stock.targetPrice.toFixed(2)}</td>
//               </tr>
//             ))} */}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
