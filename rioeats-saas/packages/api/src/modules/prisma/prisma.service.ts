import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    
    // Log database connection
    console.log('✅ Connected to PostgreSQL database');
    
    // Enable query logging in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query', (e) => {
        console.log('Query: ' + e.query);
        console.log('Duration: ' + e.duration + 'ms');
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Disconnected from PostgreSQL database');
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    const models = Reflect.ownKeys(this).filter((key) => {
      return (
        key[0] !== '_' &&
        key !== 'queryRaw' &&
        key !== 'executeRaw' &&
        key !== 'onModuleInit' &&
        key !== 'onModuleDestroy'
      );
    });

    return Promise.all(
      models.map((modelKey) => {
        const model = this[modelKey];
        return model.deleteMany();
      }),
    );
  }
}