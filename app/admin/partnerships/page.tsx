"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  FileText, 
  Clock,
  CheckCircle2,
  Eye,
  Archive,
  Trash2,
  MessageSquare,
  Loader2,
  DollarSign,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnershipRequest {
  id: string;
  nomComplet: string;
  email: string;
  telephone: string;
  typeProfil?: string;
  objectifsInvestissement?: string;
  budgetEstime?: string;
  delaiMiseEnOeuvre?: string;
  messageComplementaire?: string;
  accepteDonnees: boolean;
  status: string;
  createdAt: string;
  notes?: string;
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  contacted: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

const STATUS_LABELS = {
  pending: "En attente",
  reviewed: "Consulté",
  contacted: "Contacté",
  archived: "Archivé",
};

export default function AdminPartnershipsPage() {
  const [partnerships, setPartnerships] = useState<PartnershipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPartnership, setSelectedPartnership] = useState<PartnershipRequest | null>(null);
  const [notes, setNotes] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnershipToDelete, setPartnershipToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchPartnerships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const fetchPartnerships = async () => {
    try {
      setLoading(true);
      const url = selectedStatus === "all" 
        ? "/api/partnerships" 
        : `/api/partnerships?status=${selectedStatus}`;
      const response = await fetch(url);
      const data = await response.json();
      setPartnerships(data.data || []);
    } catch (error) {
      console.error("Error fetching partnerships:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/partnerships/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchPartnerships();
        if (selectedPartnership?.id === id) {
          setSelectedPartnership({ ...selectedPartnership, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const saveNotes = async (id: string) => {
    try {
      const response = await fetch(`/api/partnerships/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        fetchPartnerships();
        if (selectedPartnership?.id === id) {
          setSelectedPartnership({ ...selectedPartnership, notes });
        }
      }
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const deletePartnership = async (id: string) => {
    try {
      const response = await fetch(`/api/partnerships/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPartnerships();
        setSelectedPartnership(null);
        setDeleteDialogOpen(false);
        setPartnershipToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting partnership:", error);
    }
  };

  const openDetails = (partnership: PartnershipRequest) => {
    setSelectedPartnership(partnership);
    setNotes(partnership.notes || "");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Demandes de partenariat</h1>
          <p className="text-muted mt-1">Gérez les demandes de partenariat stratégique</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              onClick={() => setSelectedStatus("all")}
              className={selectedStatus === "all" ? "bg-accent hover:bg-accent-dark" : ""}
            >
              Tous ({partnerships.length})
            </Button>
            <Button
              variant={selectedStatus === "pending" ? "default" : "outline"}
              onClick={() => setSelectedStatus("pending")}
              className={selectedStatus === "pending" ? "bg-accent hover:bg-accent-dark" : ""}
            >
              En attente ({partnerships.filter((p) => p.status === "pending").length})
            </Button>
            <Button
              variant={selectedStatus === "reviewed" ? "default" : "outline"}
              onClick={() => setSelectedStatus("reviewed")}
              className={selectedStatus === "reviewed" ? "bg-accent hover:bg-accent-dark" : ""}
            >
              Consulté ({partnerships.filter((p) => p.status === "reviewed").length})
            </Button>
            <Button
              variant={selectedStatus === "contacted" ? "default" : "outline"}
              onClick={() => setSelectedStatus("contacted")}
              className={selectedStatus === "contacted" ? "bg-accent hover:bg-accent-dark" : ""}
            >
              Contacté ({partnerships.filter((p) => p.status === "contacted").length})
            </Button>
            <Button
              variant={selectedStatus === "archived" ? "default" : "outline"}
              onClick={() => setSelectedStatus("archived")}
              className={selectedStatus === "archived" ? "bg-accent hover:bg-accent-dark" : ""}
            >
              Archivé ({partnerships.filter((p) => p.status === "archived").length})
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {partnerships.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted">
                Aucune demande de partenariat trouvée
              </CardContent>
            </Card>
          ) : (
            partnerships.map((partnership) => (
              <Card
                key={partnership.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedPartnership?.id === partnership.id && "ring-2 ring-accent"
                )}
                onClick={() => openDetails(partnership)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{partnership.nomComplet}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {partnership.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {partnership.telephone}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        STATUS_COLORS[partnership.status as keyof typeof STATUS_COLORS]
                      )}
                    >
                      {STATUS_LABELS[partnership.status as keyof typeof STATUS_LABELS]}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(partnership.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {partnership.typeProfil && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {partnership.typeProfil}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedPartnership ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Détails de la demande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informations personnelles
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nom complet:</strong> {selectedPartnership.nomComplet}</p>
                    <p><strong>Email:</strong> {selectedPartnership.email}</p>
                    <p><strong>Téléphone:</strong> {selectedPartnership.telephone}</p>
                    {selectedPartnership.typeProfil && (
                      <p><strong>Type de profil:</strong> {selectedPartnership.typeProfil}</p>
                    )}
                  </div>
                </div>

                {selectedPartnership.objectifsInvestissement && (
                  <div>
                    <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Objectifs d&apos;investissement
                    </h3>
                    <p className="text-sm text-muted">{selectedPartnership.objectifsInvestissement}</p>
                  </div>
                )}

                {selectedPartnership.budgetEstime && (
                  <div>
                    <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Budget estimé
                    </h3>
                    <p className="text-sm text-muted">{selectedPartnership.budgetEstime}</p>
                  </div>
                )}

                {selectedPartnership.delaiMiseEnOeuvre && (
                  <div>
                    <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Délai de mise en œuvre
                    </h3>
                    <p className="text-sm text-muted">{selectedPartnership.delaiMiseEnOeuvre}</p>
                  </div>
                )}

                {selectedPartnership.messageComplementaire && (
                  <div>
                    <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message complémentaire
                    </h3>
                    <p className="text-sm text-muted whitespace-pre-wrap">{selectedPartnership.messageComplementaire}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-ink mb-2">Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ajoutez des notes..."
                    rows={4}
                    className="w-full rounded-lg border border-rail/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Button
                    onClick={() => saveNotes(selectedPartnership.id)}
                    className="mt-2 w-full bg-accent hover:bg-accent-dark"
                    size="sm"
                  >
                    Enregistrer les notes
                  </Button>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button
                    onClick={() => updateStatus(selectedPartnership.id, "reviewed")}
                    variant="outline"
                    size="sm"
                    disabled={selectedPartnership.status === "reviewed"}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Marquer comme consulté
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedPartnership.id, "contacted")}
                    variant="outline"
                    size="sm"
                    disabled={selectedPartnership.status === "contacted"}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Marquer comme contacté
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedPartnership.id, "archived")}
                    variant="outline"
                    size="sm"
                    disabled={selectedPartnership.status === "archived"}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </Button>
                  <Button
                    onClick={() => {
                      setPartnershipToDelete(selectedPartnership.id);
                      setDeleteDialogOpen(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted">
                Sélectionnez une demande pour voir les détails
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          if (partnershipToDelete) {
            deletePartnership(partnershipToDelete);
          }
        }}
        title="Supprimer la demande"
        description="Êtes-vous sûr de vouloir supprimer cette demande de partenariat ? Cette action est irréversible."
      />
    </div>
  );
}
