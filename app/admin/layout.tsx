"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  Newspaper, 
  Users, 
  Settings,
  LogOut,
  Calendar,
  UserPlus,
  Mail
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  // { name: "Expertises", href: "/admin/expertises", icon: Briefcase },
  // { name: "Filiales", href: "/admin/filiales", icon: Building2 },
  // { name: "Actualités", href: "/admin/posts", icon: Newspaper },
  // { name: "Équipe", href: "/admin/team", icon: Users },
  { name: "Demandes de rendez-vous", href: "/admin/appointments", icon: Calendar },
  { name: "Demandes de partenariat", href: "/admin/partnerships", icon: Briefcase },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Utilisateurs", href: "/admin/users", icon: UserPlus },
  // { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ name: string | null; email: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setCurrentUser(data.user);
        } else {
          setIsAuthenticated(false);
          // Rediriger vers login si on n'est pas sur la page login
          if (pathname !== "/admin/login" && pathname !== "/admin/register") {
            router.push("/admin/login");
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (pathname !== "/admin/login" && pathname !== "/admin/register") {
          router.push("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Ne pas afficher le layout sur les pages login/register
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-ink">Chargement...</p>
          </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
      <div className="min-h-screen bg-sand-light">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-rail min-h-screen">
          <div className="p-6">
            <Link href="/admin" className="block mb-4">
              <Image
                src="/assets/logo/logo_l3m.png"
                alt="L3M Holding"
                width={120}
                height={40}
                className="object-contain mx-auto"
                priority
              />
            </Link>
            {currentUser && (
              <p className="text-sm text-muted mx-auto text-center">
                <span className="font-medium">{currentUser.name || currentUser.email}</span>
              </p>
            )}
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-250 ${
                    isActive
                      ? "bg-[#BBA437] text-ink shadow-sm"
                      : "text-ink hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-64 p-4 border-t border-rail">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
