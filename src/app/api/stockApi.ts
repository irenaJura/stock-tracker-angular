import { interval, scan, startWith, take } from 'rxjs';

export interface Stock {
  symbol: string; // id
  description: string;
  open: number; // static
  low: number; // dynamic
  high: number; // dynamic
  currentPrice: number; // dynamic
  change?: number;
}

export interface StockTransaction {
  bought: string;
  price: number;
}
export interface User {
  id: string;
  name: string;
  joined: Date;
}

const EMIT_RATE = 5000; // 5 seconds
const DATA_SIZE = 10000;
const BASE_STOCK_DATA: Stock[] = [
  {
    symbol: 'APPL',
    description: 'Apple',
    open: 273.93,
    high: 273.93,
    low: 270.93,
    currentPrice: 270.93,
  },
  {
    symbol: 'MSFT',
    description: 'Microsoft',
    open: 459.54,
    high: 460.54,
    low: 459.54,
    currentPrice: 460.54,
  },
  {
    symbol: 'AMZN',
    description: 'Amazon',
    open: 199.34,
    high: 199.34,
    low: 197.01,
    currentPrice: 198.65,
  },
  {
    symbol: 'NVDA',
    description: 'NVIDIA',
    open: 131.38,
    high: 133.65,
    low: 131.38,
    currentPrice: 131.69,
  },
  {
    symbol: 'GOOG',
    description: 'Alphabet',
    open: 190.44,
    low: 185.65,
    high: 190.44,
    currentPrice: 185.99,
  },
];
function generateStockChange(stock: Stock): Stock {
  const toDecrease = Math.random() < 0.5;
  const amountToChange = Math.random();
  const canDecrease = stock.currentPrice - amountToChange > 0;

  if (toDecrease && canDecrease) {
    const newPrice = stock.currentPrice - amountToChange;
    const newLow = newPrice < stock.low ? newPrice : stock.low;
    return {
      ...stock,
      currentPrice: newPrice,
      low: newLow,
    };
  }

  // increase
  const newPrice = stock.currentPrice + amountToChange;
  const newHigh = newPrice > stock.high ? newPrice : stock.high;

  return {
    ...stock,
    currentPrice: newPrice,
    high: newHigh,
  };
}

export function getStockDataObservable() {
  return interval(EMIT_RATE).pipe(
    startWith(0),
    scan((acc) => acc.map(generateStockChange), BASE_STOCK_DATA),
    take(DATA_SIZE) // complete observable
  );
}
