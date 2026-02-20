"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface DashboardChartsProps {
  appointmentsByStatus: Array<{ status: string; count: number; color: string }>;
  newsletterStats: {
    total: number;
    active: number;
    campaigns: number;
    recent: number;
  };
}

export function DashboardCharts({ appointmentsByStatus, newsletterStats }: DashboardChartsProps) {
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Charger Chart.js depuis CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).Chart) {
        const Chart = (window as any).Chart;

        // Graphique en camembert pour les statuts des rendez-vous
        if (pieChartRef.current) {
          const ctx = pieChartRef.current.getContext("2d");
          if (ctx) {
            new Chart(ctx, {
              type: "doughnut",
              data: {
                labels: appointmentsByStatus.map((s) => s.status),
                datasets: [
                  {
                    data: appointmentsByStatus.map((s) => s.count),
                    backgroundColor: appointmentsByStatus.map((s) => s.color),
                    borderWidth: 0,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      padding: 15,
                      font: {
                        family: "var(--font-inter)",
                        size: 12,
                      },
                      color: "#2B1F1A",
                    },
                  },
                  tooltip: {
                    backgroundColor: "#2B1F1A",
                    padding: 12,
                    titleFont: {
                      family: "var(--font-inter)",
                      size: 14,
                    },
                    bodyFont: {
                      family: "var(--font-inter)",
                      size: 12,
                    },
                  },
                },
              },
            });
          }
        }

        // Graphique en barres pour les statistiques newsletter
        if (barChartRef.current) {
          const ctx = barChartRef.current.getContext("2d");
          if (ctx) {
            new Chart(ctx, {
              type: "bar",
              data: {
                labels: ["Total", "Actifs", "Campagnes", "Nouveaux (7j)"],
                datasets: [
                  {
                    label: "Newsletter",
                    data: [
                      newsletterStats.total,
                      newsletterStats.active,
                      newsletterStats.campaigns,
                      newsletterStats.recent,
                    ],
                    backgroundColor: ["#BBA437", "#10B981", "#FFD700", "#FFA000"],
                    borderRadius: 8,
                    borderSkipped: false,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: "#2B1F1A",
                    padding: 12,
                    titleFont: {
                      family: "var(--font-inter)",
                      size: 14,
                    },
                    bodyFont: {
                      family: "var(--font-inter)",
                      size: 12,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      font: {
                        family: "var(--font-inter)",
                        size: 12,
                      },
                      color: "#6E625A",
                    },
                    grid: {
                      color: "#D8D1C4",
                    },
                  },
                  x: {
                    ticks: {
                      font: {
                        family: "var(--font-inter)",
                        size: 12,
                      },
                      color: "#6E625A",
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
              },
            });
          }
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      // Nettoyer le script si le composant est démonté
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [appointmentsByStatus, newsletterStats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique en camembert - Statuts des rendez-vous */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-ink">
            Répartition des demandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <canvas ref={pieChartRef}></canvas>
          </div>
        </CardContent>
      </Card>

      {/* Graphique en barres - Statistiques Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-ink">
            Statistiques Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <canvas ref={barChartRef}></canvas>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
