import CryptoCurrency from "./CryptoCurrency";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ChangeEvent, useState } from "react";
interface CrytopPopupProps {
  onClose: () => void;
}

const CryptoPopup: React.FC<CrytopPopupProps> = ({ onClose }) => {
  const [searchInput, setSearchInput] = useState("");

  const currencies = useSelector(
    (state: RootState) => state.currencySlice
  ).allCurrencies;
  const filteredCurrencies = currencies.filter((currency) =>
    currency.symbol
      .toLocaleLowerCase()
      .includes(searchInput.toLocaleLowerCase())
  );
  const inventory = useSelector(
    (state: RootState) => state.currencySlice
  ).inventory;
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  return (
    <section className="w-screen h-screen overflow-hidden flex items-center justify-center absolute top-0 right-0 z-10 p-2">
      <div className="bg-white md:w-[60%] h-[60%] rounded-lg border-black py-8 px-2 border md:p-20 relative container mx-auto z-20">
        <button
          onClick={onClose}
          className="bg-red-500 absolute top-0 right-0 md:w-10 md:h-10 w-6 h-6 custom-button"
        >
          x
        </button>

        <input
          placeholder="Search a cryptocurrency pair"
          type="text"
          className="w-full rounded-lg p-4 mb-4 border border-black"
          onChange={handleSearch}
          value={searchInput}
        />

        <div className="space-y-4 overflow-auto h-[80%]">
          {filteredCurrencies.map((element, index: number) => (
            <CryptoCurrency
              key={index}
              ownedAmount={
                inventory.find((ownedC) => ownedC.symbol == element.symbol)
                  ?.ownedAmount || 0
              }
              symbol={element.symbol}
              price={element.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default CryptoPopup;
