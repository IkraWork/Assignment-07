# 🛒 বাজার দর (BazarDor)

BazarDor is a responsive Bangladeshi market-price tracker. It shows today's prices of everyday essentials such as rice, vegetables, fish and meat, how much each price moved, and a market-by-market breakdown for every product.

## Technologies Used

- Next.js 15 (App Router) and React 19
- Tailwind CSS 4 and DaisyUI 5
- BetterAuth (email/password, Google, GitHub) with MongoDB
- react-hot-toast

## Key Features

1. Live price ticker, hero banner, and sections for top risers, top fallers, and all products
2. Category pages with price sorting that handles Bengali numerals numerically
3. Protected product details page with minimum, maximum, and average price plus per-market prices
4. Email/password and Google/GitHub authentication with toast feedback
5. Profile page with an update-name form powered by BetterAuth `updateUser`
6. Skeleton loading states, friendly 404 pages, and a fully responsive layout

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local`:

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Random secret, e.g. `openssl rand -base64 32` |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | Site URL (`http://localhost:3000` locally, the Vercel URL in production) |
| `MONGODB_URI` / `MONGODB_DB` | MongoDB connection string and database name |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

OAuth callback URLs: `<site-url>/api/auth/callback/google` and `<site-url>/api/auth/callback/github`.

## Deployment

Deploy on Vercel, add the same environment variables, and set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the production URL.

## Project Files

Design files and the original assignment brief are kept in `design/`.
