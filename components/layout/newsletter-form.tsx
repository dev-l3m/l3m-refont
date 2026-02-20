"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validation personnalisée avec toast au lieu du message HTML par défaut
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir une adresse email",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir une adresse email valide",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Succès",
          description: data.message || "Inscription à la newsletter réussie",
        });
        setEmail("");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error || "Une erreur est survenue",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="bg-white/10 border-sand-light/30 text-sand-light placeholder:text-sand-light/50 focus-visible:ring-accent"
          onInvalid={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FFD700] text-ink hover:bg-[#BBA437] transition-colors duration-250 font-medium"
      >
        {loading ? "Inscription..." : "S'inscrire"}
      </Button>
    </form>
  );
}
