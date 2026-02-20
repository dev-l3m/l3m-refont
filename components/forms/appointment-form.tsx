"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "@/components/country-select";
import { cn } from "@/lib/utils";

interface AppointmentFormProps {
  onClose?: () => void;
}

const STEPS = [
  "Informations",
  "Profil",
  "Nature",
  "Vision",
  "Projet",
  "Ressources",
  "Message",
];

export function AppointmentForm({ onClose }: AppointmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Step 1: Informations
    nom: "",
    email: "",
    telephone: "",
    paysResidence: "",
    langues: "",
    // Step 2: Profil
    vousEtes: "",
    projetEntrepreneurial: "",
    structureLegale: "",
    // Step 3: Nature
    titreProjet: "",
    secteurActivite: "",
    paysRegion: "",
    descriptionProjet: "",
    // Step 4: Vision
    pourquoiL3M: [] as string[],
    niveauEngagement: [] as string[],
    contrepartie: "",
    // Step 5: Projet
    projetStructure: "",
    businessPlan: "",
    horizonMiseEnOeuvre: "",
    montant: "",
    // Step 6: Ressources
    nomEntreprise: "",
    secteurActiviteEntreprise: "",
    objetRendezVous: "",
    creneauSouhaite: "",
    // Step 7: Message
    message: "",
    accepteDonnees: false,
    reconnaitSelection: false,
  });

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Informations
        if (!formData.nom.trim()) newErrors.nom = "Le nom est obligatoire";
        if (!formData.email.trim()) {
          newErrors.email = "L&apos;email est obligatoire";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "L&apos;email n&apos;est pas valide";
        }
        if (!formData.telephone.trim()) newErrors.telephone = "Le numéro de téléphone est obligatoire";
        if (!formData.paysResidence.trim()) newErrors.paysResidence = "Le pays de résidence est obligatoire";
        if (!formData.langues) newErrors.langues = "La langue est obligatoire";
        break;
      case 1: // Profil
        if (!formData.vousEtes) newErrors.vousEtes = "Ce champ est obligatoire";
        if (!formData.projetEntrepreneurial) newErrors.projetEntrepreneurial = "Ce champ est obligatoire";
        if (!formData.structureLegale) newErrors.structureLegale = "Ce champ est obligatoire";
        break;
      case 2: // Nature
        if (!formData.titreProjet.trim()) newErrors.titreProjet = "Le titre du projet est obligatoire";
        if (!formData.secteurActivite) newErrors.secteurActivite = "Le secteur d&apos;activité est obligatoire";
        if (!formData.paysRegion.trim()) newErrors.paysRegion = "Le pays ou région est obligatoire";
        if (!formData.descriptionProjet.trim()) newErrors.descriptionProjet = "La description est obligatoire";
        break;
      case 3: // Vision
        if (formData.pourquoiL3M.length === 0) newErrors.pourquoiL3M = "Veuillez sélectionner au moins une option";
        if (formData.niveauEngagement.length === 0) newErrors.niveauEngagement = "Veuillez sélectionner au moins une option";
        break;
      case 4: // Projet
        if (!formData.projetStructure) newErrors.projetStructure = "Ce champ est obligatoire";
        if (!formData.businessPlan) newErrors.businessPlan = "Ce champ est obligatoire";
        if (!formData.horizonMiseEnOeuvre) newErrors.horizonMiseEnOeuvre = "Ce champ est obligatoire";
        break;
      case 5: // Ressources
        if (!formData.objetRendezVous) newErrors.objetRendezVous = "L&apos;objet du rendez-vous est obligatoire";
        if (!formData.creneauSouhaite) newErrors.creneauSouhaite = "Le créneau souhaité est obligatoire";
        break;
      case 6: // Message
        if (!formData.accepteDonnees) newErrors.accepteDonnees = "Vous devez accepter l&apos;utilisation de vos données";
        if (!formData.reconnaitSelection) newErrors.reconnaitSelection = "Vous devez reconnaître les conditions";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
        // Clear errors when moving to next step
        setErrors({});
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    if (validateStep(6)) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await fetch("/api/appointments", {
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
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setCurrentStep(0);
          setFormData({
      nom: "",
      email: "",
      telephone: "",
      paysResidence: "",
      langues: "",
      vousEtes: "",
      projetEntrepreneurial: "",
      structureLegale: "",
      titreProjet: "",
      secteurActivite: "",
      paysRegion: "",
      descriptionProjet: "",
      pourquoiL3M: [],
      niveauEngagement: [],
      contrepartie: "",
      projetStructure: "",
      businessPlan: "",
      horizonMiseEnOeuvre: "",
      montant: "",
      nomEntreprise: "",
      secteurActiviteEntreprise: "",
      objetRendezVous: "",
      creneauSouhaite: "",
      message: "",
      accepteDonnees: false,
      reconnaitSelection: false,
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
    }
  };

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

  const toggleCheckbox = (field: string, value: string) => {
    setFormData((prev) => {
      const current = (prev[field as keyof typeof prev] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  return (
    <div className="max-w-4xl w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-medium text-ink">
            Planifier un rendez-vous
          </h2>
          <p className="text-lg font-serif font-medium text-ink mt-2">
            Formulaire de contact
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                    index === currentStep
                      ? "bg-yellow-500 text-white"
                      : index < currentStep
                      ? "bg-yellow-500/30 text-ink"
                      : "bg-rail/50 text-ink/50"
                  )}
                >
                  {index + 1}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center",
                    index === currentStep
                      ? "text-ink font-medium"
                      : "text-ink/50"
                  )}
                >
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2",
                    index < currentStep ? "bg-yellow-500" : "bg-rail/50"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Step 1: Informations */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Nom et prénom *
                </label>
                <Input
                  placeholder="Votre nom complet"
                  value={formData.nom}
                  onChange={(e) => updateFormData("nom", e.target.value)}
                  className={cn(
                    "border-yellow-500/30 focus:border-yellow-500",
                    errors.nom && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.nom && (
                  <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="votre.email@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={cn(
                    "border-yellow-500/30 focus:border-yellow-500",
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Numéro de téléphone *
                </label>
                <Input
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  value={formData.telephone}
                  onChange={(e) => updateFormData("telephone", e.target.value)}
                  className={cn(
                    "border-yellow-500/30 focus:border-yellow-500",
                    errors.telephone && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.telephone && (
                  <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Pays de résidence actuelle *
                </label>
                <CountrySelect
                  value={formData.paysResidence}
                  onValueChange={(value) => updateFormData("paysResidence", value)}
                  placeholder="Sélectionner un pays"
                  error={!!errors.paysResidence}
                />
                {errors.paysResidence && (
                  <p className="text-red-500 text-xs mt-1">{errors.paysResidence}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Langue(s) parlée(s) couramment *
                </label>
                <select
                  value={formData.langues}
                  onChange={(e) => updateFormData("langues", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.langues
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="francais">Français</option>
                  <option value="anglais">Anglais</option>
                  <option value="espagnol">Espagnol</option>
                  <option value="autre">Autre</option>
                </select>
                {errors.langues && (
                  <p className="text-red-500 text-xs mt-1">{errors.langues}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Profil */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Vous êtes : *
                </label>
                <select
                  value={formData.vousEtes}
                  onChange={(e) => updateFormData("vousEtes", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.vousEtes
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="entrepreneur">Entrepreneur individuel</option>
                  <option value="representant">Représentant d&apos;une entreprise</option>
                  <option value="porteur">Porteur de projet en création</option>
                  <option value="groupe">Groupe ou holding</option>
                  <option value="autre">Autre</option>
                </select>
                {errors.vousEtes && (
                  <p className="text-red-500 text-xs mt-1">{errors.vousEtes}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Avez-vous déjà lancé un projet entrepreneurial ? *
                </label>
                <select
                  value={formData.projetEntrepreneurial}
                  onChange={(e) => updateFormData("projetEntrepreneurial", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.projetEntrepreneurial
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
                {errors.projetEntrepreneurial && (
                  <p className="text-red-500 text-xs mt-1">{errors.projetEntrepreneurial}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Disposez-vous d&apos;une structure légale ? *
                </label>
                <select
                  value={formData.structureLegale}
                  onChange={(e) => updateFormData("structureLegale", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.structureLegale
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="oui-sas">Oui (SAS, SARL, etc.)</option>
                  <option value="non">Non, pas encore</option>
                  <option value="en-cours">En cours de création</option>
                </select>
                {errors.structureLegale && (
                  <p className="text-red-500 text-xs mt-1">{errors.structureLegale}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Nature */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Titre de votre projet *
                </label>
                <Input
                  placeholder="Titre court"
                  value={formData.titreProjet}
                  onChange={(e) => updateFormData("titreProjet", e.target.value)}
                  className={cn(
                    "border-yellow-500/30 focus:border-yellow-500",
                    errors.titreProjet && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.titreProjet && (
                  <p className="text-red-500 text-xs mt-1">{errors.titreProjet}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Secteur d&apos;activité principal *
                </label>
                <select
                  value={formData.secteurActivite}
                  onChange={(e) => updateFormData("secteurActivite", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.secteurActivite
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="industrie">Industrie / Production</option>
                  <option value="services-b2b">Services B2B</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="tech">Tech / Digital</option>
                  <option value="education">Éducation / Formation</option>
                  <option value="sante">Santé / Cosmétique</option>
                  <option value="agriculture">Agriculture / Agroalimentaire</option>
                  <option value="autre">Autre</option>
                </select>
                {errors.secteurActivite && (
                  <p className="text-red-500 text-xs mt-1">{errors.secteurActivite}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Pays ou région de mise en œuvre envisagé(e) *
                </label>
                <Input
                  placeholder="Pays ou région"
                  value={formData.paysRegion}
                  onChange={(e) => updateFormData("paysRegion", e.target.value)}
                  className={cn(
                    "border-yellow-500/30 focus:border-yellow-500",
                    errors.paysRegion && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.paysRegion && (
                  <p className="text-red-500 text-xs mt-1">{errors.paysRegion}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Décrivez votre projet en quelques lignes (objectif, mission, originalité) *
                </label>
                <textarea
                  placeholder="Description du projet"
                  value={formData.descriptionProjet}
                  onChange={(e) => updateFormData("descriptionProjet", e.target.value)}
                  rows={5}
                  className={cn(
                    "flex w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 resize-y",
                    errors.descriptionProjet
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                />
                {errors.descriptionProjet && (
                  <p className="text-red-500 text-xs mt-1">{errors.descriptionProjet}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Vision */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-3">
                  Pourquoi souhaitez-vous être accompagné(e) par L3M ? *
                </label>
                <div className="space-y-2">
                  {[
                    "Pour structurer mon projet",
                    "Pour bénéficier d&apos;un accompagnement stratégique",
                    "Pour créer une filiale ou une joint-venture avec L3M",
                    "Pour bénéficier de moyens techniques et humains",
                    "Pour renforcer ma crédibilité",
                    "Pour accéder à des opportunités de financement",
                    "Autre",
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.pourquoiL3M.includes(option)}
                        onChange={() => {
                          toggleCheckbox("pourquoiL3M", option);
                          if (errors.pourquoiL3M) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.pourquoiL3M;
                              return newErrors;
                            });
                          }
                        }}
                        className="w-4 h-4 text-yellow-500 border-rail rounded focus:ring-yellow-500"
                      />
                      <span className="text-sm text-ink">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.pourquoiL3M && (
                  <p className="text-red-500 text-xs mt-1">{errors.pourquoiL3M}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-3">
                  Quel niveau d&apos;engagement attendez-vous de L3M ? *
                </label>
                <div className="space-y-2">
                  {[
                    "Conseil stratégique ponctuel",
                    "Accompagnement opérationnel",
                    "Mise à disposition d&apos;experts / équipes",
                    "Création conjointe d&apos;une structure",
                    "Financement partiel / investissement",
                    "Autre",
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.niveauEngagement.includes(option)}
                        onChange={() => {
                          toggleCheckbox("niveauEngagement", option);
                          if (errors.niveauEngagement) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.niveauEngagement;
                              return newErrors;
                            });
                          }
                        }}
                        className="w-4 h-4 text-yellow-500 border-rail rounded focus:ring-yellow-500"
                      />
                      <span className="text-sm text-ink">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.niveauEngagement && (
                  <p className="text-red-500 text-xs mt-1">{errors.niveauEngagement}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Qu&apos;êtes-vous prêt(e) à apporter en contrepartie ?
                </label>
                <Input
                  placeholder="Ressources, capital, temps, compétences, etc."
                  value={formData.contrepartie}
                  onChange={(e) => updateFormData("contrepartie", e.target.value)}
                  className="border-yellow-500/30 focus:border-yellow-500"
                />
              </div>
            </div>
          )}

          {/* Step 5: Projet */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Votre projet est-il déjà structuré ? *
                </label>
                <select
                  value={formData.projetStructure}
                  onChange={(e) => updateFormData("projetStructure", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.projetStructure
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                  <option value="en-cours">En cours</option>
                </select>
                {errors.projetStructure && (
                  <p className="text-red-500 text-xs mt-1">{errors.projetStructure}</p>
                )}
              </div>
              {formData.projetStructure === "oui" && (
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Montant en €
                  </label>
                  <Input
                    type="number"
                    placeholder="Montant en €"
                    value={formData.montant}
                    onChange={(e) => updateFormData("montant", e.target.value)}
                    className="border-yellow-500/30 focus:border-yellow-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Avez-vous un business plan ou une présentation à partager ? *
                </label>
                <select
                  value={formData.businessPlan}
                  onChange={(e) => updateFormData("businessPlan", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.businessPlan
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non, pas encore</option>
                </select>
                {errors.businessPlan && (
                  <p className="text-red-500 text-xs mt-1">{errors.businessPlan}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Quel est votre horizon de mise en œuvre ? *
                </label>
                <select
                  value={formData.horizonMiseEnOeuvre}
                  onChange={(e) => updateFormData("horizonMiseEnOeuvre", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.horizonMiseEnOeuvre
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="immediat">Immédiat</option>
                  <option value="3-mois">Sous 3 mois</option>
                  <option value="6-mois">Sous 6 mois</option>
                  <option value="12-mois">Sous 12 mois</option>
                  <option value="a-definir">À définir ensemble</option>
                </select>
                {errors.horizonMiseEnOeuvre && (
                  <p className="text-red-500 text-xs mt-1">{errors.horizonMiseEnOeuvre}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Ressources */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Nom de l&apos;entreprise
                </label>
                <Input
                  placeholder="Nom de l&apos;entreprise"
                  value={formData.nomEntreprise}
                  onChange={(e) => updateFormData("nomEntreprise", e.target.value)}
                  className="border-yellow-500/30 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Secteur d&apos;activité
                </label>
                <Input
                  placeholder="Secteur d&apos;activité"
                  value={formData.secteurActiviteEntreprise}
                  onChange={(e) => updateFormData("secteurActiviteEntreprise", e.target.value)}
                  className="border-yellow-500/30 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Objet du rendez-vous *
                </label>
                <select
                  value={formData.objetRendezVous}
                  onChange={(e) => updateFormData("objetRendezVous", e.target.value)}
                  className={cn(
                    "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    errors.objetRendezVous
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-yellow-500/30 focus-visible:ring-yellow-500"
                  )}
                >
                  <option value="">Sélectionnez un objet</option>
                  <option value="investissement">Investissement</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
                {errors.objetRendezVous && (
                  <p className="text-red-500 text-xs mt-1">{errors.objetRendezVous}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Créneau souhaité *
                </label>
                <Input
                  type="datetime-local"
                  placeholder="mm/dd/yyyy --:-- --"
                  value={formData.creneauSouhaite}
                  onChange={(e) => updateFormData("creneauSouhaite", e.target.value)}
                  className={cn(
                    "border-yellow-500/30 focus:border-yellow-500",
                    errors.creneauSouhaite && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.creneauSouhaite && (
                  <p className="text-red-500 text-xs mt-1">{errors.creneauSouhaite}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Message */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Message libre (facultatif mais recommandé)
                </label>
                <textarea
                  placeholder="Précisez ce qui vous semble important à savoir sur vous ou votre projet"
                  value={formData.message}
                  onChange={(e) => updateFormData("message", e.target.value)}
                  rows={6}
                  className="flex w-full rounded-lg border border-yellow-500/30 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 resize-y"
                />
              </div>
              <div className="space-y-4">
                <label className={cn(
                  "flex items-start gap-3 cursor-pointer",
                  errors.accepteDonnees && "text-red-500"
                )}>
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
                      "w-4 h-4 mt-1 text-yellow-500 border-rail rounded focus:ring-yellow-500",
                      errors.accepteDonnees && "border-red-500"
                    )}
                  />
                  <span className="text-sm text-ink">
                    J&apos;accepte que mes données soient utilisées pour être recontacté(e) dans le cadre de ce projet ***
                  </span>
                </label>
                {errors.accepteDonnees && (
                  <p className="text-red-500 text-xs mt-1 ml-7">{errors.accepteDonnees}</p>
                )}
                <label className={cn(
                  "flex items-start gap-3 cursor-pointer",
                  errors.reconnaitSelection && "text-red-500"
                )}>
                  <input
                    type="checkbox"
                    checked={formData.reconnaitSelection}
                    onChange={(e) => {
                      updateFormData("reconnaitSelection", e.target.checked);
                      if (errors.reconnaitSelection) {
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.reconnaitSelection;
                          return newErrors;
                        });
                      }
                    }}
                    className={cn(
                      "w-4 h-4 mt-1 text-yellow-500 border-rail rounded focus:ring-yellow-500",
                      errors.reconnaitSelection && "border-red-500"
                    )}
                  />
                  <span className="text-sm text-ink">
                    Je reconnais que L3M sélectionne ses projets avec exigence, et que le dépôt de ce formulaire ne garantit pas une collaboration ***
                  </span>
                </label>
                {errors.reconnaitSelection && (
                  <p className="text-red-500 text-xs mt-1 ml-7">{errors.reconnaitSelection}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {submitSuccess && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.
          </div>
        )}
        {submitError && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-rail/50">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
            variant="outline"
            className="px-6"
          >
            Précédent
          </Button>
          {currentStep < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 bg-ink hover:bg-ink/90 text-white"
            >
              Suivant
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.accepteDonnees || !formData.reconnaitSelection || isSubmitting}
              className="px-6 bg-ink hover:bg-ink/90 text-white"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>
          )}
        </div>
    </div>
  );
}