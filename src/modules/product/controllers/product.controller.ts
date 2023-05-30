import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateProductDto } from '../Dtos/create-product.dto';
import { ProductService } from '../services/product.service';
import { UpdateProductDto } from '../Dtos';
import { Public, GetUser } from 'src/decorators';
import { User } from 'src/database/entities';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  @Public()
  getProducts() {
    return this.productService.findProducts();
  }

  @Post()
  createProduct(@GetUser() user: User, @Body() body: CreateProductDto) {
    return this.productService.create(body, user);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Public()
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.findProductById(id);
  }
}
