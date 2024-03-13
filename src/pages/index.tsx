// import Image from "next/image";
// import { Inter } from "next/font/google";
import CryptoPopup from "@/components/CryptoPopup";
import ChartSide from "@/components/ChartSide";
import CryptoLoader from "@/loaders/CryptoLoader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import {
  fetchData,
  fetchInventoryFromLocalStorage,
} from "../state/currency/currencySlice";
import InventorySide from "@/components/InventorySide";
import {
  ChartSideSkeleton,
  CryptoCurrencySkeleton,
} from "@/components/CryptoSkeletons";

export default function Home() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchInventoryFromLocalStorage());
  }, [dispatch]);
  const { isLoading, inventory } = useSelector(
    (state: RootState) => state.currencySlice
  );

  return (
    <section className="h-screen w-screen container md:mx-auto py-4 md:py-20 px-2">
      {isLoading && <CryptoLoader />}
      {isPopupActive && (
        <CryptoPopup onClose={() => setIsPopupActive(false)}></CryptoPopup>
      )}
      {/* <button onClick={() => }>Test</button> */}

      <div className="flex gap-4 w-full border-gray-500 border-b-2 py-4 text-white">
        <button
          onClick={() => setIsPopupActive(true)}
          className={`custom-button bg-blue-600 ${
            inventory.length === 0 ? "animate-pulse" : ""
          }`}
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
          {inventory.length > 0 ? (
            <InventorySide />
          ) : (
            <CryptoCurrencySkeleton />
          )}
        </div>
        <div className="md:block hidden w-0.5 h-full bg-gray-500 "></div>

        <div className="flex-1">
          {inventory.length > 0 ? <ChartSide /> : <ChartSideSkeleton />}
        </div>
      </div>
    </section>
  );
}
