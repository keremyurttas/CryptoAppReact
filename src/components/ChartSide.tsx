import { RootState } from "@/state/store";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function ChartSide() {
  // const state = useSelector((state: RootState) => state.currencySlice);
  const { inventory } = useSelector((state: RootState) => state.currencySlice);

  // function getChartData() {
  //   return [
  //     ["Currencies", "values"],
  //     ...state.inventory.map((ownedCurrency) => [
  //       ownedCurrency.symbol,
  //       Number(ownedCurrency.price) * ownedCurrency.ownedAmount,
  //     ]),
  //   ];
  // }
  const chartData = [
    ["Currencies", "Values"],
    ...inventory.map((ownedCurrency) => [
      ownedCurrency.symbol,
      ownedCurrency.price * ownedCurrency.ownedAmount,
    ]),
  ];
  const chartOptions = {
    title: "Currencies Distribution Chart",
    hAxis: { title: "Age", minValue: 0, maxValue: 15 },
    vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    enableInteractivity: true,
    legend: { position: "none" },
  };
  return chartData.length > 1 ? (
    <Chart
      chartType="PieChart"
      data={chartData}
      width={"100%"}
      height={"100%"}
      options={chartOptions}
    />
  ) : null;
}
