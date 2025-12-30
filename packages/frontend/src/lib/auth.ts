import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return null;

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session:", error);
    return null;
  }
}

export async function createSession(userId: string, userData: any) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId,
    userData,
    expiresAt: expiresAt.toISOString(),
  });

  // CORREÇÃO AQUI: await antes de cookies()
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  try {
    // CORREÇÃO AQUI: await antes de cookies()
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) return null;
    return await decrypt(session);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function deleteSession() {
  try {
    // CORREÇÃO AQUI: await antes de cookies()
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (error) {
    console.error("Error deleting session:", error);
  }
}

// Helper function para obter o usuário atual
export async function getCurrentUser() {
  const session = await getSession();
  return session ? (session as any).userData : null;
}
