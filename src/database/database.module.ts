import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DataSource } from 'typeorm';

const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: true,
        entities: [__dirname + '/entities/index{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      });
      return dataSource.initialize();
    },
  },
];

@Global()
@Module({
  providers: [DatabaseService, ...databaseProviders],
  exports: [DatabaseService, ...databaseProviders],
})
export class DatabaseModule {}
