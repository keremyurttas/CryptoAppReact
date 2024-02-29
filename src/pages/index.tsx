// import Image from "next/image";
// import { Inter } from "next/font/google";
import CryptoCurrency from "../components/CryptoCurrency";
import CryptoPopup from "@/components/CryptoPopup";
import { useState } from "react";

export default function Home() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  return (
    <section className="h-screen w-screen container md:mx-auto py-4 md:py-20 px-4">
      {isPopupActive && <CryptoPopup onClose={()=>setIsPopupActive(false)}></CryptoPopup>}

      <div className="flex gap-4 w-full border-gray-500 border-b-2 py-4 text-white">
        <button
          onClick={() => setIsPopupActive(true)}
          className="custom-button bg-blue-600"
        >
          Add / Update
        </button>
        <button className="custom-button bg-blue-600">Refresh</button>
      </div>
      <CryptoCurrency isOwned={false}></CryptoCurrency>
    </section>
  );
}
