import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  private time = 900; //15min

  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key: string, value: any, ttl = this.time): Promise<any> {
    return await this.cache.set(key, value, { ttl });
  }

  async delete(key: string): Promise<any> {
    return await this.cache.del(key);
  }
}
