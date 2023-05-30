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

  async create(data: CreateProductDto, sellerId: User) {
    const product = this.productRepo.create({ ...data, sellerId });
    return this.productRepo.save(product);
  }

  async update(productId: number, data: UpdateProductDto) {
    const product = await this.findProductById(productId);
    Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async delete(productId: number) {
    const product = await this.findProductById(productId);
    return this.productRepo.remove(product);
  }

  async findProductById(productId: number) {
    const product = await this.productRepo.findOneBy({ productId });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  async findProducts() {
    return this.productRepo.find({});
  }
}
