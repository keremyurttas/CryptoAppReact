import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToInventory,
  updateOwnedAmount,
} from "../state/currency/currencySlice";
import Swal from "sweetalert2";

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
    return price > 1 && !isNaN(price) ? price.toFixed(2) : price.toString();
  }

  const handleConfirmation = async (action: () => void, message: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        action();
      } else {
        console.log("User canceled");
      }
    } catch (error) {
      console.error("Error displaying SweetAlert2", error);
    }
  };

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
                handleConfirmation(
                  () =>
                    dispatch(
                      updateOwnedAmount({
                        symbol,
                        ownedAmount: amountInput,
                      })
                    ),
                  `You are updating ${symbol} count to ${amountInput}.`
                );
              }}
              className="custom-button bg-purple-300"
            >
              Update
            </button>
            <button
              onClick={() => {
                handleConfirmation(
                  () => dispatch(updateOwnedAmount({ symbol, ownedAmount: 0 })),
                  `You are removing ${symbol} from your inventory.`
                );
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
                amountInput > 0 &&
                  handleConfirmation(
                    () =>
                      dispatch(
                        addToInventory({
                          symbol,
                          ownedAmount: amountInput,
                          price,
                        })
                      ),
                    `You are adding ${amountInput} ${symbol} to inventory`
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
