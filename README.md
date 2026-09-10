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
- **VIZEON lead agent** — primární zpracování kontaktního formuláře
- **Resend** — e-maily z rezervací; u kontaktního formuláře záložní cesta,
  když lead agent poptávku nepřevezme
- **Zod** + **React Hook Form** — validace

## Proměnné prostředí

Zkopíruj `.env.example` → `.env.local` a vyplň:

| Proměnná | Popis |
|---|---|
| `RESEND_API_KEY` | API klíč z [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Email pro příjem zpráv z formuláře |
| `LEAD_AGENT_URL` | Serverová URL lead-agent endpointu včetně `/api/leads` |
| `LEAD_AGENT_API_KEY` | Sdílený API klíč pro serverové volání lead agenta |

Na Vercelu nastav v **Settings → Environment Variables**.

## Deploy

Nasazeno na **Vercel** (region `fra1` – Frankfurt).  
Každý push na `main` → automatický deployment.
