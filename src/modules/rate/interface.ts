import { Rate } from './schema';

export enum CoinEnum {
  bitcoin = 'bitcoin',
  ethereum = 'ethereum',
}

export type CoinType = keyof typeof CoinEnum;

export type IRate = Rate & { _id?: string; id?: string };

export enum RateSourceEnum {
  COINBASE = 'COINBASE',
  COINGECKO = 'COINGECKO',
  COINMARKETCAP = 'COINMARKETCAP',
  'CRYPTO-COMPARE' = 'CRYPTO-COMPARE',
  'COIN-DESK' = 'COIN-DESK',
}

export type RateSourceType = keyof typeof RateSourceEnum;
