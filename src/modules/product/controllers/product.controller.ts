import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateProductDto } from '../Dtos/create-product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(
    private configService: ConfigService,
    private productService: ProductService,
  ) {}
  @Post()
  createProduct(@Req() req: Request, @Body() body: CreateProductDto) {
    return this.productService.create(body, req['user']);
  }
}
