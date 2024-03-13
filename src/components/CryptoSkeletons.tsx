function ChartSideSkeleton() {
  return (
    <div className="lg:px-36 lg:py-20 sm:p-12 space-y-8 w-full lg:block flex justify-center items-center flex-col">
      <div className="w-[44%] bg-gray-300 h-5"></div>
      <div className="bg-gray-300 md:w-[90%] w-[30%] aspect-square rounded-full"></div>
    </div>
  );
}
function CryptoCurrencySkeleton() {
  return (
    <div className="space-y-2 max-w-[95%]">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="p-3 border flex rounded-lg justify-between w-full items-center relative"
        >
          <div>
            <div className="bg-gray-300 md:w-24 w-16 h-6 mb-2"></div>
            <div className="bg-gray-300 md:w-24 w-16 h-3"></div>
          </div>
          <div className="flex md:gap-12 gap-6 items-center justify-between">
            <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
            <div className="gap-4 flex">
              <div className="custom-button bg-gray-300 text-gray-300">
                Remove
              </div>
              <div className="custom-button bg-gray-300 text-gray-300">
                Update
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { CryptoCurrencySkeleton, ChartSideSkeleton };
