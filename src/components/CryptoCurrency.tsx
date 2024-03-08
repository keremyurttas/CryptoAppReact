import { useState } from "react";

interface CryptoCurrencyProps {
  symbol: string;
  price: string;
  amount: number;
}

const CryptoCurrency: React.FC<CryptoCurrencyProps> = ({
  symbol,
  price,
  amount,
}) => {
  const [amountInput, setAmountInput] = useState<number>(amount);
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
        {amount > 0 ? (
          <div className="gap-4 flex">
            <button className="custom-button bg-purple-300">Update</button>
            <button className="custom-button bg-red-500">Remove</button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button className="custom-button bg-green-500">Add</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CryptoCurrency;
