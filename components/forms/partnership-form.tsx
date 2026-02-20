"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PartnershipFormProps {
  onClose?: () => void;
}

export function PartnershipForm({ onClose }: PartnershipFormProps) {
  const [formData, setFormData] = useState({
    nomComplet: "",
    email: "",
    telephone: "",
    typeProfil: "",
    objectifsInvestissement: "",
    budgetEstime: "",
    delaiMiseEnOeuvre: "",
    messageComplementaire: "",
    accepteDonnees: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomComplet.trim()) {
      newErrors.nomComplet = "Le nom complet est obligatoire";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est obligatoire";
    }
    if (!formData.accepteDonnees) {
      newErrors.accepteDonnees = "Vous devez accepter l'utilisation de vos données";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/partnerships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setSubmitSuccess(true);

      // Reset form and close dialog after 2 seconds
      setTimeout(() => {
        setFormData({
          nomComplet: "",
          email: "",
          telephone: "",
          typeProfil: "",
          objectifsInvestissement: "",
          budgetEstime: "",
          delaiMiseEnOeuvre: "",
          messageComplementaire: "",
          accepteDonnees: false,
        });
        setSubmitSuccess(false);
        if (onClose) {
          onClose();
        }
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-medium text-ink">
          Initier un partenariat stratégique avec L3M
        </h2>
        <p className="text-lg font-serif font-light text-ink/70 mt-2">
          Discutons votre projet
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom complet */}
        <div>
          <label htmlFor="nomComplet" className="block text-sm font-medium text-ink mb-2">
            Nom complet *
          </label>
          <Input
            id="nomComplet"
            placeholder="Votre nom et prénom"
            value={formData.nomComplet}
            onChange={(e) => updateFormData("nomComplet", e.target.value)}
            className={cn(
              "border-rail/50 focus:border-accent",
              errors.nomComplet && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.nomComplet && (
            <p className="text-red-500 text-xs mt-1">{errors.nomComplet}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@example.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={cn(
              "border-rail/50 focus:border-accent",
              errors.email && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-ink mb-2">
            Téléphone *
          </label>
          <Input
            id="telephone"
            type="tel"
            placeholder="Votre numéro de téléphone"
            value={formData.telephone}
            onChange={(e) => updateFormData("telephone", e.target.value)}
            className={cn(
              "border-rail/50 focus:border-accent",
              errors.telephone && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.telephone && (
            <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
          )}
        </div>

        {/* Type de profil */}
        <div>
          <label htmlFor="typeProfil" className="block text-sm font-medium text-ink mb-2">
            Type de profil
          </label>
          <select
            id="typeProfil"
            value={formData.typeProfil}
            onChange={(e) => updateFormData("typeProfil", e.target.value)}
            className="flex h-12 w-full rounded-lg border border-rail/50 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <option value="">Sélectionnez un objet</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investisseur">Investisseur</option>
            <option value="entreprise">Entreprise</option>
            <option value="porteur-projet">Porteur de projet</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Objectifs d'investissement */}
        <div>
          <label htmlFor="objectifsInvestissement" className="block text-sm font-medium text-ink mb-2">
            Objectifs d&apos;investissement
          </label>
          <Textarea
            id="objectifsInvestissement"
            placeholder="Votre objectif d'investissement"
            value={formData.objectifsInvestissement}
            onChange={(e) => updateFormData("objectifsInvestissement", e.target.value)}
            rows={3}
            className="border-rail/50 focus:border-accent resize-y"
          />
        </div>

        {/* Budget estimé */}
        <div>
          <label htmlFor="budgetEstime" className="block text-sm font-medium text-ink mb-2">
            Budget estimé / Capital à investir
          </label>
          <Input
            id="budgetEstime"
            placeholder="Votre budget estimé / capital à investir"
            value={formData.budgetEstime}
            onChange={(e) => updateFormData("budgetEstime", e.target.value)}
            className="border-rail/50 focus:border-accent"
          />
        </div>

        {/* Délai de mise en œuvre */}
        <div>
          <label htmlFor="delaiMiseEnOeuvre" className="block text-sm font-medium text-ink mb-2">
            Délai de mise en œuvre souhaité
          </label>
          <Input
            id="delaiMiseEnOeuvre"
            placeholder="Votre délai de mise en œuvre souhaité"
            value={formData.delaiMiseEnOeuvre}
            onChange={(e) => updateFormData("delaiMiseEnOeuvre", e.target.value)}
            className="border-rail/50 focus:border-accent"
          />
        </div>

        {/* Message complémentaire */}
        <div>
          <label htmlFor="messageComplementaire" className="block text-sm font-medium text-ink mb-2">
            Message complémentaire (optionnel)
          </label>
          <Textarea
            id="messageComplementaire"
            placeholder="Votre message (optionnel)"
            value={formData.messageComplementaire}
            onChange={(e) => updateFormData("messageComplementaire", e.target.value)}
            rows={4}
            className="border-rail/50 focus:border-accent resize-y"
          />
        </div>

        {/* Checkbox acceptation */}
        <div>
          <label
            className={cn(
              "flex items-start gap-3 cursor-pointer",
              errors.accepteDonnees && "text-red-500"
            )}
          >
            <input
              type="checkbox"
              checked={formData.accepteDonnees}
              onChange={(e) => {
                updateFormData("accepteDonnees", e.target.checked);
                if (errors.accepteDonnees) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.accepteDonnees;
                    return newErrors;
                  });
                }
              }}
              className={cn(
                "w-4 h-4 mt-1 text-accent border-rail rounded focus:ring-accent",
                errors.accepteDonnees && "border-red-500"
              )}
            />
            <span className="text-sm text-ink">
              J&apos;accepte que mes informations soient utilisées pour être recontacté(e). *
            </span>
          </label>
          {errors.accepteDonnees && (
            <p className="text-red-500 text-xs mt-1 ml-7">{errors.accepteDonnees}</p>
          )}
        </div>

        {/* Success/Error Messages */}
        {submitSuccess && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Votre demande de partenariat a été envoyée avec succès ! Nous vous contacterons bientôt.
          </div>
        )}
        {submitError && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !formData.accepteDonnees}
            className="px-6 bg-accent hover:bg-accent-dark text-white"
          >
            {isSubmitting ? "Envoi en cours..." : "Soumettre ma demande de partenariat"}
          </Button>
        </div>
      </form>
    </div>
  );
}
