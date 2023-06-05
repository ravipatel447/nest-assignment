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
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
@ApiBadRequestResponse({ description: 'bad request' })
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @Public()
  @ApiAcceptedResponse({ description: 'products fetched successfully' })
  getProducts(@Query() query: GetProductsDto) {
    const skip = query.page ? query.limit * (query.page - 1) : 0;
    const limit = query.limit ? query.limit : 50;
    return this.productService.findProducts(skip, limit);
  }

  @RequirePermissions(PermissionsEnum.Product, 'read', 'OWNER')
  @ApiAcceptedResponse({ description: 'product fetched successfully' })
  @Get('my')
  async getMyProducts(@GetUser() user: User) {
    const product = await this.productService.findUsersProducts(user.userId);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }

  @Post()
  @ApiCreatedResponse({ description: 'product created successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'create')
  createProduct(@GetUser() user: User, @Body() body: CreateProductDto) {
    return this.productService.create(body, user);
  }

  @Put('my/:id')
  @ApiAcceptedResponse({ description: 'product updated successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'update', 'OWNER')
  updateMyProduct(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body, user);
  }

  @Put(':id')
  @ApiAcceptedResponse({ description: 'product updated successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'update')
  updateProduct(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body, user, true);
  }

  @Delete('my/:id')
  @ApiAcceptedResponse({ description: 'product deleted successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'delete', 'OWNER')
  deleteMyProduct(@GetUser() user: User, @Param('id') id: number) {
    return this.productService.delete(id, user);
  }

  @Delete(':id')
  @ApiAcceptedResponse({ description: 'product deleted successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'delete')
  deleteProduct(@GetUser() user: User, @Param('id') id: number) {
    return this.productService.delete(id, user, true);
  }

  @Public()
  @Get(':id')
  @ApiAcceptedResponse({ description: 'products fetched successfully' })
  async getProduct(@Param('id') id: number) {
    const product = await this.productService.findProductById(id);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }

  @Public()
  @Get('seller/:id')
  @ApiAcceptedResponse({ description: 'products fetched successfully' })
  async getProductsOfUser(@Param('id') id: number) {
    const product = await this.productService.findUsersProducts(id);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }
}
