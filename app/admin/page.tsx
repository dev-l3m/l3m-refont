import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, UserPlus, Users, Mail, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DashboardCharts } from "./dashboard-charts";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  const [
    appointmentsCount,
    pendingAppointmentsCount,
    reviewedAppointmentsCount,
    contactedAppointmentsCount,
    usersCount,
    recentAppointments,
  ] = await Promise.all([
    prisma.appointmentRequest.count(),
    prisma.appointmentRequest.count({ where: { status: "pending" } }),
    prisma.appointmentRequest.count({ where: { status: "reviewed" } }),
    prisma.appointmentRequest.count({ where: { status: "contacted" } }),
    prisma.user.count({ where: { role: "admin" } }),
    prisma.appointmentRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        nom: true,
        email: true,
        titreProjet: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  // Récupérer les statistiques newsletter si les modèles existent
  let newsletterSubscribersCount = 0;
  let activeNewsletterSubscribersCount = 0;
  let newsletterCampaignsCount = 0;
  let recentNewsletterSubscribers = 0;

  try {
    const [
      totalSubscribers,
      activeSubscribers,
      campaigns,
    ] = await Promise.all([
      (prisma as any).newsletterSubscriber?.count() || Promise.resolve(0),
      (prisma as any).newsletterSubscriber?.count({ where: { active: true } }) || Promise.resolve(0),
      (prisma as any).newsletterCampaign?.count() || Promise.resolve(0),
    ]);

    newsletterSubscribersCount = totalSubscribers || 0;
    activeNewsletterSubscribersCount = activeSubscribers || 0;
    newsletterCampaignsCount = campaigns || 0;

    // Statistiques des 7 derniers jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recent = await (prisma as any).newsletterSubscriber?.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    }) || Promise.resolve(0);
    
    recentNewsletterSubscribers = recent || 0;
  } catch (error) {
    // Les modèles n'existent pas encore, on utilise des valeurs par défaut
    console.log("Newsletter models not available yet");
  }

  // Valeur par défaut pour l'équipe
  const teamCount = 0;

  // Données pour les graphiques
  const appointmentsByStatus = [
    { status: "En attente", count: pendingAppointmentsCount, color: "#BBA437" },
    { status: "Consulté", count: reviewedAppointmentsCount, color: "#BBA437" },
    { status: "Contacté", count: contactedAppointmentsCount, color: "#10B981" },
  ];


  const stats = [
    {
      name: "Demandes de rendez-vous",
      value: appointmentsCount,
      icon: Calendar,
      href: "/admin/appointments",
      badge: pendingAppointmentsCount > 0 ? pendingAppointmentsCount : undefined,
      color: "bg-[#BBA437]",
      textColor: "text-ink",
      trend: null,
    },
    {
      name: "Newsletter",
      value: activeNewsletterSubscribersCount,
      icon: Mail,
      href: "/admin/newsletter",
      badge: null,
      color: "bg-accent",
      textColor: "text-ink",
      trend: recentNewsletterSubscribers > 0 ? `+${recentNewsletterSubscribers} cette semaine` : null,
    },
    {
      name: "Utilisateurs Admin",
      value: usersCount,
      icon: UserPlus,
      href: "/admin/users",
      badge: null,
      color: "bg-ink",
      textColor: "text-white",
      trend: null,
    },
    {
      name: "Équipe",
      value: teamCount,
      icon: Users,
      href: "/admin/team",
      badge: null,
      color: "bg-muted",
      textColor: "text-white",
      trend: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
          <p className="text-muted mt-1">Vue d&apos;ensemble de votre administration</p>
        </div>
        <div className="text-sm text-muted font-medium">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-rail group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-ink">{stat.name}</CardTitle>
                <div className={`${stat.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-ink">{stat.value}</div>
                  {stat.badge && (
                    <span className="bg-[#BBA437] text-ink text-xs font-semibold px-2 py-1 rounded-full">
                      {stat.badge} en attente
                    </span>
                  )}
                </div>
                {stat.trend && (
                  <p className="text-xs text-muted mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <DashboardCharts
        appointmentsByStatus={appointmentsByStatus}
        newsletterStats={{
          total: newsletterSubscribersCount,
          active: activeNewsletterSubscribersCount,
          campaigns: newsletterCampaignsCount,
          recent: recentNewsletterSubscribers,
        }}
      />

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-ink">Demandes récentes</CardTitle>
            <Link
              href="/admin/appointments"
              className="text-sm text-accent hover:text-accent-dark transition-colors"
            >
              Voir tout →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentAppointments.length === 0 ? (
            <div className="text-center py-8 text-muted">
              Aucune demande récente
            </div>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment: {
                id: string;
                nom: string;
                email: string;
                titreProjet: string;
                status: string;
                createdAt: Date;
              }) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-rail hover:bg-sand-light transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-ink">{appointment.nom}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "pending"
                            ? "bg-[#BBA437]/20 text-[#BBA437]"
                            : appointment.status === "reviewed"
                            ? "bg-accent/20 text-accent"
                            : appointment.status === "contacted"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status === "pending"
                          ? "En attente"
                          : appointment.status === "reviewed"
                          ? "Consulté"
                          : appointment.status === "contacted"
                          ? "Contacté"
                          : "Archivé"}
                      </span>
                    </div>
                    <p className="text-sm text-muted mt-1">{appointment.titreProjet}</p>
                    <p className="text-xs text-muted mt-1">{appointment.email}</p>
                  </div>
                  <div className="text-xs text-muted">
                    {new Date(appointment.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
