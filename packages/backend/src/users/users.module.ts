import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CloudinaryService } from '../shared/cloudinary.service';
import { MulterConfigModule } from '../shared/multer-config.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// Importe apenas se for usar Cloudinary
// import { CloudinaryService } from '../shared/cloudinary.service';

@Module({
  controllers: [UsersController, MulterConfigModule],
  providers: [
    UsersService,
    PrismaService,
    CloudinaryService,
    UsersController, // Descomente se for usar
  ],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
