import { Test, TestingModule } from '@nestjs/testing';
import { RateService } from '../service';
import { AppModule } from '../../../app.module';

describe('RateService', () => {
  let service: RateService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<RateService>(RateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRate from API', () => {
    it('should return rate of btc from coingecko', async () => {
      const rate = await service.getRateFromCoingecko('bitcoin');
      expect(rate).toBeGreaterThan(0);
    });

    it('should return rate of btc from crypto compare', async () => {
      const rate = await service.getRateFromCryptoCompare('bitcoin');
      expect(rate).toBeGreaterThan(0);
    });
  });

  describe('save rate', () => {
    it('should save the lowest rate', async () => {
      const rate = await service.saveRate('bitcoin');

      expect(rate).toBeDefined();
    });
  });
});
