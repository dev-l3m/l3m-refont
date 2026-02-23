import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Empêcher la suppression de soi-même
    if (user.id === params.id) {
      const badRequestResponse = NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
      badRequestResponse.headers.set("X-Scroll-To-Top", "true");
      return badRequestResponse;
    }

    await prisma.user.delete({
      where: { id: params.id },
    });

    const response = NextResponse.json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
    response.headers.set("X-Scroll-To-Top", "true");
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    const errorResponse = NextResponse.json(
      { error: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    );
    errorResponse.headers.set("X-Scroll-To-Top", "true");
    return errorResponse;
  }
}
