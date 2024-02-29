interface CryptoCurrencyProps {
  isOwned: boolean;
}

const CryptoCurrency: React.FC<CryptoCurrencyProps> = ({ isOwned }) => {
  return (
    <section className="p-4 border flex rounded-lg justify-between w-full items-center relative">
      <div>
        <h1>ETHBTC</h1>
        <span> 0.05608000</span>
      </div>
      <div className="flex items-center justify-between w-1/3">
        <input
          className="rounded-md w-16 border-2 px-4 border-black relative h-8"
          type="number"
          name=""
          id=""
          min="0"
        />
        {isOwned ? (
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
