import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import Toggle from "./Toggle";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

//styled
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 20vh;
  max-width: 480px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  width: 400px;
  display: flex;
  align-items: center;
`;
const BackBtn = styled.button`
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  border: none;
  padding: 5px;
  margin-left: 10px;
  font-style: italic;
  cursor: pointer;
  width: 50px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
//header
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.tabColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.tabColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

//I
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

interface ICoinProps {}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;

  //두가지 정보가 필요해서 다른 이름으로 데이터 로딩 넘겨줘야함
  //argument 필요할때 ()=>fn(argument)

  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      // console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      // console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); //시작시 데이터 받아와지면 실행 안되면 true로 글귀나오는중
    })();
  }, [coinId]); //어차피 안변함 params */

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </Title>
        <Toggle />
        <Link to={"/"}>
          <BackBtn>Back</BackBtn>
        </Link>
        {/* home 안 거쳐 오면 state가 undefined여서 state가 false일때 */}
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(5)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
