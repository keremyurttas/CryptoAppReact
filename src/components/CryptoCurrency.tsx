import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToInventory,
  updateOwnedAmount,
} from "../state/currency/currencySlice";

interface CryptoCurrencyProps {
  symbol: string;
  price: string;
  ownedAmount: number;
}

const CryptoCurrency: React.FC<CryptoCurrencyProps> = ({
  symbol,
  price,
  ownedAmount,
}) => {
  const [amountInput, setAmountInput] = useState<number>(ownedAmount);
  const dispatch = useDispatch();

  return (
    <section className="p-4 border flex rounded-lg justify-between w-full items-center relative">
      <div>
        <h1>{symbol}</h1>
        <span> {price}</span>
      </div>
      <div className="flex items-center justify-between w-1/3">
        <input
          className="rounded-md w-16 border-2 px-4 border-black relative h-8"
          type="number"
          name=""
          id=""
          value={amountInput}
          onChange={(e) => setAmountInput(parseFloat(e.target.value))}
          min="0"
        />
        {ownedAmount > 0 ? (
          <div className="gap-4 flex">
            <button
              onClick={() =>
                dispatch(
                  updateOwnedAmount({ symbol, ownedAmount: amountInput })
                )
              }
              className="custom-button bg-purple-300"
            >
              Update
            </button>
            <button
              onClick={() =>
                dispatch(updateOwnedAmount({ symbol, ownedAmount: 0 }))
              }
              className="custom-button bg-red-500"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              onClick={() =>
                dispatch(
                  addToInventory({ symbol, ownedAmount: amountInput, price })
                )
              }
              className="custom-button bg-green-500"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CryptoCurrency;
