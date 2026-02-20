import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des champs obligatoires
    const requiredFields = [
      "nom",
      "email",
      "telephone",
      "paysResidence",
      "langues",
      "vousEtes",
      "projetEntrepreneurial",
      "structureLegale",
      "titreProjet",
      "secteurActivite",
      "paysRegion",
      "descriptionProjet",
      "pourquoiL3M",
      "niveauEngagement",
      "projetStructure",
      "businessPlan",
      "horizonMiseEnOeuvre",
      "objetRendezVous",
      "creneauSouhaite",
      "accepteDonnees",
      "reconnaitSelection",
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== false) {
        return NextResponse.json(
          { error: `Le champ ${field} est obligatoire` },
          { status: 400 }
        );
      }
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "L'email n'est pas valide" },
        { status: 400 }
      );
    }

    // Validation des arrays
    if (!Array.isArray(body.pourquoiL3M) || body.pourquoiL3M.length === 0) {
      return NextResponse.json(
        { error: "Veuillez sélectionner au moins une option pour 'Pourquoi L3M'" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.niveauEngagement) || body.niveauEngagement.length === 0) {
      return NextResponse.json(
        { error: "Veuillez sélectionner au moins une option pour 'Niveau d'engagement'" },
        { status: 400 }
      );
    }

    // Création de la demande
    const appointmentRequest = await prisma.appointmentRequest.create({
      data: {
        nom: body.nom,
        email: body.email,
        telephone: body.telephone,
        paysResidence: body.paysResidence,
        langues: body.langues,
        vousEtes: body.vousEtes,
        projetEntrepreneurial: body.projetEntrepreneurial,
        structureLegale: body.structureLegale,
        titreProjet: body.titreProjet,
        secteurActivite: body.secteurActivite,
        paysRegion: body.paysRegion,
        descriptionProjet: body.descriptionProjet,
        pourquoiL3M: body.pourquoiL3M,
        niveauEngagement: body.niveauEngagement,
        contrepartie: body.contrepartie || null,
        projetStructure: body.projetStructure,
        businessPlan: body.businessPlan,
        horizonMiseEnOeuvre: body.horizonMiseEnOeuvre,
        montant: body.montant || null,
        nomEntreprise: body.nomEntreprise || null,
        secteurActiviteEntreprise: body.secteurActiviteEntreprise || null,
        objetRendezVous: body.objetRendezVous,
        creneauSouhaite: body.creneauSouhaite,
        message: body.message || null,
        accepteDonnees: body.accepteDonnees,
        reconnaitSelection: body.reconnaitSelection,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Votre demande a été envoyée avec succès",
        id: appointmentRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating appointment request:", error);
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

    const [appointments, total] = await Promise.all([
      prisma.appointmentRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.appointmentRequest.count({ where }),
    ]);

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching appointment requests:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des demandes" },
      { status: 500 }
    );
  }
}
