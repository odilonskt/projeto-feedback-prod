import { BadRequestException, Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Interface para o arquivo do Multer
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
}

@Injectable()
export class FileUploadService {
  private readonly uploadDir = 'uploads/avatars';

  constructor() {
    // Criar diretório de uploads se não existir
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadAvatar(file: MulterFile): Promise<string> {
    // Validar tipo de arquivo
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de arquivo não suportado. Use JPEG, PNG, GIF ou WebP.',
      );
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande (máximo 5MB)');
    }

    // Gerar nome único
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = this.getFileExtension(file.originalname);
    const fileName = `avatar-${timestamp}-${randomString}${fileExtension}`;
    const filePath = join(this.uploadDir, fileName);

    // Salvar arquivo
    await this.saveFile(file.buffer, filePath);

    // Retornar caminho relativo
    return `/uploads/avatars/${fileName}`;
  }

  private getFileExtension(filename: string): string {
    const ext = filename.split('.').pop();
    return ext ? `.${ext.toLowerCase()}` : '.jpg';
  }

  private saveFile(buffer: Buffer, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const writeStream = createWriteStream(path);
      writeStream.write(buffer);
      writeStream.end();
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (error) => reject(error));
    });
  }

  async deleteFile(filename: string): Promise<void> {
    const fs = await import('fs/promises');
    const filePath = join(this.uploadDir, filename);

    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      // Ignora erro se arquivo não existir
      console.warn(`Arquivo não encontrado: ${filePath}`, error);
    }
  }
}
