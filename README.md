# ✿ MAISON FLEUR — Haute Floristry & Botanical Couture

A luxury, modern, and fully responsive e-commerce web application for an artisanal haute floristry boutique. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, featuring an editorial aesthetic inspired by luxury Parisian houses, high-end botanical typography, smooth micro-interactions, and comprehensive e-commerce functionality.

---

## ✨ Features & Architecture

### 1. ⚜️ Editorial Luxury Aesthetic
- **Artisanal Typography**: Paired with *Cormorant Garamond*, *Playfair Display*, and *Montserrat*.
- **Atmospheric Palette**: Royal deep forest greens (`#161E17`), warm archival golds (`#C49B5C`), and creamy ivory parchment (`#FAF8F5`).
- **Smooth Animations**: Tailored zoom hover effects, soft glassmorphism (`backdrop-blur`), floating subtle motions, and gold celebratory confetti (`canvas-confetti`).

### 2. 🌹 Comprehensive E-Commerce Functionality
- **Announcement Bar**: Free white-glove courier shipping ticker with active privilege discount codes.
- **Hero Section**: High-resolution botanical visuals, brand guarantees, and quick exploration triggers.
- **Curated Category Collections**: Interactive cards for Imperial Roses, Silk Peonies, Exotic Orchids, Meadow Couture, and Autumn Solstices.
- **Advanced Boutique Catalog**:
  - Live real-time search across flower varieties and arrangements.
  - Category pill filter tabs with stem counters.
  - Multi-tier price range filter (`Under $140`, `$140-$180`, `Luxury Above $180`).
  - Multi-criteria sorting (Curator's Choice, Price Asc/Desc, Highest Patron Rating).
  - Product cards equipped with discount tags, composition badges, ratings, quick view, and instant bag additions.
- **Product Details Modal**:
  - Multi-photo gallery thumbnail preview.
  - Detailed botanical composition and dimensions breakdown.
  - Vessel & Presentation choice (*Artisanal Fluted Ceramic* vs *Archival Washi Ribbon Wrap*).
  - Wax-sealed personalized gift calligraphy message input.
  - Quantity controls, dynamic price computation, and bloom guarantee badges.
- **Interactive Bag / Cart Drawer**:
  - Slide-out drawer with real-time quantity adjustments and item deletion.
  - Dynamic free shipping calculation progress bar towards the \$150 threshold.
  - Privilege discount code redemption (`HAUTEBLOOM` for 15% off, `VIP20` for \$20 credit).
  - Clear subtotal, taxes, shipping, and grand total calculations.
- **Private Wishlist Drawer**:
  - Save stems across sessions via `localStorage`.
  - Batch "Move All To Bag" functionality.
- **Patron Concierge / Auth Modal**:
  - Switchable Sign In / Request Membership forms.
  - Authenticated patron dashboard showing VIP tier and perks.
- **Bespoke Checkout Modal**:
  - Delivery residence and recipient fields.
  - Scheduling system (Delivery Date & dedicated Time Window: Morning, Afternoon, Twilight Gala).
  - Courier instructions and encrypted credit card payment details.
  - Order review with real-time tax and courier delivery computations.
  - Confirmation screen with unique generated order dossier ID and celebratory gold confetti.
- **Brand Story & Patron Reviews**:
  - Atelier story, zero-waste philosophy, direct flight guarantees, and verified customer testimonials.
- **Newsletter Gazette & Luxury Footer**:
  - Salons across Paris, New York, London, and Tokyo.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Utility Classes
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Deployment Ready**: Pre-configured for Netlify (`_redirects`) and Vercel (`vercel.json`)

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone <your-repo-url>
cd flower-ecommerce

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 📦 Production Build

```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Vercel or Netlify

### Deploying to Vercel:
1. Push this repository to your GitHub account (see instructions below).
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Keep the default settings (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Click **Deploy**. The included `vercel.json` ensures full SPA client-side routing.

### Deploying to Netlify:
1. Push this repository to your GitHub account.
2. Go to [Netlify](https://netlify.com) and select **"Add new site"** -> **"Import an existing project"**.
3. Choose your GitHub repository.
4. Set Build command to `npm run build` and Publish directory to `dist`.
5. Click **Deploy**. The included `public/_redirects` ensures seamless SPA routing.

---

## 📤 Pushing to GitHub

Initialize git and push:
```bash
git init
git add .
git commit -m "feat: complete luxury Maison Fleur e-commerce store"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
