import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface ChartProps {
  coinId: string;
}

const PriceUl = styled.ul`
  padding: 0 5px;
`;
const PriceLi = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  span:first-child {
    text-transform: uppercase;
  }
  span:last-child {
    font-weight: bold;
    color: ${(prop) => prop.theme.accentColor};
  }
`;
function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart.."
      ) : (
        <PriceUl>
          <PriceLi>
            <span>PRICE</span>
            <span>${data?.quotes.USD.price.toFixed(2)}</span>
          </PriceLi>
          <PriceLi>
            <span>percent_change_24h</span>
            <span>{data?.quotes.USD.percent_change_24h.toFixed(2)}%</span>
          </PriceLi>
          <PriceLi>
            <span>percent_change_7d</span>
            <span>{data?.quotes.USD.percent_change_7d.toFixed(2)}%</span>
          </PriceLi>
          <PriceLi>
            <span>percent_change_30d</span>
            <span>{data?.quotes.USD.percent_change_30d.toFixed(2)}%</span>
          </PriceLi>
        </PriceUl>
      )}
    </div>
  );
}

export default Price;
