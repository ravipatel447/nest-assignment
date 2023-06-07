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
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
@ApiBadRequestResponse({ description: 'bad request' })
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @Public()
  @ApiOkResponse({ description: 'products fetched successfully' })
  getProducts(@Query() query: GetProductsDto) {
    const skip = query.page ? query.limit * (query.page - 1) : 0;
    const limit = query.limit ? query.limit : 50;
    return this.productService.findProducts(skip, limit);
  }

  @Get('my')
  @ApiBearerAuth()
  @RequirePermissions(PermissionsEnum.Product, 'read', 'OWNER')
  @ApiOkResponse({ description: 'product fetched successfully' })
  async getMyProducts(@GetUser() user: User) {
    const product = await this.productService.findUsersProducts(user.userId);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'product created successfully',
    type: CreateProductDto,
  })
  @RequirePermissions(PermissionsEnum.Product, 'create')
  createProduct(@GetUser() user: User, @Body() body: CreateProductDto) {
    return this.productService.create(body, user);
  }

  @Put('my/:productId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'product updated successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'update', 'OWNER')
  updateMyProduct(
    @GetUser() user: User,
    @Param('productId') productId: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(productId, body, user);
  }

  @Put(':productId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'product updated successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'update')
  updateProduct(
    @GetUser() user: User,
    @Param('productId') productId: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(productId, body, user, true);
  }

  @Delete('my/:productId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'product deleted successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'delete', 'OWNER')
  deleteMyProduct(
    @GetUser() user: User,
    @Param('productId') productId: number,
  ) {
    return this.productService.delete(productId, user);
  }

  @Delete(':productId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'product deleted successfully' })
  @RequirePermissions(PermissionsEnum.Product, 'delete')
  deleteProduct(@GetUser() user: User, @Param('productId') productId: number) {
    return this.productService.delete(productId, user, true);
  }

  @Public()
  @Get(':productId')
  @ApiOkResponse({ description: 'products fetched successfully' })
  async getProduct(@Param('productId') productId: number) {
    const product = await this.productService.findProductById(productId);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }

  @Public()
  @Get('seller/:userId')
  @ApiOkResponse({ description: 'products fetched successfully' })
  async getProductsOfUser(@Param('userId') userId: number) {
    const product = await this.productService.findUsersProducts(userId);
    return {
      message: productMessages.success.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }
}
