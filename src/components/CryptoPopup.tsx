import CryptoCurrency from "./CryptoCurrency";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
interface CrytopPopupProps {
  onClose: () => void;
}

const CryptoPopup: React.FC<CrytopPopupProps> = ({ onClose }) => {
  const currencies = useSelector(
    (state: RootState) => state.currencySlice
  ).allCurrencies;
  const inventory = useSelector(
    (state: RootState) => state.currencySlice
  ).inventory;
  // console.log(currencies.slice());
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
        />

        <div className="space-y-4 overflow-auto h-[80%]">
          {/* {Object.values(currencies) + 'asdsad'} */}

          {currencies.map((element, index: number) => (
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
