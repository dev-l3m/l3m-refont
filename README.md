# L3M Holding - Site Web Refondu

Refonte complète du site web de L3M Holding avec Next.js 14, TypeScript, TailwindCSS et Prisma.

## 🚀 Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod

## 📋 Prérequis

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 🛠 Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd l3m-refont
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**

Créer un fichier `.env` à la racine du projet :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/l3m_holding?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. **Initialiser la base de données**
```bash
# Créer les migrations
npm run db:migrate

# Seed la base de données avec les données initiales
npm run db:seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
l3m-refont/
├── app/                          # Pages Next.js (App Router)
│   ├── (site)/                  # Layout group pour le site
│   │   ├── panel-views.tsx      # Vues des panels
│   │   └── rails-shell.tsx      # Shell avec rails
│   ├── admin/                   # Panel d'administration
│   │   ├── appointments/        # Gestion des rendez-vous
│   │   ├── expertises/         # Gestion des expertises
│   │   ├── filiales/           # Gestion des filiales
│   │   ├── login/              # Page de connexion
│   │   ├── newsletter/         # Gestion newsletter
│   │   ├── posts/              # Gestion des actualités
│   │   ├── register/           # Page d'inscription admin
│   │   ├── team/               # Gestion de l'équipe
│   │   ├── users/              # Gestion des utilisateurs
│   │   ├── dashboard-charts.tsx # Graphiques du dashboard
│   │   ├── layout.tsx          # Layout admin
│   │   └── page.tsx            # Dashboard principal
│   ├── about/                  # Page À propos
│   ├── solutions/              # Page Solutions
│   ├── api/                    # Routes API
│   │   ├── admin/              # Routes admin
│   │   │   └── users/          # Gestion utilisateurs API
│   │   ├── appointments/       # API rendez-vous
│   │   ├── auth/               # Authentification API
│   │   └── newsletter/         # API newsletter
│   │       ├── campaigns/      # Campagnes newsletter
│   │       ├── subscribe/      # Inscription newsletter
│   │       └── subscribers/    # Abonnés newsletter
│   ├── globals.css             # Styles globaux
│   ├── layout.tsx              # Layout racine
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # Page 404
│   ├── robots.ts               # Robots.txt
│   └── sitemap.ts              # Sitemap.xml
├── components/                 # Composants React
│   ├── animations/            # Composants d'animation
│   │   ├── counter.tsx        # Compteur animé
│   │   └── fade-in.tsx        # Animation fade-in
│   ├── effects/               # Effets visuels
│   │   └── dot-cursor.tsx     # Curseur personnalisé
│   ├── forms/                 # Formulaires
│   │   └── appointment-form.tsx # Formulaire rendez-vous
│   ├── home/                  # Composants homepage
│   │   └── editorial-hero.tsx
│   ├── layout/                # Layout components
│   │   ├── conditional-rails-shell.tsx
│   │   ├── footer.tsx          # Footer avec newsletter
│   │   ├── newsletter-form.tsx # Formulaire newsletter
│   │   ├── panels-wrapper.tsx
│   │   └── rails-layout-client.tsx
│   ├── sections/              # Sections homepage
│   │   ├── about.tsx
│   │   ├── adn-l3m-holding.tsx
│   │   ├── collaborators.tsx
│   │   ├── contact.tsx
│   │   ├── joinus.tsx
│   │   ├── metrics.tsx
│   │   ├── mission.tsx
│   │   └── partners.tsx
│   ├── transitions/           # Transitions
│   │   ├── panels-slider.tsx
│   │   └── transition-link.tsx
│   ├── ui/                    # Composants UI réutilisables
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── confirm-dialog.tsx # Dialog de confirmation
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── scroll-to-top.tsx
│   │   ├── select.tsx         # Select avec flags pays
│   │   ├── textarea.tsx
│   │   ├── toast.tsx          # Toast notifications
│   │   └── toaster.tsx
│   ├── country-select.tsx     # Sélecteur de pays avec drapeaux
│   ├── contact-link.tsx
│   ├── solutions-cta-button.tsx
│   └── structured-data.tsx    # Données structurées SEO
├── hooks/                     # React Hooks personnalisés
│   └── use-toast.ts           # Hook pour les toasts
├── lib/                       # Utilitaires
│   ├── auth-server.ts         # Auth côté serveur
│   ├── auth.ts                # Auth côté client
│   ├── constants.ts            # Constantes
│   ├── prisma.ts              # Client Prisma
│   ├── structured-data.ts     # Génération données structurées
│   └── utils.ts               # Fonctions utilitaires
├── prisma/                    # Configuration Prisma
│   ├── migrations/           # Migrations Prisma
│   ├── schema.prisma         # Schema de base de données
│   └── seed.ts               # Script de seed
├── public/                    # Assets statiques
│   └── assets/
│       ├── logo/             # Logos L3M
│       └── logo-partners/    # Logos partenaires
├── src/                       # Contenu statique
│   └── content/              # Contenu legacy
├── types/                     # Types TypeScript
│   └── index.ts
├── middleware.ts              # Middleware Next.js
├── tailwind.config.ts         # Configuration TailwindCSS
└── tsconfig.json              # Configuration TypeScript
```

## 🗄 Base de Données

### Modèles Prisma

- **User**: Utilisateurs admin
- **Page**: Pages du site avec SEO
- **Section**: Sections de pages (homepage)
- **SiteSettings**: Paramètres du site
- **Metric**: Chiffres clés
- **AppointmentRequest**: Demandes de rendez-vous (formulaire multi-étapes)
- **NewsletterSubscriber**: Abonnés à la newsletter
- **NewsletterCampaign**: Campagnes d'envoi newsletter

### Commandes Prisma

```bash
# Créer une migration
npm run db:migrate

# Appliquer les changements sans migration
npm run db:push

# Ouvrir Prisma Studio (interface graphique)
npm run db:studio

# Seed la base de données
npm run db:seed
```

## 🎨 Design System

### Palette de Couleurs (Charte L3M)

- **Sand**: Beige sable (#E7E2D6) - Fond principal
- **Ink**: Marron foncé (#2B1F1A) - Texte principal
- **Accent**: Or L3M (#BBA437) - Couleur d'accentuation
  - Light: (#FFD700)
  - Dark: (#FFA000)
- **Rail**: Beige rail (#D8D1C4) - Bordures et séparateurs
- **Muted**: Gris-marron (#6E625A) - Texte secondaire

### Polices

- **Sans-serif**: Inter (police par défaut)
- **Serif/Display**: Cormorant Garamond (titres et éléments éditoriaux)

### Composants UI

Tous les composants UI sont dans `components/ui/` :
- **Button**: Boutons avec variantes
- **Card**: Cartes avec ombres et bordures
- **Input**: Champs de saisie
- **Textarea**: Zones de texte
- **Label**: Labels de formulaire
- **Dialog**: Modales (Radix UI)
- **Select**: Sélecteurs avec support drapeaux pays
- **Toast**: Notifications toast (top-right)
- **ConfirmDialog**: Dialog de confirmation personnalisé

## 🔐 Administration

L'admin panel est accessible sur `/admin` (authentification à implémenter).

### Fonctionnalités Admin

- ✅ Dashboard avec statistiques et graphiques (Chart.js)
- ✅ Gestion des utilisateurs (CRUD)
- ✅ Gestion des rendez-vous (AppointmentRequest)
  - Visualisation détaillée
  - Changement de statut
  - Suppression avec confirmation
- ✅ Gestion Newsletter
  - Liste des abonnés
  - Activation/Désactivation d'abonnés
  - Suppression d'abonnés
  - Création et envoi de campagnes
- ✅ CRUD Expertises
- ✅ CRUD Filiales
- ✅ CRUD Actualités
- ✅ CRUD Équipe
- ✅ Authentification (login/register)
- ⚠️ Upload d'images (à implémenter)

### Identifiants par défaut (seed)

- Email: `admin@l3m-holding.net`
- Password: `admin123`

⚠️ **À changer en production !**

## 📱 Pages du Site

### Pages Publiques

- `/` - Homepage avec toutes les sections (hero, mission, métriques, expertises, filiales, équipe, partenaires, contact)
- `/about` - Page À propos avec historique et valeurs L3M
- `/solutions` - Page Solutions avec vision et domaines d'intervention
- `/contact` - Section contact intégrée dans la homepage

### Pages Admin

- `/admin` - Dashboard avec statistiques
- `/admin/appointments` - Gestion des demandes de rendez-vous
- `/admin/newsletter` - Gestion newsletter (abonnés et campagnes)
- `/admin/users` - Gestion des utilisateurs
- `/admin/expertises` - Gestion des expertises
- `/admin/filiales` - Gestion des filiales
- `/admin/posts` - Gestion des actualités
- `/admin/team` - Gestion de l'équipe
- `/admin/login` - Connexion admin
- `/admin/register` - Inscription admin

## 🔍 SEO

Le site inclut :

- ✅ Metadata dynamique par page
- ✅ OpenGraph tags
- ✅ Twitter Cards
- ✅ Sitemap.xml automatique
- ✅ Robots.txt
- ✅ Structured Data JSON-LD (Organization, WebSite)


### Build Production

```bash
npm run build
npm start
```

## 📝 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm start` - Serveur de production
- `npm run lint` - Linter ESLint
- `npm run lint:fix` - Linter ESLint avec correction automatique
- `npm run type-check` - Vérification TypeScript (sans build)
- `npm run db:migrate` - Créer une migration Prisma
- `npm run db:push` - Appliquer le schema sans migration
- `npm run db:seed` - Seed la base de données
- `npm run db:studio` - Ouvrir Prisma Studio
- `npm run pre-commit` - Vérifications avant commit (lint-staged)
- `npm run pre-push` - Vérifications avant push (type-check + lint)

## 🔍 Vérifications de Code (Code Review & CI/CD)

Le projet inclut des vérifications automatiques de code pour maintenir la qualité. Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour le guide complet.

### Hooks Git (Husky)

- **Pre-commit** : Exécute `lint-staged` pour vérifier et corriger automatiquement les fichiers modifiés
- **Pre-push** : Exécute la vérification TypeScript et ESLint avant chaque push

### GitHub Actions

Deux workflows sont configurés :

1. **CI** (`.github/workflows/ci.yml`)
   - Déclenché sur push et pull request vers `main` ou `develop`
   - Vérifie le linting et le type-check
   - Build l'application pour vérifier qu'elle compile

2. **Code Review** (`.github/workflows/code-review.yml`)
   - Déclenché sur les pull requests
   - Vérifie la qualité du code
   - Détecte les `console.log` et les commentaires `TODO/FIXME`

### Configuration lint-staged

Les fichiers modifiés sont automatiquement vérifiés avant chaque commit :
- `*.ts, *.tsx` : ESLint avec correction automatique
- `*.json, *.css, *.md` : Vérification ESLint

### Désactiver temporairement les hooks

Si nécessaire (non recommandé) :
```bash
# Pour un commit spécifique
git commit --no-verify

# Pour un push spécifique
git push --no-verify
```

## 🐛 Troubleshooting

### Erreur de connexion à la base de données

Vérifier que PostgreSQL est démarré et que `DATABASE_URL` est correct dans `.env`.

### Erreur Prisma Client

```bash
npx prisma generate
```

### Erreur de build

Vérifier que toutes les dépendances sont installées :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur dans les hooks Git

Si les hooks Husky ne fonctionnent pas :
```bash
# Réinstaller Husky
npm run prepare

# Vérifier les permissions (Linux/Mac)
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Erreur lint-staged

Si lint-staged échoue :
```bash
# Vérifier la configuration dans package.json
# Exécuter manuellement
npm run pre-commit
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🚀 Fonctionnalités Implémentées

- ✅ Newsletter avec formulaire d'inscription dans le footer
- ✅ Gestion complète des abonnés newsletter (admin)
- ✅ Campagnes newsletter (création et envoi)
- ✅ Formulaire de demande de rendez-vous multi-étapes
- ✅ Sélecteur de pays avec drapeaux (CDN)
- ✅ Système de notifications toast personnalisé
- ✅ Dialogs de confirmation personnalisés (remplacement alert/confirm)
- ✅ Animations Framer Motion sur les pages
- ✅ Dashboard admin avec graphiques Chart.js
- ✅ Design responsive et moderne
- ✅ Scrollbar invisible avec fonctionnalité de scroll maintenue

## 🔄 Prochaines Étapes

- [ ] Implémenter l'envoi d'emails newsletter (Resend/SendGrid)
- [ ] Ajouter l'upload d'images (Cloudinary/S3)
- [ ] Optimiser les images (next/image) partout
- [ ] Ajouter les tests (Jest/Vitest)
- [ ] Implémenter le cache (Redis)
- [ ] Ajouter l'internationalisation (i18n)
- [ ] Améliorer l'authentification (NextAuth.js)

## 📄 Licence

Propriétaire - L3M Holding

## 👥 Équipe

Développé pour L3M Holding

---

Pour toute question ou support, contactez l'équipe de développement.
