import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nomComplet,
      email,
      telephone,
      typeProfil,
      objectifsInvestissement,
      budgetEstime,
      delaiMiseEnOeuvre,
      messageComplementaire,
      accepteDonnees,
    } = body;

    // Validation
    if (!nomComplet || !email || !telephone) {
      return NextResponse.json(
        { error: "Les champs nom complet, email et téléphone sont obligatoires" },
        { status: 400 }
      );
    }

    if (!accepteDonnees) {
      return NextResponse.json(
        { error: "Vous devez accepter l'utilisation de vos données" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "L'email n'est pas valide" },
        { status: 400 }
      );
    }

    // Créer la demande de partenariat
    const partnershipRequest = await prisma.partnershipRequest.create({
      data: {
        nomComplet,
        email,
        telephone,
        typeProfil: typeProfil || null,
        objectifsInvestissement: objectifsInvestissement || null,
        budgetEstime: budgetEstime || null,
        delaiMiseEnOeuvre: delaiMiseEnOeuvre || null,
        messageComplementaire: messageComplementaire || null,
        accepteDonnees,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        message: "Votre demande de partenariat a été envoyée avec succès",
        id: partnershipRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating partnership request:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre demande" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [partnershipRequests, total] = await Promise.all([
      prisma.partnershipRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.partnershipRequest.count({ where }),
    ]);

    return NextResponse.json({
      data: partnershipRequests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching partnership requests:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des demandes" },
      { status: 500 }
    );
  }
}
