import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Currency {
  ownedAmount: number;
  symbol: string;
  price: number;
}
interface InitialState {
  allCurrencies: Currency[];
  inventory: OwnedCurrency[];
  isLoading: boolean;
}
interface OwnedCurrency {
  symbol: string;
  ownedAmount: number;
  price: number;
}

const initialState: InitialState = {
  inventory: [],
  allCurrencies: [],
  isLoading: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    fetchInventoryFromLocalStorage: (state) => {
      const storedInventory = localStorage.getItem("inventory");
      state.inventory = storedInventory ? JSON.parse(storedInventory) : [];
    },
    addToInventory: (state, action: PayloadAction<OwnedCurrency>) => {
      const { symbol, ownedAmount, price } = action.payload;
      if (ownedAmount > 0) {
        const newCurrency: OwnedCurrency = { symbol, ownedAmount, price };
        state.inventory = [...state.inventory, newCurrency];
        localStorage.setItem("inventory", JSON.stringify(state.inventory));
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
        state.inventory = state.inventory.map((currency, index) =>
          index === currencyToUpdateIndex
            ? { ...currency, ownedAmount }
            : currency
        );
      }
      localStorage.setItem("inventory", JSON.stringify(state.inventory));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.allCurrencies = action.payload.map((curr: any) => ({
          price: Number(curr.openPrice),
          symbol: curr.symbol,
        }));
        state.inventory = state.inventory.map((ownedCurrency) => {
          const currentPrice = state.allCurrencies.find(
            (currency) => ownedCurrency.symbol === currency.symbol
          )?.price;

          return { ...ownedCurrency, price: Number(currentPrice) };
        });
        state.isLoading = false;
      });
  },
});

export const fetchData = createAsyncThunk("fetchData", async () => {
  try {
    const response = await fetch("https://api2.binance.com/api/v3/ticker/24hr");
    if (!response.ok) {
      throw new Error("Failed to fetch data from Binance API");
    }

    const data = await response.json();

    return data.filter((currency: any) => currency.firstId !== -1);
  } catch (error) {
    throw error; // Re-throw the error to be handled by the caller
  }
});

export const {
  addToInventory,
  updateOwnedAmount,
  fetchInventoryFromLocalStorage,
} = currencySlice.actions;

export default currencySlice.reducer;
