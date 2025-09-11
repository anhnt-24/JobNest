// src/redis/redis.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });

    this.client.on('connect', () => {
      console.log('🔌 Redis connected');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async set(key: string, value: any, ttlSeconds?: number) {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, val, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, val);
    }
  }

  async get(key: string): Promise<string | null> {
    const val = await this.client.get(key);
    return val;
  }

  async del(key: string) {
    await this.client.del(key);
  }

  getClient(): Redis {
    return this.client;
  }
}
