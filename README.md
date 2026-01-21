# Ch3rry Pi3 Website

Public marketing site for Ch3rry Pi3 AI Consulting.

## Live Site

https://www.ch3rry-pi3.com

## Overview

This repository contains the production website for the AI and machine learning consultancy, focused on fast performance, clear messaging, and a modern dark UI.

## Features

- Marketing pages: Home, Services, About, Contact
- Responsive navigation with mobile menu
- Contact form with server-side validation and Resend email delivery
- Anti-spam honeypot, human-check challenge, rate limiting, and disposable email filtering
- SEO metadata with canonical URLs (NEXT_PUBLIC_SITE_URL-aware)
- App Router architecture with server components by default

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Resend (transactional email delivery)
- Vercel (hosting and deployments)

## Social Previews

- Open Graph image: `public/opengraph-image.png`
- Twitter image: `public/twitter-image.png`
- Quick check: `https://www.ch3rry-pi3.com/opengraph-image.png` and `https://www.ch3rry-pi3.com/twitter-image.png`

## Architecture (high level)

```mermaid
flowchart LR
  visitor[Visitor] --> site[Next.js site]
  site --> api["/api/contact"]
  api --> resend[Resend]
  resend --> inbox[Inbox]
```

## Documentation

Setup, deployment, and DNS details live in `guides/setup.md`.
