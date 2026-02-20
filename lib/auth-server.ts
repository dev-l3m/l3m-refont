import { cookies } from "next/headers";
import { prisma } from "./prisma";

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export async function getServerSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    
    if (!token) {
      return null;
    }

    // Décoder le token
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
    console.error("Error getting server session:", error);
    return null;
  }
}
