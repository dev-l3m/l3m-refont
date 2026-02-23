import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = await getSessionUser(request);
    
    if (!user || user.role !== "admin") {
      const forbiddenResponse = NextResponse.json(
        { error: "Accès refusé" },
        { status: 403 }
      );
      forbiddenResponse.headers.set("X-Scroll-To-Top", "true");
      return forbiddenResponse;
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = NextResponse.json({ users });
    response.headers.set("X-Scroll-To-Top", "true");
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    const errorResponse = NextResponse.json(
      { error: "Erreur lors de la récupération des utilisateurs" },
      { status: 500 }
    );
    errorResponse.headers.set("X-Scroll-To-Top", "true");
    return errorResponse;
  }
}
