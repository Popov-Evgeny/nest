import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(): Promise<ProductDocument[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/products' }),
  )
  @HttpCode(HttpStatus.CREATED)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): string {
    void this.productsService.createProduct(createProductDto, file);
    return 'Created!';
  }

  @Put(':id')
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string): string {
    void this.productsService.removeProduct(id);
    return 'Deleted!';
  }
}
