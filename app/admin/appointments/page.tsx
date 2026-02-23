"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  User, 
  Briefcase, 
  FileText, 
  Clock,
  CheckCircle2,
  Eye,
  Archive,
  Trash2,
  MessageSquare,
  Building2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentRequest {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  paysResidence: string;
  langues: string;
  vousEtes: string;
  projetEntrepreneurial: string;
  structureLegale: string;
  titreProjet: string;
  secteurActivite: string;
  paysRegion: string;
  descriptionProjet: string;
  pourquoiL3M: string[];
  niveauEngagement: string[];
  contrepartie?: string;
  projetStructure: string;
  businessPlan: string;
  horizonMiseEnOeuvre: string;
  montant?: string;
  nomEntreprise?: string;
  secteurActiviteEntreprise?: string;
  objetRendezVous: string;
  creneauSouhaite: string;
  message?: string;
  accepteDonnees: boolean;
  reconnaitSelection: boolean;
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

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);
  const [notes, setNotes] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const url = selectedStatus === "all" 
        ? "/api/appointments" 
        : `/api/appointments?status=${selectedStatus}`;
      const response = await fetch(url);
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes }),
      });

      if (response.ok) {
        fetchAppointments();
        setSelectedAppointment(null);
        setNotes("");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setAppointmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteAppointment = async () => {
    if (!appointmentToDelete) return;

    try {
      const response = await fetch(`/api/appointments/${appointmentToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAppointments();
        setSelectedAppointment(null);
        setDeleteDialogOpen(false);
        setAppointmentToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const fetchAppointmentDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      const data = await response.json();
      setSelectedAppointment(data);
      setNotes(data.notes || "");
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Calendar className="h-8 w-8 text-accent" />
            Demandes de rendez-vous
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {appointments.length} demande{appointments.length > 1 ? "s" : ""} trouvée{appointments.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-auto"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="reviewed">Consulté</option>
            <option value="contacted">Contacté</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des demandes */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent mb-4" />
                <p className="text-gray-600">Chargement des demandes...</p>
              </CardContent>
            </Card>
          ) : appointments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">Aucune demande trouvée</p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedStatus === "all" 
                    ? "Il n'y a aucune demande pour le moment" 
                    : `Aucune demande avec le statut "${STATUS_LABELS[selectedStatus as keyof typeof STATUS_LABELS]}"`}
                </p>
              </CardContent>
            </Card>
          ) : (
            appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className={cn(
                  "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
                  selectedAppointment?.id === appointment.id 
                    ? "ring-2 ring-primary border-l-accent shadow-md" 
                    : "border-l-transparent hover:border-l-accent/50"
                )}
                onClick={() => fetchAppointmentDetails(appointment.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <User className="h-5 w-5 text-accent shrink-0" />
                        {appointment.nom}
                      </CardTitle>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4 shrink-0" />
                          <span className="truncate">{appointment.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4 shrink-0" />
                          {appointment.telephone}
                        </div>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold shrink-0",
                        STATUS_COLORS[appointment.status as keyof typeof STATUS_COLORS]
                      )}
                    >
                      {STATUS_LABELS[appointment.status as keyof typeof STATUS_LABELS]}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-700">Projet:</span>{" "}
                        <span className="text-gray-600">{appointment.titreProjet}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <FileText className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-700">Objet:</span>{" "}
                        <span className="text-gray-600">{appointment.objetRendezVous}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-700">Créneau souhaité:</span>{" "}
                        <span className="text-gray-600">
                          {new Date(appointment.creneauSouhaite).toLocaleString("fr-FR", {
                            dateStyle: "long",
                            timeStyle: "short"
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Reçue le {new Date(appointment.createdAt).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Détails de la demande sélectionnée */}
        <div className="lg:col-span-1">
          {selectedAppointment ? (
            <Card className="sticky top-4 shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Détails de la demande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto p-6">
                <div className="space-y-4 text-sm">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                      <User className="h-4 w-4" />
                      Informations personnelles
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[140px]">Nom:</span>
                        <span className="text-gray-900">{selectedAppointment.nom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[140px]">Email:</span>
                        <a 
                          href={`mailto:${selectedAppointment.email}`} 
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" />
                          {selectedAppointment.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[140px]">Téléphone:</span>
                        <a 
                          href={`tel:${selectedAppointment.telephone}`} 
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          {selectedAppointment.telephone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[140px]">Pays:</span>
                        <span className="text-gray-900 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedAppointment.paysResidence}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[140px]">Langues:</span>
                        <span className="text-gray-900 flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {selectedAppointment.langues}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-900">
                      <User className="h-4 w-4" />
                      Profil
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Vous êtes:</span>
                        <span className="text-gray-900">{selectedAppointment.vousEtes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Projet entrepreneurial:</span>
                        <span className="text-gray-900">{selectedAppointment.projetEntrepreneurial}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Structure légale:</span>
                        <span className="text-gray-900">{selectedAppointment.structureLegale}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-purple-900">
                      <Briefcase className="h-4 w-4" />
                      Projet
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Titre:</span>
                        <span className="text-gray-900">{selectedAppointment.titreProjet}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Secteur:</span>
                        <span className="text-gray-900">{selectedAppointment.secteurActivite}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Pays/région:</span>
                        <span className="text-gray-900 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedAppointment.paysRegion}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <span className="font-medium text-gray-700 block mb-2">Description:</span>
                        <p className="text-gray-900 whitespace-pre-wrap bg-white p-3 rounded border border-purple-200 text-sm">
                          {selectedAppointment.descriptionProjet}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-orange-900">
                      <Eye className="h-4 w-4" />
                      Vision
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-700 block mb-2">Pourquoi L3M:</span>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          {selectedAppointment.pourquoiL3M.map((item, idx) => (
                            <li key={idx} className="text-gray-900 text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t border-orange-200">
                        <span className="font-medium text-gray-700 block mb-2">Niveau d&apos;engagement:</span>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          {selectedAppointment.niveauEngagement.map((item, idx) => (
                            <li key={idx} className="text-gray-900 text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                      {selectedAppointment.contrepartie && (
                        <div className="pt-2 border-t border-orange-200">
                          <span className="font-medium text-gray-700 block mb-2">Contrepartie:</span>
                          <p className="text-gray-900 text-sm bg-white p-3 rounded border border-orange-200">
                            {selectedAppointment.contrepartie}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-indigo-900">
                      <FileText className="h-4 w-4" />
                      Détails du projet
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Projet structuré:</span>
                        <span className="text-gray-900">{selectedAppointment.projetStructure}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Business plan:</span>
                        <span className="text-gray-900">{selectedAppointment.businessPlan}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 min-w-[160px]">Horizon:</span>
                        <span className="text-gray-900">{selectedAppointment.horizonMiseEnOeuvre}</span>
                      </div>
                      {selectedAppointment.montant && (
                        <div className="flex items-center gap-2 pt-2 border-t border-indigo-200">
                          <span className="font-medium text-gray-700 min-w-[160px]">Montant:</span>
                          <span className="text-gray-900 font-semibold">{selectedAppointment.montant} €</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-accent-dark">
                      <Calendar className="h-4 w-4" />
                      Rendez-vous
                    </h3>
                    <div className="space-y-2">
                      {selectedAppointment.nomEntreprise && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400 shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">Entreprise:</span>{" "}
                            <span className="text-gray-900">{selectedAppointment.nomEntreprise}</span>
                          </div>
                        </div>
                      )}
                      {selectedAppointment.secteurActiviteEntreprise && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400 shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">Secteur:</span>{" "}
                            <span className="text-gray-900">{selectedAppointment.secteurActiviteEntreprise}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Objet:</span>{" "}
                          <span className="text-gray-900">{selectedAppointment.objetRendezVous}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-1">
                        <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-700">Créneau souhaité:</span>
                          <p className="text-gray-900 mt-1">
                            {new Date(selectedAppointment.creneauSouhaite).toLocaleString("fr-FR", {
                              dateStyle: "full",
                              timeStyle: "short"
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedAppointment.message && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-600" />
                        Message
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border border-gray-200">
                        {selectedAppointment.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Ajoutez des notes sur cette demande..."
                  />
                </div>

                <div className="border-t pt-4 space-y-2">
                  <Button
                    onClick={() => updateStatus(selectedAppointment.id, "reviewed")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Marquer comme consulté
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedAppointment.id, "contacted")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Marquer comme contacté
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedAppointment.id, "archived")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(selectedAppointment.id)}
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 font-medium">Aucune demande sélectionnée</p>
                <p className="text-sm text-gray-500 mt-1">
                  Cliquez sur une demande dans la liste pour voir les détails
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={deleteAppointment}
        variant="destructive"
      />
    </div>
  );
}
