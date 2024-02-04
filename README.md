# vitor_sousa_blog

## Installation

### Prérequis

- [Docker](https://docs.docker.com/install/)
- [Node.js](https://nodejs.org/)

### Initialisation

```bash
# Installer les dépendences
npm i

# Populer les variables d'environnement
# Un `.env.example` a été mis à disposition à la racine du projet
cp .env.example .env
```

## Développement

### Démarer les services Docker

```bash
docker compose up
```

### Exécuter les migrations et seeds

```bash
npx knex migrate:latest
npx knex seed:run
```

### Démarrer le serveur web

```bash
npm run dev
```
