// import Image from "next/image";
// import { Inter } from "next/font/google";
import CryptoPopup from "@/components/CryptoPopup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { fetchData } from "../state/currency/currencySlice";
import CryptoCurrency from "@/components/CryptoCurrency";

export default function Home() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  // const currency = useSelector((state)=>state.)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const inventory = useSelector(
    (state: RootState) => state.currencySlice
  ).inventory;
  return (
    <section className="h-screen w-screen container md:mx-auto py-4 md:py-20 px-4">
      {isPopupActive && (
        <CryptoPopup onClose={() => setIsPopupActive(false)}></CryptoPopup>
      )}
      {/* <button onClick={() => }>Test</button> */}

      <div className="flex gap-4 w-full border-gray-500 border-b-2 py-4 text-white">
        <button
          onClick={() => setIsPopupActive(true)}
          className="custom-button bg-blue-600"
        >
          Add / Update
        </button>
        <button className="custom-button bg-blue-600">Refresh</button>
      </div>
      {inventory.map((currency) => (
        
        <CryptoCurrency
          symbol={currency.symbol}
          price={currency.price}
          ownedAmount={currency.ownedAmount}
          key={currency.symbol}
        />
       
      ))}
    </section>
  );
}
