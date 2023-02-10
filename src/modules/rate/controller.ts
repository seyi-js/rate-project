import { Controller, Get, Query } from '@nestjs/common';
import { RateService } from './service';
import { IControllerSignature } from '../../shared/interfaces';

@Controller('rates')
export class RateController implements IControllerSignature<RateController> {
  constructor(private readonly rate: RateService) {}

  @Get('/')
  async getRates(@Query() query: any) {
    const rates = await this.rate.find({}, query);
    return {
      message: 'Rates fetched successfully',
      data: rates,
    };
  }
}
