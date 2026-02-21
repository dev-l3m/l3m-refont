import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function POST(
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

    const campaign = await prisma.newsletterCampaign.findUnique({
      where: { id: params.id },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campagne non trouvée" },
        { status: 404 }
      );
    }

    // Récupérer tous les abonnés actifs
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
    });

    // Ici, vous devriez intégrer avec un service d'email (Resend, SendGrid, etc.)
    // Pour l'instant, on simule l'envoi
    const sentCount = subscribers.length;

    // Mettre à jour la campagne
    await prisma.newsletterCampaign.update({
      where: { id: params.id },
      data: {
        status: "sent",
        sentAt: new Date(),
        sentCount,
      },
    });

    return NextResponse.json(
      { 
        message: `Newsletter envoyée à ${sentCount} abonnés`,
        sentCount 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending campaign:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi" },
      { status: 500 }
    );
  }
}
