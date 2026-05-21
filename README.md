# VIZEON — Portfolio

Moderní portfolio web postavený na **Next.js 14**, **Tailwind CSS** a **Framer Motion**.

## Lokální vývoj

```bash
npm install
cp .env.example .env.local   # vyplň hodnoty
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

## Tech stack

- **Next.js 14** App Router
- **Tailwind CSS** + **Framer Motion**
- **Resend** — kontaktní formulář
- **Zod** + **React Hook Form** — validace

## Proměnné prostředí

Zkopíruj `.env.example` → `.env.local` a vyplň:

| Proměnná | Popis |
|---|---|
| `RESEND_API_KEY` | API klíč z [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Email pro příjem zpráv z formuláře |

Na Vercelu nastav v **Settings → Environment Variables**.

## Deploy

Nasazeno na **Vercel** (region `fra1` – Frankfurt).  
Každý push na `main` → automatický deployment.
