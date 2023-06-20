import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { dataSourceOptions } from './database/dataSource';
import { PermissionGuard } from './modules/auth/guards/permission.guard';
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
@Module({
  imports: [
    RoleModule,
    PermissionModule,
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: [envFileName],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
//
