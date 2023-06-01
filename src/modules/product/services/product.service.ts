import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem, Product, User } from 'src/database/entities';
import { productMessages } from 'src/messages/product.message';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../Dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
  ) {}

  async create(data: CreateProductDto, seller: User) {
    const product = this.productRepo.create({ ...data, seller });
    await this.productRepo.save(product);
    return {
      message: productMessages.success.PRODUCT_CREATE_SUCCESS,
      data: {
        product,
      },
    };
  }

  async update(productId: number, data: UpdateProductDto, user: User) {
    const product = await this.findProductById(productId, {
      sellerId: user.userId,
    });
    Object.assign(product, data);
    await this.productRepo.save(product);
    return {
      message: productMessages.success.PRODUCT_UPDATION_SUCCESS,
      data: {
        product,
      },
    };
  }

  async delete(productId: number, user: User) {
    const product = await this.findProductById(productId, {
      sellerId: user.userId,
    });
    const cartItems = await this.cartItemRepo.findBy({
      productId: product.productId,
    });
    await this.cartItemRepo.remove(cartItems);
    await this.productRepo.softRemove(product);
    return {
      message: productMessages.success.PRODUCT_DELETE_SUCCESS,
      data: {},
    };
  }

  async findProductById(productId: number, filters?: Partial<Product>) {
    const product = await this.productRepo.findOneBy({ productId, ...filters });
    if (!product) {
      throw new NotFoundException(productMessages.error.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async findProducts(skip: number, take: number) {
    const products = this.productRepo.find({ skip, take });
    return {
      message: productMessages.success.PRODUCTS_FETCH_SUCCESS,
      data: { products },
    };
  }
}
