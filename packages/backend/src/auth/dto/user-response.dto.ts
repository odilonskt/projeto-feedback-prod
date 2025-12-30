export class UserReponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  profile?: {
    imageUrl?: string;
    bio?: string;
    phone?: string;
    website?: string;
  };
  createdAt: Date;
}
