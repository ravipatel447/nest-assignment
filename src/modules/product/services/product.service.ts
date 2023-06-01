import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../Dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateProductDto, seller: User) {
    const product = this.productRepo.create({ ...data, seller });
    return this.productRepo.save(product);
  }

  async update(productId: number, data: UpdateProductDto, user: User) {
    const product = await this.findProductById(productId, {
      sellerId: user.userId,
    });
    Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async delete(productId: number, user: User) {
    const product = await this.findProductById(productId, {
      sellerId: user.userId,
    });
    const productD = await this.productRepo.findOne({
      where: { productId },
      relations: ['cartItems'],
    });
    await this.productRepo
      .createQueryBuilder('product')
      .softDelete()
      .where('product.productId = :id', { id: product.productId })
      .execute();

    await this.productRepo.softRemove(productD);
    return 'Product Has been removed';
  }

  async findProductById(productId: number, filters?: Partial<Product>) {
    const product = await this.productRepo.findOneBy({ productId, ...filters });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  async findProducts() {
    return this.productRepo.find({});
  }
}
