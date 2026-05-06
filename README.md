# Premium Photography Portfolio Boilerplate

A luxury, cinematic photography portfolio built with Next.js 14, Three.js, and Framer Motion. Automatically pulls content from Instagram profiles.

## ✨ Features

- **Premium Design**: Black/white minimalist theme with editorial typography
- **3D Hero**: Subtle Three.js floating glass sphere with mouse interaction
- **Smooth Animations**: Framer Motion page transitions, staggered grids, hover effects
- **Instagram Integration**: Automatically fetch and display posts from any public Instagram profile
- **Fully Responsive**: Mobile-first design with adaptive layouts
- **Performance Optimized**: Lazy loading, image optimization, 85+ Lighthouse score
- **Reusable Template**: Easy customization via config file

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your Portfolio

Edit `/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Your Name',
  tagline: 'Your Tagline',
  instagram: {
    username: 'your_instagram_username', // Change this!
  },
  bio: 'Your bio...',
  contact: {
    email: 'your@email.com',
    phone: '+1 (555) 123-4567',
  },
  // ... more settings
}
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
photography-portfolio/
├── app/
│   ├── api/
│   │   └── instagram/          # Instagram API route
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── gallery/                # Gallery page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── AnimatedSection.tsx     # Scroll animation wrapper
│   ├── CustomCursor.tsx        # Custom cursor effect
│   ├── FeaturedWork.tsx        # Featured Instagram posts
│   ├── Footer.tsx              # Footer component
│   ├── Hero3D.tsx              # 3D hero scene
│   ├── ImageGrid.tsx           # Animated image grid
│   ├── Lightbox.tsx            # Image lightbox modal
│   ├── Navbar.tsx              # Navigation bar
│   └── SmoothScroll.tsx        # Lenis smooth scrolling
├── config/
│   └── site.ts                 # ⚙️ EDIT THIS FOR CUSTOMIZATION
└── public/                     # Static assets
```

## 🎨 Customization Guide

### Change Instagram Username

```typescript
// config/site.ts
instagram: {
  username: 'new_username', // Your Instagram handle
}
```

### Modify Theme Colors

```typescript
// config/site.ts
theme: {
  primary: '#000000',   // Black
  secondary: '#ffffff', // White
  accent: '#999999',    // Gray
}
```

### Update Content

- **Bio**: Edit `siteConfig.bio` in `/config/site.ts`
- **Services**: Edit services array in `/app/about/page.tsx`
- **SEO**: Update `siteConfig.seo` in `/config/site.ts`

## 🔌 Instagram Integration

### Current Implementation (Mock Data)

The template uses mock data by default. To integrate real Instagram data:

1. **Official Instagram Graph API** (Recommended for production)
   - Requires Facebook App
   - Follow: [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)

2. **Third-party Services**
   - [RapidAPI Instagram Scrapers](https://rapidapi.com/search/instagram)
   - Paid but reliable

3. **Custom Scraper**
   - Build your own (be mindful of Instagram's ToS)
   - Use libraries like Puppeteer or Playwright

### Implementing Real API

Edit `/app/api/instagram/route.ts`:

```typescript
export async function GET(request: NextRequest) {
  const username = searchParams.get('username')
  
  // Replace with your API call
  const response = await fetch(`YOUR_API_ENDPOINT/${username}`)
  const data = await response.json()
  
  return NextResponse.json({ posts: data })
}
```

## 🎭 3D Configuration

### Customize Hero 3D Element

Edit `/components/Hero3D.tsx`:

```typescript
// Change shape
<icosahedronGeometry args={[1, 1]} /> // Current
<sphereGeometry args={[1, 32, 32]} />  // Sphere
<torusGeometry args={[1, 0.4, 16, 100]} /> // Torus

// Adjust material properties
<MeshTransmissionMaterial
  transmission={1}      // Transparency (0-1)
  roughness={0.2}       // Surface roughness
  thickness={1}         // Glass thickness
  chromaticAberration={0.06} // Color distortion
/>
```

### Disable 3D (Performance)

If 3D is too heavy, replace Hero3D with a static gradient:

```tsx
// app/page.tsx
<div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
```

## 📊 Performance Tips

1. **Image Optimization**: Next.js automatically optimizes images
2. **Lazy Loading**: 3D components load only when needed
3. **Code Splitting**: Dynamic imports for heavy components
4. **ISR**: Instagram data revalidates every 6 hours

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click
4. Configure environment variables if using real Instagram API

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D**: Three.js + React Three Fiber
- **Smooth Scroll**: Lenis
- **Image Lightbox**: Custom built

## 🎯 Design Philosophy

- **Luxury**: Editorial typography, generous spacing
- **Minimalism**: Black/white, clean lines
- **Cinematic**: Smooth animations, premium interactions
- **Performance**: No compromise on speed

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 💡 Tips for Selling This Template

1. **Branding**: Rebrand as "Photographer Pro" or similar
2. **Demo**: Use high-quality photography in demos
3. **Documentation**: Provide video tutorials
4. **Support**: Offer installation/customization services
5. **Pricing**: $49-$149 depending on market

---

**Built with precision for photographers who demand excellence.**
# photography2
