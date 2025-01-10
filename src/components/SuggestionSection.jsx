import { useState, useEffect } from "react";
import axios from "axios";

function SuggestionSection() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        setCryptoData(response.data.coins);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-white h-max mt-10 lg:p-14 p-8">
      <div>
        <div className="text-[#202020] text-2xl font-semibold">
          You May Also Like
        </div>

        <div className="mt-4 flex justify-between overflow-x-scroll overflow-auto">
          {cryptoData.slice(0, 5).map((crypto, index) => (
            <CryptoCard key={index} cryptoData={crypto} />
          ))}
        </div>

        <div className="text-[#202020] text-2xl font-semibold mt-6">
          Trending Coins
        </div>
        <div className="mt-4 flex justify-between overflow-x-auto">
          {cryptoData.slice(1, 6).map((crypto, index) => (
            <CryptoCard key={index} cryptoData={crypto} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CryptoCard({ cryptoData }) {
  const { item } = cryptoData;
  const { name, large, sparkline, current_price, price_change_percentage_24h } = item;

  return (
    <div className="lg:w-[300px] rounded-2xl p-5 border-2 my-2 mr-2">
      <div className="flex items-center space-x-2">
        <img
          src={large}
          alt={name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-[16px] font-normal">{name}</span>
        <span
          className={`text-${
            price_change_percentage_24h > 0 ? "green" : "red"
          }-500 bg-${
            price_change_percentage_24h > 0 ? "#0AB27D" : "#FF0000"
          }/10 text-xs font-normal pr-10`}
        >
          {price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
      <div className="text-xl text-[#171717] font-medium mt-2">
        ${current_price.toLocaleString()}
      </div>
      {/* Display the sparkline chart image */}
      <img
        src={sparkline ? sparkline[0] : "https://www.coingecko.com/coins/33566/sparkline.svg"}
        alt={name}
        className="w-full h-20"
      />
    </div>
  );
}

export default SuggestionSection;
