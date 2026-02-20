import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Email invalide"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    // Vérifier si l'email existe déjà
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { error: "Cet email est déjà inscrit à la newsletter" },
          { status: 400 }
        );
      } else {
        // Réactiver l'inscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { active: true },
        });
        return NextResponse.json(
          { message: "Inscription à la newsletter réactivée avec succès" },
          { status: 200 }
        );
      }
    }

    // Créer une nouvelle inscription
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        active: true,
      },
    });

    return NextResponse.json(
      { message: "Inscription à la newsletter réussie" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error subscribing to newsletter:", error);
    
    // Log l'erreur complète pour le débogage
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
      error,
    });

    // Vérifier si c'est une erreur Prisma liée à un modèle manquant
    if (errorMessage.includes("newsletterSubscriber") || errorMessage.includes("Unknown model")) {
      return NextResponse.json(
        { 
          error: "Le modèle NewsletterSubscriber n'est pas disponible. Veuillez arrêter le serveur, exécuter 'npx prisma generate', puis redémarrer le serveur.",
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: "Une erreur est survenue lors de l'inscription",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
