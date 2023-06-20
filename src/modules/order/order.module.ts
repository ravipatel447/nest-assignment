import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderDetails } from 'src/database/entities';
import { AuthModule } from '../auth/auth.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetails]),
    AuthModule,
    CartModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
