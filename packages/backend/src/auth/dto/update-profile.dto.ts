import { IsOptional, IsString, IsUrl, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[\d\s-]+$/, {
    message: 'Phone number must be valid',
  })
  phone?: string;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'Website must be a valid URL',
    },
  )
  website?: string;
}
