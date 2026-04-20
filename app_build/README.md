# Stadium Pulse (Physical Event Experience)

A modern, high-fidelity web application built to transform the physical event and stadium experience. Features include live queue-aware routing, real-time concessions ordering, and active event coordination utilizing a full Next.js and Prisma architecture.

## 🚀 Technologies

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js Server Components / Actions
- **Database:** Prisma ORM connected to PostgreSQL (Neon)
- **Deployment:** Google Cloud Run

## 🛠️ Local Development

### 1. Prerequisites
Ensure you have Node.js and `npm` installed. You will also need a PostgreSQL database URL.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root codebase directory (`app_build/.env`) and add your database connections:
```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://user:password@host/db?sslmode=require&channel_binding=require"
```

### 4. Database Setup
Run the following commands to construct the database schema and populate it with the mock stadium demo data:
```bash
npm run db:setup
```
*(This automatically runs `prisma db push` and `node prisma/seed.js` to create mock event data).*

If you ever see a `Cannot find module '.prisma/client'` error, you need to re-generate the Prisma client explicitly:
```bash
npx prisma generate
```

### 5. Start the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the running dashboard.

## ☁️ Deployment (Google Cloud Run)

This project has been explicitly optimized for building and deploying to Google Cloud Run using natively supported Cloud Buildpacks. The `build` script in `package.json` integrates `prisma generate` to ensure type-safe database queries work out-of-the-box in the serverless container.

### Deploying via Google Cloud CLI

To deploy manually, ensure you have the `gcloud` CLI installed and authenticated. From the `app_build` directory, execute:

```bash
gcloud run deploy physical-event-demo \
  --source . \
  --project <your-project-id> \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="DATABASE_URL=your_neon_url_here,DIRECT_URL=your_neon_url_here" \
  --set-build-env-vars="DATABASE_URL=your_neon_url_here,DIRECT_URL=your_neon_url_here"
```

> **Important**: You MUST pass the database URLs into both `--set-env-vars` (for the production runtime backend) AND `--set-build-env-vars` (so Next.js can safely pre-render static routing pages during the containerization step without failing).
