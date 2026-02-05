# Les Pluies de Juillet - Plateforme de Conférences

Application de gestion et réservation de conférences pour le festival "Les Pluies de Juillet", développée avec Next.js 16, Better Auth et Drizzle ORM.

## 🛠 Technologies

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Authentification** : [Better Auth](https://better-auth.com/)
- **Base de données** : [PostgreSQL](https://www.postgresql.org/)
- **IRM** : [Drizzle ORM](https://orm.drizzle.team/)
- [Shadcn UI](https://ui.shadcn.com/)
- **Validation** : [Zod](https://zod.dev/)

## Base de données avec Docker

Pour lancer la base de données PostgreSQL rapidement avec Docker :

```bash
docker compose up -d
```

Cela démarrera un conteneur PostgreSQL accessible sur le port 5432.
Les identifiants sont définis dans `docker-compose.yml` (par défaut : user/password `postgres`).

## 🚀 Prérequis

- Node.js 20+
- pnpm (recommandé) ou npm
- Une base de données PostgreSQL (locale ou Docker)

  ```bash
  git clone https://github.com/bastiencouder/pluiesdejuillet.git
  ```

  ```bash
  cd pluiesdejuillet
  ```

  ```bash
  pnpm install
  ```

3.  **Configuration des variables d'environnement**

    Copiez le fichier `.env.example` vers `.env` et remplissez les valeurs :

    ```bash
    cp .env.example .env
    ```

    **Variables requises :**

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/pluies-de-juillet"
    BETTER_AUTH_SECRET="votre_secret_généré"
    BETTER_AUTH_URL="http://localhost:3000" # En local
    ```

4.  **Base de données**

    Poussez le schéma vers votre base de données :

    ```bash
    pnpm db:push
    ```

    (Optionnel) Seeder la base de données avec des données de test :

    ```bash
    pnpm db:seed
    ```

## 🏃‍♂️ Démarrage

Lancez le serveur de développement :

```bash
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📜 Scripts Disponibles

- `pnpm dev` : Lance le serveur de développement (avec Turbopack).
- `pnpm build` : Compile l'application pour la production.
- `pnpm start` : Lance l'application en mode production.
- `pnpm lint` : Vérifie le code avec ESLint.
- `pnpm db:push` : Synchronise le schéma Drizzle avec la base de données.
- `pnpm db:studio` : Ouvre Drizzle Studio pour visualiser les données.

## 🔒 Sécurité & Accessibilité

- **Authentification** : Sécurisée par Better Auth avec rate limiting.
- **Accessibilité** : Respect des normes WCAG (attributs ARIA, contraste, navigation clavier).
- **Architecture** : Separation of concerns (API routes vs Server Actions vs Client Components).

## 📄 Licence

Ce projet est sous licence MIT.
