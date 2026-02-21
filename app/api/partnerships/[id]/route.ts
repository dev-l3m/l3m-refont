import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { status, notes } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (status === "reviewed" || status === "contacted") {
      updateData.reviewedAt = new Date();
      updateData.reviewedBy = session.id;
    }

    const partnershipRequest = await prisma.partnershipRequest.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(partnershipRequest);
  } catch (error) {
    console.error("Error updating partnership request:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await prisma.partnershipRequest.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Demande supprimée avec succès" });
  } catch (error) {
    console.error("Error deleting partnership request:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression" },
      { status: 500 }
    );
  }
}
