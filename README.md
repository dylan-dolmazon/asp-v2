# Projet Boilerplate Fullstack

Ce projet est une application permettant de gérer son équipe/club de Football

Créé par Dylan Dolmazon - [dylan.dolmazon@icloud.com](mailto:dylan.dolmazon@icloud.com)

## Prérequis

1.  pnpm installé globalement: `npm install -g pnpm`
2.  Base de données PostgreSQL:
    - Hôte de la base de données (DB_HOST): `localhost`
    - Port de la base de données (DB_PORT): `5432`
    - Nom d'utilisateur de la base de données (DB_USER): `dylan`
    - Mot de passe de la base de données (DB_PASSWORD): `root`
    - Nom de la base de données (DB_DATABASE): `asp-v2`

## Instructions pour lancer le projet

### Installation

1. Exécutez la commande suivante pour installer les dépendances du monorepo :

   ```bash
   pnpm install
   ```

### Lancement

1. Exécutez la commande suivante pour installer lancer le mode développement :

   ```bash
   pnpm run dev
   ```

### Informations

- Backend lancé sur `http://localhost:3333`
- Frontend lancé sur `http://localhost:3000`
- Emails lancé sur `http://localhost:3010`

## Technologies utilisées

### Backend

- **Framework Backend**: AdonisJS v6
- **Langage**: TypeScript
- **Gestionnaire de paquets**: pnpm v8.15.4

#### Bibliothèques Backend

| Bibliothèque              | Version  |
| ------------------------- | -------- |
| @adonisjs/auth            | ^9.1.x   |
| @adonisjs/core            | ^6.2.x   |
| @adonisjs/cors            | ^2.2.x   |
| @adonisjs/lucid           | ^20.1.x  |
| @vinejs/vine              | ^1.7.x   |
| luxon                     | ^3.4.x   |
| pg                        | ^8.11.x  |
| reflect-metadata          | ^0.2.x   |
| @adonisjs/assembler       | ^7.1.x   |
| @adonisjs/eslint-config   | ^1.2.x   |
| @adonisjs/prettier-config | ^1.2.x   |
| @adonisjs/tsconfig        | ^1.2.x   |
| @japa/api-client          | ^2.0.x   |
| @japa/assert              | ^2.1.x   |
| @japa/plugin-adonisjs     | ^3.0.x   |
| @japa/runner              | ^3.1.x   |
| @swc/core                 | ^1.3.x   |
| @types/luxon              | ^3.4.x   |
| @types/node               | ^20.11.x |
| eslint                    | ^8.56.x  |
| pino-pretty               | ^10.3.x  |
| prettier                  | ^3.2.x   |
| ts-node                   | ^10.9.x  |
| typescript                | ^5.3.x   |

### Frontend

- **Framework Frontend**: Nuxt.js v3
- **Langage**: JavaScript
- **Gestionnaire de paquets**: pnpm v8.15.4

#### Bibliothèques Frontend

| Bibliothèque        | Version |
| ------------------- | ------- |
| @nuxt/ui            | ^2.14.x |
| @vee-validate/nuxt  | ^4.12.x |
| @vee-validate/yup   | ^4.12.x |
| nuxt                | ^3.10.x |
| sass                | ^1.71.x |
| vue                 | ^3.4.x  |
| vue-router          | ^4.3.x  |
| yup                 | ^1.4.x  |
| @nuxtjs/tailwindcss | ^6.11.x |

### Emails

- **Framework**: MJML
- **Langage**: mjml
- **Gestionnaire de paquets**: pnpm v8.15.4

#### Bibliothèques Emails

| Bibliothèque        | Version        |
| ------------------- | -------------- |
| gulp                | ^4.0.x         |
| gulp-htmlmin        | ^4.12.x        |
| gulp-mail           | ^0.4.x         |
| gulp-mjml           | ^3.0.x         |
| gulp-string-replace | ^1.1.x         |
| babel-preset-env    | ^1.6.x         |
| babel-register      | ^6.26.x        |
| del                 | ^3.0.x         |
| fancy-log           | ^2.0.x         |
| fs                  | 0.0.1-security |
| @aws-sdk/client-s3  | ^3.511.x       |
