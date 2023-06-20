import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
let envFileName = '.env';
switch (process.env['NODE_ENV']) {
  case 'DEVELOPMENT':
    envFileName = '.dev.env';
    break;
  case 'TEST':
    envFileName = '.test.env';
    break;
  default:
    envFileName = '.env';
    break;
}
dotenv.config({ path: __dirname + '/../../' + envFileName });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'NestDbDev',
  synchronize: false,
  logging: true,
  entities: [__dirname + '/entities/index{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
