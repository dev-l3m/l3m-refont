import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointmentRequest.findUnique({
      where: { id: params.id },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Demande non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment request:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const appointment = await prisma.appointmentRequest.update({
      where: { id: params.id },
      data: {
        status: body.status,
        notes: body.notes,
        reviewedAt: body.status !== "pending" ? new Date() : null,
        reviewedBy: body.reviewedBy || null,
      },
    });

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment request:", error);
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
    await prisma.appointmentRequest.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Demande supprimée avec succès",
    });
  } catch (error) {
    console.error("Error deleting appointment request:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression" },
      { status: 500 }
    );
  }
}
