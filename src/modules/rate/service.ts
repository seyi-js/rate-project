import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Rate, RateDocument } from './schema';
import { CoinType, IRate, RateSourceType } from './interface';
import { UtilityService } from '../utility/service';
import { Logger } from '@nestjs/common';

@Injectable()
export class RateService {
  constructor(
    @InjectModel(Rate.name) private readonly rateModel?: Model<RateDocument>,
    private readonly httpService?: HttpService,
    private readonly utilityService?: UtilityService,
  ) {}

  logger: Logger = new Logger('RateService');

  async saveRate(coin: CoinType) {
    this.logger.log(`saveRate() called with coin: ${coin}`);

    const cryptoCompareRate = await this.getRateFromCryptoCompare(coin);

    const coingeckoRate = await this.getRateFromCoingecko(coin);

    if (cryptoCompareRate < coingeckoRate) {
      return await this.createRate(coin, cryptoCompareRate, 'CRYPTO-COMPARE');
    }

    return await this.createRate(coin, coingeckoRate, 'COINGECKO');
  }

  async findOne(coin: CoinType): Promise<RateDocument> {
    return await this.rateModel.findOne({ coin });
  }

  async updateRate(
    coin: CoinType,
    rate: number,
    source: RateSourceType,
  ): Promise<RateDocument> {
    return await this.rateModel.findOneAndUpdate(
      { coin },
      { rate, source },
      { new: true },
    );
  }

  async createRate(
    coin: CoinType,
    rate: number,
    source: RateSourceType,
  ): Promise<RateDocument> {
    const rateModel = new this.rateModel({ coin, rate, source });

    return await rateModel.save();
  }

  async find(filter: Partial<IRate>, query = {}): Promise<RateDocument[]> {
    const rates = await this.utilityService.APIQuery(
      this.rateModel.find(filter),
      query,
    );
    return rates;
  }

  async getRateFromCoingecko(coin: CoinType): Promise<number> {
    const { data } = await this.httpService
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=ngn`,
      )
      .toPromise();
    return data[coin].ngn;
  }

  async getRateFromCoinDesk(coin: CoinType): Promise<number> {
    const { data } = await this.httpService
      .get(
        `https://api.coindesk.com/v1/bpi/currentPrice/${
          coin === 'bitcoin' ? 'BTC' : 'ETH'
        }.json`,
      )
      .toPromise();

    return data.bpi.USD.rate_float;
  }

  async getRateFromCryptoCompare(coin: CoinType): Promise<number> {
    const { data } = await this.httpService
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=${
          coin === 'bitcoin' ? 'BTC' : 'ETH'
        }&tsyms=NGN`,
      )
      .toPromise();

    return data.NGN;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async pullRates() {
    await this.saveRate('bitcoin');
    await this.saveRate('ethereum');
  }
}
