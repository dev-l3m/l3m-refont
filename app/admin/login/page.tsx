"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de la connexion");
        return;
      }

      // Rediriger vers le dashboard
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <div className="w-full max-w-md px-6 lg:px-8">
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
                Connexion Administrateur
              </h1>
              <p className="font-sans text-base text-ink/70">
                Accédez au tableau de bord L3M
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
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email
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
                    Mot de passe
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
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </Button>
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
