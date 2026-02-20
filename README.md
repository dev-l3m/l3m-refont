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
├── app/                    # Pages Next.js (App Router)
│   ├── admin/             # Panel d'administration
│   ├── api/               # Routes API
│   ├── actualites/        # Pages actualités
│   ├── contact/           # Page contact
│   ├── expertises/        # Pages expertises
│   ├── filiales/          # Pages filiales
│   └── groupe/            # Page groupe
├── components/            # Composants React
│   ├── animations/       # Composants d'animation
│   ├── contact/          # Composants contact
│   ├── layout/           # Header, Footer
│   ├── sections/         # Sections homepage
│   └── ui/               # Composants UI réutilisables
├── lib/                  # Utilitaires
│   ├── prisma.ts         # Client Prisma
│   └── utils.ts          # Fonctions utilitaires
├── prisma/               # Configuration Prisma
│   ├── schema.prisma    # Schema de base de données
│   └── seed.ts          # Script de seed
└── public/               # Assets statiques
```

## 🗄 Base de Données

### Modèles Prisma

- **Page**: Pages du site avec SEO
- **Section**: Sections de pages (homepage)
- **Expertise**: Domaines d'expertise
- **Subsidiary**: Filiales du groupe
- **Post**: Articles d'actualité
- **TeamMember**: Membres de l'équipe
- **Metric**: Chiffres clés
- **SiteSettings**: Paramètres du site
- **User**: Utilisateurs admin

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

### Palette de Couleurs

- **Primary**: Noir profond (#1a1a1a)
- **Accent**: Or corporate (#d4af37)
- **Muted**: Gris clair (#f5f5f5)

### Composants UI

Tous les composants UI sont dans `components/ui/` :
- Button
- Card
- Input
- Textarea
- Label

## 🔐 Administration

L'admin panel est accessible sur `/admin` (authentification à implémenter).

### Fonctionnalités Admin

- ✅ Dashboard avec statistiques
- ✅ CRUD Expertises
- ✅ CRUD Filiales
- ✅ CRUD Actualités
- ✅ CRUD Équipe
- ⚠️ Authentification (à compléter)
- ⚠️ Upload d'images (à implémenter)

### Identifiants par défaut (seed)

- Email: `admin@l3m-holding.net`
- Password: `admin123`

⚠️ **À changer en production !**

## 📱 Pages du Site

- `/` - Homepage avec toutes les sections
- `/groupe` - Présentation du groupe
- `/expertises` - Liste des expertises
- `/expertises/[slug]` - Détail d'une expertise
- `/filiales` - Liste des filiales
- `/filiales/[slug]` - Détail d'une filiale
- `/actualites` - Liste des actualités
- `/actualites/[slug]` - Détail d'un article
- `/contact` - Formulaire de contact

## 🔍 SEO

Le site inclut :

- ✅ Metadata dynamique par page
- ✅ OpenGraph tags
- ✅ Twitter Cards
- ✅ Sitemap.xml automatique
- ✅ Robots.txt
- ⚠️ Structured Data JSON-LD (à compléter)

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement :
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SITE_URL`
3. Vercel détectera automatiquement Next.js et déploiera

### Variables d'environnement Production

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_URL="https://www.l3m-holding.net"
NEXTAUTH_URL="https://www.l3m-holding.net"
NEXTAUTH_SECRET="your-secret-key"
```

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
- `npm run db:migrate` - Créer une migration Prisma
- `npm run db:push` - Appliquer le schema sans migration
- `npm run db:seed` - Seed la base de données
- `npm run db:studio` - Ouvrir Prisma Studio

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

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🔄 Prochaines Étapes

- [ ] Implémenter l'authentification complète (NextAuth.js)
- [ ] Ajouter l'upload d'images (Cloudinary/S3)
- [ ] Implémenter l'envoi d'emails (Resend/SendGrid)
- [ ] Ajouter les Structured Data JSON-LD
- [ ] Optimiser les images (next/image)
- [ ] Ajouter les tests (Jest/Vitest)
- [ ] Implémenter le cache (Redis)
- [ ] Ajouter l'internationalisation (i18n)

## 📄 Licence

Propriétaire - L3M Holding

## 👥 Équipe

Développé pour L3M Holding

---

Pour toute question ou support, contactez l'équipe de développement.
