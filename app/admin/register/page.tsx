"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";

export const dynamic = 'force-dynamic';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de la création du compte");
        return;
      }

      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-ink/70">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <div className="w-full max-w-md px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white rounded-lg shadow-xl border border-rail/50 p-8 lg:p-12">
              <div className="flex justify-center mb-8">
                <Image
                  src="/assets/logo/logo_l3m.png"
                  alt="L3M Holding"
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center">
                <h1 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-3">
                  Accès refusé
                </h1>
                <p className="font-sans text-base text-ink/70 mb-6">
                  Vous devez être connecté en tant qu&apos;administrateur pour créer un nouveau compte.
                </p>
                <Button
                  onClick={() => router.push("/admin/login")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Se connecter
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand py-12 scroll-invisible">
      <div className="w-full max-w-md px-6 lg:px-8 my-auto">
        <FadeIn>
          <div className="bg-white rounded-lg shadow-xl border border-rail/50 p-8 lg:p-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/assets/logo/logo_l3m.png"
                alt="L3M Holding"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-3">
                Créer un compte administrateur
              </h1>
              <p className="font-sans text-base text-ink/70">
                Ajoutez un nouvel administrateur à l&apos;équipe
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    Nom (optionnel)
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-rail/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-rail/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="admin@l3m-holding.net"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-ink mb-2">
                    Mot de passe * <span className="text-xs text-ink/50">(minimum 8 caractères)</span>
                  </label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-rail/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-rail/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 border-rail/50 text-ink hover:bg-sand"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Création...
                    </span>
                  ) : (
                    "Créer le compte"
                  )}
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-ink/50 font-sans">
                © {new Date().getFullYear()} L3M Holding. Tous droits réservés.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
