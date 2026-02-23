"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  UserPlus, 
  Users, 
  Mail, 
  Shield, 
  Calendar,
  Loader2,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        // Scroll to top si le header est présent
        if (response.headers.get("X-Scroll-To-Top") === "true") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setError("Erreur lors du chargement des utilisateurs");
      }
    } catch (error) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteUser = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
        setDeleteDialogOpen(false);
        setUserToDelete(null);
        toast({
          variant: "success",
          title: "Succès",
          description: "Utilisateur supprimé avec succès",
        });
        // Scroll to top si le header est présent
        if (response.headers.get("X-Scroll-To-Top") === "true") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        const data = await response.json();
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error || "Erreur lors de la suppression",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Users className="h-8 w-8 text-accent" />
            Gestion des utilisateurs
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {users.length} utilisateur{users.length > 1 ? "s" : ""} enregistré{users.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => router.push("/admin/register")} className="w-full sm:w-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          Créer un utilisateur
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-red-700">
              <Shield className="h-5 w-5" />
              <span className="font-medium">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent mb-4" />
            <p className="text-gray-600">Chargement des utilisateurs...</p>
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">Aucun utilisateur trouvé</p>
            <p className="text-sm text-gray-500 mt-1">
              Créez votre premier utilisateur pour commencer
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card 
              key={user.id}
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-accent"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                        user.role === "admin" 
                          ? "bg-accent/20 text-accent-dark" 
                          : "bg-blue-100 text-blue-600"
                      )}>
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <span className="truncate">{user.name || "Sans nom"}</span>
                    </CardTitle>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className={cn(
                          "h-4 w-4 shrink-0",
                          user.role === "admin" ? "text-accent-dark" : "text-blue-600"
                        )} />
                        <span className="text-gray-700">
                          Rôle: <span className="font-semibold">{user.role}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 pt-1 border-t border-gray-100">
                        <Calendar className="h-3 w-3" />
                        Créé le {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={deleteUser}
        variant="destructive"
      />
    </div>
  );
}
