import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Currency {
  symbol: string;
  openPrice: string;
}
interface InitialState {
  allCurrencies: Currency[];
}

const initialState: InitialState = {
  allCurrencies: [],
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, () => {
        console.log("waiting");
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.allCurrencies = action.payload;
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
export default currencySlice.reducer;
