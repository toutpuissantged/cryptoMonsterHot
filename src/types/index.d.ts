export interface fetchData {
  id: string;
  symbol: string;
  market_data: {
    current_price: {
      usd: number;
    };
  };
  image: {
    small: string;
    large: string;
  };
}

export interface res {
  data: fetchData[];
}
