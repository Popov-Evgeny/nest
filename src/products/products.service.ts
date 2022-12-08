import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async createProduct(data: CreateProductDto, file: Express.Multer.File) {
    const product = new this.productModel({
      title: data.title,
      description: data.description,
      price: data.price,
      image: file ? '/uploads/products/' + file.filename : null,
    });
    await product.save();
  }

  async updateProduct(id: string, data: CreateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true });
  }

  async removeProduct(id: string) {
    await this.productModel.findByIdAndRemove(id);
  }
}
