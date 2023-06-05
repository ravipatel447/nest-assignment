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
import { RequirePermissions } from 'src/decorators/requirePermission.decorator';
import { PermissionsEnum } from 'src/constants';

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

  @RequirePermissions(PermissionsEnum.Product, 'read', 'OWNER')
  @Get('my')
  async getMyProducts(@GetUser() user: User) {
    const product = await this.productService.findUsersProducts(user.userId);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }

  @Post()
  @RequirePermissions(PermissionsEnum.Product, 'create')
  createProduct(@GetUser() user: User, @Body() body: CreateProductDto) {
    return this.productService.create(body, user);
  }

  @Put('my/:id')
  @RequirePermissions(PermissionsEnum.Product, 'update', 'OWNER')
  updateMyProduct(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body, user);
  }

  @Put(':id')
  @RequirePermissions(PermissionsEnum.Product, 'update')
  updateProduct(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body, user, true);
  }

  @Delete('my/:id')
  @RequirePermissions(PermissionsEnum.Product, 'delete', 'OWNER')
  deleteMyProduct(@GetUser() user: User, @Param('id') id: number) {
    return this.productService.delete(id, user);
  }

  @Delete(':id')
  @RequirePermissions(PermissionsEnum.Product, 'delete')
  deleteProduct(@GetUser() user: User, @Param('id') id: number) {
    return this.productService.delete(id, user, true);
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

  @Public()
  @Get('seller/:id')
  async getProductsOfUser(@Param('id') id: number) {
    const product = await this.productService.findUsersProducts(id);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }
}
