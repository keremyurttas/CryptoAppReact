import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

interface Currency {
  ownedAmount: number;
  symbol: string;
  price: string;
}
interface InitialState {
  allCurrencies: Currency[];
  inventory: OwnedCurrency[];
}
interface OwnedCurrency {
  symbol: string;
  ownedAmount: number;
  price: string;
}
const initialState: InitialState = {
  inventory: [],
  allCurrencies: [],
};
// useEffect(() => {
//   initialState.allCurrencies = initialState.allCurrencies.map((curr: any) => {
//     const isOwned = initialState.inventory.find(
//       (ownedCurrency) => ownedCurrency.symbol === curr.symbol
//     );
//     return isOwned
//       ? {
//           price: curr.openPrice,
//           symbol: curr.symbol,
//           ownedAmount: isOwned.ownedAmount,
//         }
//       : {
//           price: curr.openPrice,
//           symbol: curr.symbol,
//         };
//   });
// }, [initialState.inventory]);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    addToInventory: (state, action: PayloadAction<OwnedCurrency>) => {
      const { symbol, ownedAmount, price } = action.payload;
      if (ownedAmount > 0) {
        const newCurrency: OwnedCurrency = { symbol, ownedAmount, price };
        state.inventory = [...state.inventory, newCurrency];
      }
    },
    updateOwnedAmount: (state, action) => {
      const { symbol, ownedAmount, price } = action.payload;
      const currencyToUpdateIndex = state.inventory.findIndex(
        (curr) => symbol == curr.symbol
      );
      if (ownedAmount === 0) {
        state.inventory = state.inventory.filter(
          (currency) => currency.symbol !== symbol
        );
      } else {
        // console.log(currencyToUpdate)
        state.inventory = state.inventory.map((currency, index) =>
          index === currencyToUpdateIndex
            ? { ...currency, ownedAmount }
            : currency
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, () => {
        console.log("waiting");
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.allCurrencies = action.payload.map((curr: any) => ({
          price: curr.openPrice,
          symbol: curr.symbol,
        }));
        // state.allCurrencies = action.payload.map((curr: any) => {
        //   const isOwned = state.inventory.find(
        //     (ownedCurrency) => ownedCurrency.symbol === curr.symbol
        //   );
        //   return isOwned
        //     ? {
        //         price: curr.openPrice,
        //         symbol: curr.symbol,
        //         ownedAmount: isOwned.ownedAmount,
        //       }
        //     : {
        //         price: curr.openPrice,
        //         symbol: curr.symbol,
        //       };
        // });
      });
  },
});

export const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await fetch("https://api2.binance.com/api/v3/ticker/24hr");
  if (!response.ok) {
    throw new Error("Failed to fetch data from Binance API");
  }

  const data = await response.json();

  return data;
});

export const { addToInventory, updateOwnedAmount } = currencySlice.actions;
export default currencySlice.reducer;
