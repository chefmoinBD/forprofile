# Chef Mainuddin Ahmed — Luxury Culinary Portfolio

A modern, responsive, high-performance culinary portfolio designed specifically for **GitHub Pages** deployment with zero build steps required.

Designed in a luxury fine-dining aesthetic: Deep Forest Green (`#1E3A2F`), Charcoal (`#0F1714`), Warm Gold accents (`#D9B866` / `#B8913A`), and Cream (`#FAF6EC`) typography.

---

## 🌟 Key Features

- **Zero Build Step / Pure Static Delivery**: Ready to drag-and-drop or git push directly to GitHub Pages.
- **Pinned CDN Libraries**:
  - [GSAP 3.12.5](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js) & ScrollTrigger for staggered typography and section reveals.
  - [Lenis 1.1.18](https://unpkg.com/lenis@1.1.18/dist/lenis.min.js) for ultra-smooth 60fps kinetic scrolling.
- **Interactive Repertoire Gauges**: Animated radial SVG proficiency indicators for Japanese, Italian, Thai, Bengali, Pizza, and Korean stations.
- **Filterable Signature Dishes Gallery & Lightbox**: Interactive category filters with high-resolution modal inspection, preparation techniques, and station breakdown.
- **Self-Drawing Career Timeline**: Vertical line that draws itself progressively as you scroll down.
- **Privacy-Preserving Contact Channels**: Phone number is shielded behind a dedicated "Call Chef" action modal rather than exposed as scrapable plaintext, with direct WhatsApp, Email, and CV download buttons.
- **Theme Switcher**: Smooth Dark / Light mode toggle remembered in `localStorage`.
- **Canvas Steam Animation & Magnetic Cursor**: Lightweight ambient kitchen aroma particles and desktop gold follower (automatically disabled on mobile/touch).
- **Fully Accessible**: High WCAG contrast, semantic HTML5, keyboard navigation (`ESC` closes modals), and `prefers-reduced-motion` compliance.

---

## 📁 Repository Structure

```text
├── index.html                 # Main single-page portfolio
├── style.css                  # Pure CSS architecture & variables
├── script.js                  # Interactive engine & animations
├── 404.html                   # Custom error page matching design
├── README.md                  # This documentation guide
└── assets/
    ├── favicon.svg            # Custom chef hat gold emblem
    ├── Mainuddin_Ahmed_CV.pdf # Chef curriculum vitae PDF
    └── images/
        ├── chef-mainuddin.jpg        # Hero portrait (Mainuddin Ahmed)
        ├── dish-sushi-sashimi.jpg    # Signature Dish 1
        ├── dish-ramen-bowl.jpg       # Signature Dish 2
        ├── dish-artisanal-pasta.jpg  # Signature Dish 3
        ├── dish-wok-stirfry.jpg      # Signature Dish 4
        └── dish-woodfired-pizza.jpg   # Signature Dish 5
```

---

## 🚀 Step-by-Step GitHub Pages Deployment Guide

Deploying this portfolio to your own GitHub URL (e.g. `https://yourusername.github.io/chef-portfolio/`) takes less than 2 minutes:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **New Repository**.
3. Name your repository (e.g., `chef-portfolio` or `mainuddin-ahmed`).
4. Ensure the repository visibility is set to **Public**.
5. Do not initialize with template files (keep it clean).

### Step 2: Upload Files
Push your local files to GitHub using git terminal or web upload:

```bash
git init
git add .
git commit -m "Initial commit: Chef Mainuddin Ahmed portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/chef-portfolio.git
git push -u origin main
```

*(Alternatively, use GitHub's web interface to drag and drop all files and folders directly).*

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top tab with gear icon).
3. On the left sidebar menu, click **Pages** (under the "Code and automation" group).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**.

### Step 4: Visit Your Live Website
- Within 1–2 minutes, GitHub will build and publish your site.
- Refresh the **Pages** settings tab to see your live URL:
  `https://yourusername.github.io/chef-portfolio/`
- Every link, image, and asset uses relative paths (`./assets/...`), ensuring it renders smoothly regardless of the repository name!

---

## 📸 Checklist: Image & Asset Customization

To personalize photos or update documents in the future, simply replace the corresponding files in the `assets/` folder:

| Asset Name | Target File Path | Recommended Format & Dimensions |
| :--- | :--- | :--- |
| **Chef Hero Portrait** | `assets/images/chef-mainuddin.jpg` | Square / 1:1 ratio, min 800×800px |
| **Sushi & Sashimi** | `assets/images/dish-sushi-sashimi.jpg` | 4:3 ratio, min 1200×900px |
| **Artisanal Ramen Bowl** | `assets/images/dish-ramen-bowl.jpg` | 4:3 ratio, min 1200×900px |
| **Handmade Pasta** | `assets/images/dish-artisanal-pasta.jpg` | 4:3 ratio, min 1200×900px |
| **Thai Wok Stir-Fry** | `assets/images/dish-wok-stirfry.jpg` | 4:3 ratio, min 1200×900px |
| **Wood-Fired Pizza** | `assets/images/dish-woodfired-pizza.jpg` | 4:3 ratio, min 1200×900px |
| **Curriculum Vitae** | `assets/Mainuddin_Ahmed_CV.pdf` | Standard PDF document |

---

## 🧑‍🍳 About Chef Mainuddin Ahmed
- **Title**: Commis Chef | Culinary Arts
- **Training**: Tommy Miah’s Hospitality Management Institute (City & Guilds)
- **Hospitality Line**: Ascott Place (Baridhara, Dhaka) & Multi-Cuisine Kitchen
- **Specializations**: Japanese Raw Bar, Italian Fresh Pasta & Pizza, Thai Wok Mastery, Bengali Heritage Curries
- **Location**: Dhaka, Bangladesh (Hometown: Cumilla, BD)
- **Contact**: `mainddinmd536@gmail.com` | WhatsApp: `+8801621529859`
