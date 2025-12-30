import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    avatar?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (avatar) {
      imageUrl = await this.handleAvatarUpload(avatar);
    }

    const profile = await this.prisma.userProfile.upsert({
      where: { userId: updateProfileDto.userId },
      update: {
        bio: updateProfileDto.bio,
        phone: updateProfileDto.phone,
        website: updateProfileDto.website,
        ...(imageUrl && { imageUrl }),
      },
      create: {
        userId: updateProfileDto.userId,
        bio: updateProfileDto.bio,
        phone: updateProfileDto.phone,
        website: updateProfileDto.website,
        ...(imageUrl && { imageUrl }),
      },
    });

    return profile;
  }

  private async handleAvatarUpload(file: Express.Multer.File): Promise<string> {
    // Verificar se o arquivo existe
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Validar tipo
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não suportado');
    }

    // Validar tamanho (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande (máximo 5MB)');
    }

    // Salvar arquivo
    const { createWriteStream, mkdirSync, existsSync } = await import('fs');
    const { join } = await import('path');

    const uploadDir = 'uploads/avatars';

    // Criar diretório se não existir
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Gerar nome único
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.originalname.split('.').pop() || 'jpg';
    const fileName = `avatar-${timestamp}-${randomString}.${fileExtension.toLowerCase()}`;
    const filePath = join(uploadDir, fileName);

    // Salvar o arquivo
    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      writeStream.write(file.buffer);
      writeStream.end();
      writeStream.on('finish', () => resolve());
      writeStream.on('error', reject);
    });

    return `/uploads/avatars/${fileName}`;
  }
}
