import { RootState } from "@/state/store";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function ChartSide() {
  const state = useSelector((state: RootState) => state.currencySlice);
  function getChartData() {
    return [
      ["Currencies", "values"],
      ...state.inventory.map((ownedCurrency) => [
        ownedCurrency.symbol,
        Number(ownedCurrency.price) * ownedCurrency.ownedAmount,
      ]),
    ];
  }
  const chartOptions = {
    title: "Currencies Distribution Chart",
    is3D: true,
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

  return (
    <>
      <Chart
        chartType="PieChart"
        data={getChartData()}
        width={"100%"}
        height={"100%"}
        options={chartOptions}
      />
    </>
  );
}
