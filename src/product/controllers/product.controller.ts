import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('product')
export class ProductController {
  constructor(private configService: ConfigService) {
    console.log(this.configService.get('db.port'));
  }
}
