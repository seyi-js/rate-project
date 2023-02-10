import { Injectable } from '@nestjs/common';
import APIQueryFeatures from './APIQueryFeatures';

@Injectable()
export class UtilityService {
  async APIQuery(query: any, queryString: any) {
    return await new APIQueryFeatures(query, queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate().query;
  }
}
