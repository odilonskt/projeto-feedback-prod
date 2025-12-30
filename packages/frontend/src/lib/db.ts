import bcrypt from "bcrypt";
import { User } from "../ types";

const users: User[] = [];

export async function createUser(userData: {
  avatar: string | undefined;
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  // Verificar se usuário já existe

  const existingUser = users.find((user) => user.email === userData.email);
  if (existingUser) {
    throw new Error("Usuário já existe");
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    name: userData.name,
    avatar: userData.avatar,
    createdAt: new Date(),
  };

  users.push({ ...newUser, password: hashedPassword } as any);

  return newUser;
}

export async function verifyUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = users.find((u) => u.email === email) as any;
  if (!user || !user.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserById(id: string): Promise<User | null> {
  const user = users.find((u) => u.id === id) as any;
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
