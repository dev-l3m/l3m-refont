"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, Plus, Users, FileText, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Subscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

interface Campaign {
  id: string;
  subject: string;
  content: string;
  status: string;
  sentAt: string | null;
  sentCount: number;
  createdAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignContent, setCampaignContent] = useState("");
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [campaignToSend, setCampaignToSend] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subscribersRes, campaignsRes] = await Promise.all([
        fetch("/api/newsletter/subscribers"),
        fetch("/api/newsletter/campaigns"),
      ]);

      const subscribersData = await subscribersRes.json();
      const campaignsData = await campaignsRes.json();

      setSubscribers(subscribersData.subscribers || []);
      setCampaigns(campaignsData.campaigns || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!campaignSubject.trim() || !campaignContent.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
      });
      return;
    }

    try {
      const response = await fetch("/api/newsletter/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: campaignSubject,
          content: campaignContent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Succès",
          description: "Campagne créée avec succès",
        });
        setCampaignSubject("");
        setCampaignContent("");
        setShowCampaignForm(false);
        fetchData();
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error || "Erreur lors de la création",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la création de la campagne",
      });
    }
  };

  const handleSendClick = (campaignId: string) => {
    setCampaignToSend(campaignId);
    setSendDialogOpen(true);
  };

  const handleSendCampaign = async () => {
    if (!campaignToSend) return;

    try {
      const response = await fetch(`/api/newsletter/campaigns/${campaignToSend}/send`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Succès",
          description: data.message || "Newsletter envoyée avec succès",
        });
        fetchData();
        setSendDialogOpen(false);
        setCampaignToSend(null);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error || "Erreur lors de l&apos;envoi",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l&apos;envoi de la newsletter",
      });
    }
  };

  const activeSubscribers = subscribers.filter((s) => s.active).length;

  const handleDeleteSubscriber = (id: string) => {
    setSubscriberToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteSubscriber = async () => {
    if (!subscriberToDelete) return;

    try {
      const response = await fetch(`/api/newsletter/subscribers/${subscriberToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Succès",
          description: data.message || "Abonné supprimé avec succès",
        });
        fetchData();
        setDeleteDialogOpen(false);
        setSubscriberToDelete(null);
      } else {
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
        description: "Erreur lors de la suppression de l&apos;abonné",
      });
    }
  };

  const toggleSubscriberStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Succès",
          description: data.message || "Statut de l&apos;abonné mis à jour",
        });
        fetchData();
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error || "Erreur lors de la mise à jour",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Newsletter</h1>
        <Button onClick={() => setShowCampaignForm(!showCampaignForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle campagne
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscribers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total abonnés</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire de création de campagne */}
      {showCampaignForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle campagne</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  placeholder="Sujet de la newsletter"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  value={campaignContent}
                  onChange={(e) => setCampaignContent(e.target.value)}
                  placeholder="Contenu de la newsletter (HTML supporté)"
                  rows={10}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Créer la campagne</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCampaignForm(false);
                    setCampaignSubject("");
                    setCampaignContent("");
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des campagnes */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Campagnes</h2>
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : campaigns.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Aucune campagne trouvée
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{campaign.subject}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {campaign.status === "sent" && campaign.sentAt
                          ? `Envoyée le ${new Date(campaign.sentAt).toLocaleDateString("fr-FR")} à ${campaign.sentCount} abonnés`
                          : campaign.status === "draft"
                          ? "Brouillon"
                          : "Planifiée"}
                      </p>
                    </div>
                    {campaign.status === "draft" && (
                      <Button
                        onClick={() => handleSendClick(campaign.id)}
                        variant="accent"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-sm text-gray-600 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: campaign.content }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Liste des abonnés */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Abonnés</h2>
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : subscribers.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Aucun abonné trouvé
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d&apos;inscription
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {subscriber.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              subscriber.active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subscriber.active ? "Actif" : "Inactif"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscriber.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.active)}
                              className={subscriber.active 
                                ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200" 
                                : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                              }
                              title={subscriber.active ? "Masquer l&apos;abonné" : "Activer l&apos;abonné"}
                            >
                              {subscriber.active ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteSubscriber(subscriber.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                              title="Supprimer l&apos;abonné"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmDialog
        open={sendDialogOpen}
        onOpenChange={setSendDialogOpen}
        title="Confirmer l&apos;envoi"
        description="Êtes-vous sûr de vouloir envoyer cette newsletter à tous les abonnés ?"
        confirmText="Envoyer"
        cancelText="Annuler"
        onConfirm={handleSendCampaign}
        variant="default"
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cet abonné ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={deleteSubscriber}
        variant="destructive"
      />
    </div>
  );
}
