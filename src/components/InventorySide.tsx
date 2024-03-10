import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

import CryptoCurrency from "./CryptoCurrency";

export default function InventorySide() {
  const inventory = useSelector(
    (state: RootState) => state.currencySlice
  ).inventory;
  const currencies = useSelector(
    (state: RootState) => state.currencySlice
  ).allCurrencies;

  function getCurrentPrice(symbol: string) {
    return currencies.find((curr) => curr.symbol == symbol)?.price || "0";
  }

  return (
    <>
      {inventory.map((currency) => (
        <CryptoCurrency
          symbol={currency.symbol}
          price={getCurrentPrice(currency.symbol)}
          ownedAmount={currency.ownedAmount}
          key={currency.symbol}
        />
      ))}
    </>
  );
}
