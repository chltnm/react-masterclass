import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface IChartProps {
  coinId: string;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart.."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => [
                price.time_close,
                price.open,
                price.high,
                price.low,
                price.close,
              ]),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: true },
            stroke: {
              width: 2.5,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
