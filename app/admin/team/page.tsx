import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminTeamPage() {
  // Le modèle teamMember n'existe pas encore dans le schéma Prisma
  let members: any[] = [];
  try {
    members = await (prisma as any).teamMember?.findMany({
      orderBy: { order: 'asc' },
    }) || [];
  } catch (error) {
    // Modèle non disponible
    members = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Équipe</h1>
        <Button asChild>
          <Link href="/admin/team/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau membre
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <p className="text-sm text-gray-500">
                {member.position} • {member.visible ? "Visible" : "Masqué"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {member.bio}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/team/${member.id}`}>
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
