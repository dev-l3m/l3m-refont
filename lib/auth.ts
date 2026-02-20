import { NextRequest } from "next/server";
import { prisma } from "./prisma";
import * as bcrypt from "bcryptjs";

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export async function getSessionUser(request: NextRequest): Promise<SessionUser | null> {
  try {
    const token = request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return null;
    }

    // Décoder le token (simple base64 pour l'instant, à améliorer avec JWT)
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    const userId = decoded.userId;

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user || user.role !== "admin") {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
}

export function createSessionToken(userId: string): string {
  const payload = { userId, timestamp: Date.now() };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
