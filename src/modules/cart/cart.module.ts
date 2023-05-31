import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from 'src/database/entities';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
