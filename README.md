# Ch3rry Pi3 AI Consulting Site

Public marketing site built with Next.js (App Router), TypeScript, and Tailwind.

## Getting Started

Install dependencies (including Resend):

```bash
npm install resend
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form (Resend)

### Environment variables (.env.local)

Create a `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=roger@ch3rry-pi3.com
CONTACT_FROM_EMAIL=roger@ch3rry-pi3.com
SITE_URL=https://www.ch3rry-pi3.com
```

Notes:
- `RESEND_API_KEY` is required.
- `CONTACT_TO_EMAIL` defaults to `roger@ch3rry-pi3.com`.
- `CONTACT_FROM_EMAIL` is used only if it ends with `@ch3rry-pi3.com`.
- If `CONTACT_FROM_EMAIL` is missing or not a `@ch3rry-pi3.com` address, the API will fall back to `onboarding@resend.dev` and log a warning.

### Resend domain verification

You can only send FROM `roger@ch3rry-pi3.com` after verifying `ch3rry-pi3.com` in Resend. Until then, allow the fallback to `onboarding@resend.dev` for testing.

### Vercel environment variables

Set the same variables in Vercel:

- Project Settings > Environment Variables
- Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `SITE_URL`

### Test the API locally with curl

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Ava\",\"email\":\"ava@example.com\",\"company\":\"Acme\",\"message\":\"Looking for help with an AI roadmap.\",\"website\":\"\"}"
```
