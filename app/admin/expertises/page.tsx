import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminExpertisesPage() {
  // Le modèle expertise n'existe pas encore dans le schéma Prisma
  let expertises: any[] = [];
  try {
    expertises = await (prisma as any).expertise?.findMany({
      orderBy: { order: 'asc' },
    }) || [];
  } catch (error) {
    // Modèle non disponible
    expertises = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Expertises</h1>
        <Button asChild>
          <Link href="/admin/expertises/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle expertise
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expertises.map((expertise) => (
          <Card key={expertise.id}>
            <CardHeader>
              <CardTitle>{expertise.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {expertise.published ? "Publié" : "Brouillon"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {expertise.description}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/expertises/${expertise.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
