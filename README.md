# AUTO SPOT - Premium Auto Service Website + Mini Customer Portal

High-converting automotive website built with:

- Next.js (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- React Hook Form + Zod
- Zustand
- Embla Carousel

## 1) Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run lint
npm run build
```

## 2) Project Structure

```txt
app/
  page.tsx
  services/page.tsx
  services/[slug]/page.tsx
  pricing/page.tsx
  booking/page.tsx
  quote/page.tsx
  results/page.tsx
  fleet/page.tsx
  about/page.tsx
  contact/page.tsx
  faq/page.tsx
  track/page.tsx
  api/bookings/route.ts
  api/quotes/route.ts
components/
data/
lib/
```

## 3) Edit Services, Prices, Reviews, FAQ, Gallery, Business Info

Update the following files:

- Services catalog: `data/services.ts`
- Packages/pricing: `data/packages.ts`
- Testimonials: `data/testimonials.ts`
- FAQ: `data/faqs.ts`
- Gallery images: `data/gallery.ts`
- Maintenance guide: `data/maintenanceGuide.ts`
- Business contact/hours/map: `data/business.ts`
- Shared media assets: `data/media.ts`

## 4) Replace Images, Map, Contact Details

- Replace hero/shop/team images in `data/media.ts`.
- Replace service images in `data/services.ts`.
- Replace gallery entries in `data/gallery.ts`.
- Replace logo and favicon SVG files:
  - `public/auto-spot-logo.svg`
  - `public/auto-spot-mark.svg`
  - `app/icon.svg`
- Replace map links in `data/business.ts`:
  - `mapUrl`
  - `mapEmbedUrl`
- Replace phone/email/address/WhatsApp in `data/business.ts`.

## 5) Booking + Tracking (Mock Backend)

- Create bookings: `POST /api/bookings`
- Track booking by reference: `GET /api/bookings?reference=AS-...`
- Quote estimator API (optional): `POST /api/quotes`
- Storage is in-memory for demo purposes (`lib/mock-db.ts`).

## 6) Deploy to Vercel

1. Push this project to GitHub.
2. Import repo in Vercel.
3. Build command: `npm run build`
4. Output: default Next.js output.
5. Deploy.

No extra environment variables are required for the current mock setup.
