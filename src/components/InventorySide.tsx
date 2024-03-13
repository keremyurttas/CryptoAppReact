import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

import CryptoCurrency from "./CryptoCurrency";

export default function InventorySide() {
  const { inventory } = useSelector((state: RootState) => state.currencySlice);

  return (
    <div className="space-y-2 overflow-auto md:h-[100%] min:h-[20%] md:max-w-[95%] h-[400px]">
      {inventory.map(({ symbol, price, ownedAmount }) => (
        <CryptoCurrency
          symbol={symbol}
          price={price}
          ownedAmount={ownedAmount}
          key={symbol}
        />
      ))}
    </div>
  );
}
