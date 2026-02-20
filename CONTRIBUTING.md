# Guide de Contribution

Ce document décrit les processus de contribution et les vérifications de code automatiques du projet.

## 🔍 Vérifications Automatiques

### Avant chaque commit (Pre-commit Hook)

Lorsque vous faites un `git commit`, les hooks Git exécutent automatiquement :

1. **lint-staged** : Vérifie et corrige automatiquement les fichiers modifiés
   - ESLint sur les fichiers `.ts` et `.tsx`
   - Correction automatique des erreurs de formatage

### Avant chaque push (Pre-push Hook)

Lorsque vous faites un `git push`, les hooks Git exécutent :

1. **Type Check** : Vérifie que le code TypeScript compile sans erreurs
2. **Lint** : Vérifie que le code respecte les règles ESLint

### Sur GitHub (CI/CD)

Lors de chaque push ou pull request vers `main` ou `develop` :

1. **CI Workflow** :
   - Installation des dépendances
   - Génération du client Prisma
   - Vérification ESLint
   - Vérification TypeScript
   - Build de l'application

2. **Code Review Workflow** (sur les PR uniquement) :
   - Vérifications de qualité de code
   - Détection de `console.log` (avertissement)
   - Détection de commentaires `TODO/FIXME` (info)

## 📋 Processus de Contribution

### 1. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 2. Faire vos modifications

Éditez les fichiers nécessaires.

### 3. Commiter vos changements

```bash
git add .
git commit -m "feat: ajout de la nouvelle fonctionnalité"
```

Les hooks pre-commit s'exécuteront automatiquement. Si des erreurs sont détectées, corrigez-les avant de commiter.

### 4. Pousser vers GitHub

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

Les hooks pre-push s'exécuteront automatiquement. Si des erreurs sont détectées, corrigez-les avant de pousser.

### 5. Créer une Pull Request

Créez une PR sur GitHub. Les workflows CI/CD s'exécuteront automatiquement et vérifieront votre code.

## ✅ Checklist avant de créer une PR

- [ ] Le code compile sans erreurs (`npm run build`)
- [ ] Les vérifications TypeScript passent (`npm run type-check`)
- [ ] Le linting passe (`npm run lint`)
- [ ] Aucun `console.log` dans le code de production
- [ ] Les tests passent (si applicable)
- [ ] La documentation est à jour (si nécessaire)

## 🛠 Commandes Utiles

### Vérifications manuelles

```bash
# Vérifier le linting
npm run lint

# Corriger automatiquement les erreurs de linting
npm run lint:fix

# Vérifier les types TypeScript
npm run type-check

# Build complet
npm run build
```

### Désactiver temporairement les hooks (non recommandé)

```bash
# Pour un commit spécifique
git commit --no-verify

# Pour un push spécifique
git push --no-verify
```

⚠️ **Attention** : Utilisez `--no-verify` uniquement en cas d'urgence. Les vérifications sont là pour maintenir la qualité du code.

## 📝 Conventions de Commit

Utilisez des messages de commit clairs et descriptifs :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage (sans changement de code)
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Tâches de maintenance

Exemple :
```
feat: ajout du formulaire de newsletter dans le footer
fix: correction de l'affichage des drapeaux dans le sélecteur de pays
docs: mise à jour du README avec les nouvelles fonctionnalités
```

## 🐛 Résolution de Problèmes

### Les hooks ne s'exécutent pas

```bash
# Réinstaller Husky
npm run prepare
```

### Erreur de lint-staged

Vérifiez que tous les fichiers modifiés sont correctement formatés :
```bash
npm run lint:fix
```

### Erreur de type-check

Vérifiez les erreurs TypeScript :
```bash
npm run type-check
```

## 📚 Ressources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
