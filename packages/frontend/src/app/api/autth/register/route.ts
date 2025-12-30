import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import sharp from "sharp";
import { createUser } from "../../../../lib/db";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const avatarFile = formData.get("avatar") as File | null;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let avatarPath: string | undefined;
    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      //Gerar nome único para o arquivo
      const fileName = `${randomBytes(16).toString("hex")}.webp`;
      const publicDir = join(process.cwd(), "public", "uploads");
      const filePath = join(publicDir, fileName);

      // Otimizar e salvar a imagem
      await sharp(buffer)
        .resize(400, 400, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(filePath);

      avatarPath = `/uploads/${fileName}`;
    }

    // Criar usuário no banco
    const user = await createUser({
      name,
      email,
      password,
      avatar: avatarPath,
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
