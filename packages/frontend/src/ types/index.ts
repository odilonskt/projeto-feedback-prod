export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar?: File;
}
