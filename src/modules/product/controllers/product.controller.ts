import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateProductDto } from '../Dtos/create-product.dto';
import { ProductService } from '../services/product.service';
import { UpdateProductDto } from '../Dtos';
import { Public, GetUser } from 'src/decorators';
import { User } from 'src/database/entities';
import { GetProductsDto } from '../Dtos/getProducts.dto';
import { productMessages } from 'src/messages/product.message';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  @Public()
  getProducts(@Query() query: GetProductsDto) {
    const skip = query.page ? query.limit * (query.page - 1) : 0;
    const limit = query.limit ? query.limit : 50;
    return this.productService.findProducts(skip, limit);
  }

  @Post()
  createProduct(@GetUser() user: User, @Body() body: CreateProductDto) {
    return this.productService.create(body, user);
  }

  @Put(':id')
  updateProduct(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body, user);
  }

  @Delete(':id')
  deleteProduct(@GetUser() user: User, @Param('id') id: number) {
    return this.productService.delete(id, user);
  }

  @Public()
  @Get(':id')
  async getProduct(@Param('id') id: number) {
    const product = await this.productService.findProductById(id);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }
}
