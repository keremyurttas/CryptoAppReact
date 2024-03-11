import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToInventory,
  updateOwnedAmount,
} from "../state/currency/currencySlice";

interface CryptoCurrencyProps {
  symbol: string;
  price: number;
  ownedAmount: number;
}

const CryptoCurrency: React.FC<CryptoCurrencyProps> = ({
  symbol,
  price,
  ownedAmount,
}) => {
  const [amountInput, setAmountInput] = useState<number>(ownedAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    setAmountInput(ownedAmount);
  }, [ownedAmount]);

  function formatNumber(price: number) {
    const number = Number(price);
    if (number >= 1 || number <= -1) {
      // For numbers greater than or equal to 1 (or less than or equal to -1)
      return number.toFixed(2); // Show 2 decimal places
    } else {
      // For numbers between 0 and 1 (exclusive)
      return number.toString(); // Show all decimal places
    }
  }

  return (
    <section className="md:p-4 px-2 py-3 border flex rounded-lg justify-between w-full items-center relative">
      <div>
        <h1>{symbol}</h1>
        <p className=""> {formatNumber(price)}</p>
      </div>
      <div className="flex items-center justify-between md:w-2/5 gap-1">
        <input
          className="rounded-md border-2 p-2 w-16 border-black relative h-8"
          type="number"
          name=""
          id=""
          value={amountInput}
          onChange={(e) => {
            const inputValue = parseFloat(e.target.value);
            // Check if the parsed value is a valid number
            if (!isNaN(inputValue)) {
              setAmountInput(inputValue);
            }
          }}
          min="0"
        />
        {ownedAmount > 0 ? (
          <div className="md:gap-4 flex gap-1 ">
            <button
              onClick={() => {
                typeof amountInput === "number" && !isNaN(amountInput)
                  ? dispatch(
                      updateOwnedAmount({ symbol, ownedAmount: amountInput })
                    )
                  : alert("Check the amount");
              }}
              className="custom-button bg-purple-300"
            >
              Update
            </button>
            <button
              onClick={() => {
                dispatch(updateOwnedAmount({ symbol, ownedAmount: 0 }));
                setAmountInput(0);
              }}
              className="custom-button bg-red-500"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                dispatch(
                  addToInventory({ symbol, ownedAmount: amountInput, price })
                );
              }}
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
