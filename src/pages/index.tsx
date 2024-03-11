// import Image from "next/image";
// import { Inter } from "next/font/google";
import CryptoPopup from "@/components/CryptoPopup";
import ChartSide from "@/components/ChartSide";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import {
  fetchData,
  fetchInventoryFromLocalStorage,
} from "../state/currency/currencySlice";
import InventorySide from "@/components/InventorySide";
export default function Home() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  // const currency = useSelector((state)=>state.)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchInventoryFromLocalStorage());
  }, [dispatch]);

  return (
    <section className="h-screen w-screen container md:mx-auto py-4 md:py-20 px-2">
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
        <button
          onClick={() => dispatch(fetchData())}
          className="custom-button bg-blue-600"
        >
          Refresh
        </button>
      </div>
      <div className="md:flex pt-16 md:h-[85%] space-y-10 md:space-y-0">
        <div className="flex-1 ">
          <InventorySide />
        </div>
        <div className="md:block hidden w-0.5 h-full bg-gray-500 "></div>

        <div className="flex-1">
          <ChartSide />
        </div>
      </div>
    </section>
  );
}
