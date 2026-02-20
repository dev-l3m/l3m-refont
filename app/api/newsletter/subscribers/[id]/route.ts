import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { id } = params;

    await prisma.newsletterSubscriber.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Abonné supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { active } = body;

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: { active },
    });

    return NextResponse.json(
      { 
        message: subscriber.active 
          ? "Abonné activé avec succès" 
          : "Abonné désactivé avec succès",
        subscriber 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour" },
      { status: 500 }
    );
  }
}
