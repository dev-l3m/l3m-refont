"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AppointmentForm } from "@/components/forms/appointment-form";

interface ContactProps {
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  email?: string;
  phoneLabel?: string;
  phone?: string;
  addressLabel?: string;
  address?: string[];
  projectTitle?: string;
  projectText?: string;
  responseTime?: string;
}

export function Contact({
  title,
  subtitle,
  emailLabel,
  email,
  phoneLabel,
  phone,
  addressLabel,
  address,
  projectTitle,
  projectText,
  responseTime,
}: ContactProps) {
  const [open, setOpen] = useState(false);
  const defaultProjectTitle = "Proposez votre projet à L3M – Évaluation préliminaire de partenariat stratégique";
  const defaultProjectText = "L3M accompagne, propulse et co-construit des projets entrepreneuriaux à fort potentiel. Notre implication est sélective et exigeante, car nous choisissons uniquement des projets alignés avec nos valeurs, notre vision stratégique et notre capacité d'impact. Merci de remplir ce formulaire de manière complète et sincère.";
  const defaultResponseTime = "Délai de réponse : Nous répondons généralement aux demandes sous 48 heures pendant les jours ouvrables.";

  return (
    <section id="contact" className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        {/* Project Proposal Section */}
        <FadeIn>
          <div className="max-w-5xl mb-20">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="flex-1">
                <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                  {projectTitle || defaultProjectTitle}
                </h2>
                <p className="font-sans text-lg leading-relaxed text-ink/70 mb-8">
                  {projectText || defaultProjectText}
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0 lg:self-center">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-sans font-medium text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                      <span>Demander un rendez-vous</span>
                      <i className="fi fi-rr-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <AppointmentForm onClose={() => setOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Contact Information Section */}
        
      </div>
    </section>
  );
}
