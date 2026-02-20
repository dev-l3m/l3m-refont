import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage() {
  // Le modèle post n'existe pas encore dans le schéma Prisma
  let posts: any[] = [];
  try {
    posts = await (prisma as any).post?.findMany({
      orderBy: { publishedAt: 'desc' },
    }) || [];
  } catch (error) {
    // Modèle non disponible
    posts = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Actualités</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {post.publishedAt && formatDate(post.publishedAt)} • {post.published ? "Publié" : "Brouillon"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/posts/${post.id}`}>
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
