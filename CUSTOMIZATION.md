# Customization Guide

Complete guide to customize this template for different photographers.

## 🎨 Quick Customization (5 minutes)

### 1. Basic Information

Edit `/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Jane Smith',              // Your name
  tagline: 'Wedding Photographer', // Your specialty
  instagram: {
    username: 'janesmith_photo',   // Instagram handle
  },
  bio: 'Your bio here...',
  contact: {
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
  },
}
```

### 2. Colors (Optional)

```typescript
theme: {
  primary: '#1a1a1a',    // Almost black
  secondary: '#f5f5f5',  // Off-white
  accent: '#8b7355',     // Brown accent
}
```

Then update Tailwind config to use these colors.

## 🖼️ Content Customization

### Update About Page

Edit `/app/about/page.tsx`:

```typescript
// Change stats
{ value: '8+', label: 'Years' },
{ value: '300+', label: 'Weddings' },
{ value: '25+', label: 'Countries' },

// Update services
{
  title: 'Weddings',
  description: 'Full-day coverage with multiple shooters...',
},
```

### Customize Home Page Hero

Edit `/app/page.tsx`:

```typescript
<h1 className="font-serif text-display mb-6">
  Your Custom Headline
</h1>
<p className="text-xl md:text-2xl text-gray-300 mb-12">
  Your custom tagline
</p>
```

## 🎭 3D Hero Customization

### Change 3D Shape

Edit `/components/Hero3D.tsx`:

**Option 1: Smooth Sphere**
```typescript
<sphereGeometry args={[1, 64, 64]} />
```

**Option 2: Crystal**
```typescript
<octahedronGeometry args={[1, 0]} />
```

**Option 3: Torus (Ring)**
```typescript
<torusGeometry args={[1, 0.4, 16, 100]} />
```

### Adjust Glass Effect

```typescript
<MeshTransmissionMaterial
  transmission={1}           // More = more transparent
  roughness={0.1}           // Less = more shiny
  thickness={2}             // Affects refraction
  chromaticAberration={0.1} // Color split effect
  color="#ffffff"           // Tint color
/>
```

### Change Animation Speed

```typescript
// In FloatingGlassSphere component
meshRef.current.rotation.y = time * 0.05 // Slower rotation
meshRef.current.position.y = Math.sin(time * 0.3) * 0.3 // More float
```

### Disable 3D Completely

Replace Hero3D import in `/app/page.tsx`:

```typescript
// Remove this:
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ... })

// Replace with:
<div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
```

## 🎨 Typography Customization

### Change Fonts

Edit `/app/layout.tsx`:

```typescript
import { Montserrat, Cormorant_Garamond } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-playfair',
})
```

Popular combinations:
- **Modern**: Inter + Playfair Display (current)
- **Classic**: Lora + Raleway
- **Editorial**: Cormorant + Montserrat
- **Bold**: Bebas Neue + Open Sans

### Adjust Font Sizes

Edit `/tailwind.config.js`:

```javascript
fontSize: {
  'display': ['clamp(2.5rem, 7vw, 7rem)', ...], // Smaller
  'hero': ['clamp(1.8rem, 4.5vw, 4.5rem)', ...],
}
```

## 🎬 Animation Customization

### Adjust Animation Speed

Edit `/components/AnimatedSection.tsx`:

```typescript
transition={{
  duration: 1.2,  // Slower (default: 0.8)
  delay,
  ease: [0.21, 0.47, 0.32, 0.98],
}}
```

### Disable Animations

For simpler, faster site:

```typescript
// In AnimatedSection.tsx
animate={{ opacity: 1, y: 0 }} // Remove animation
```

### Change Scroll Speed

Edit `/components/SmoothScroll.tsx`:

```typescript
const lenis = new Lenis.default({
  duration: 1.8,  // Slower scroll (default: 1.2)
  smoothWheel: true,
})
```

## 🎨 Color Schemes

### Warm Minimalism

```css
/* globals.css */
body {
  @apply bg-neutral-50 text-neutral-900;
}
```

Update Navbar:
```typescript
className={isScrolled ? 'bg-white/90 backdrop-blur-lg' : 'bg-transparent'}
```

### Dark with Accent

```typescript
// config/site.ts
theme: {
  primary: '#000000',
  secondary: '#ffffff',
  accent: '#FF6B6B', // Red accent
}
```

```css
/* globals.css - add accent usage */
.accent-text {
  @apply text-[#FF6B6B];
}
```

## 📱 Mobile Customization

### Adjust Mobile Typography

```javascript
// tailwind.config.js
fontSize: {
  'display': ['clamp(2rem, 6vw, 8rem)', ...], // Smaller on mobile
}
```

### Disable 3D on Mobile

```typescript
// components/Hero3D.tsx
export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  
  if (isMobile) return null
  // ... rest of component
}
```

## 🖼️ Grid Layouts

### Change Gallery Grid

Edit `/components/ImageGrid.tsx`:

**2 Columns on Desktop**
```typescript
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

**4 Columns on Large Screens**
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

**Masonry Layout** (variable heights)
```bash
npm install react-masonry-css
```

```typescript
import Masonry from 'react-masonry-css'

<Masonry
  breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
  className="flex gap-6"
  columnClassName="space-y-6"
>
  {posts.map(...)}
</Masonry>
```

## 🎯 SEO Customization

### Update Metadata

Edit `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Jane Smith - Wedding Photography',
  description: 'Award-winning wedding photographer based in NYC',
  keywords: ['wedding photographer', 'NYC', 'luxury'],
  openGraph: {
    images: ['/og-image.jpg'], // Add your image
  },
}
```

### Add Structured Data

Create `/app/structured-data.tsx`:

```typescript
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jane Smith",
    "jobTitle": "Photographer",
    "url": "https://yoursite.com",
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## 🎨 Advanced: Custom Cursor

### Change Cursor Style

Edit `/components/CustomCursor.tsx`:

**Larger cursor**
```css
.cursor-dot {
  width: 12px;
  height: 12px;
}
.cursor-dot.active {
  width: 60px;
  height: 60px;
}
```

**Different blend mode**
```css
mix-blend-mode: exclusion; /* or screen, overlay */
```

## 📊 Performance Tweaks

### Reduce Image Quality

```typescript
// next.config.js
images: {
  quality: 75, // Default: 75, lower = smaller files
}
```

### Lazy Load More Aggressively

```typescript
// components/ImageGrid.tsx
<Image
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/..." // Add blur placeholder
/>
```

## 🎬 Add More Pages

### Create Services Page

```bash
mkdir app/services
touch app/services/page.tsx
```

```typescript
// app/services/page.tsx
export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32">
      {/* Your content */}
    </div>
  )
}
```

Update Navbar links:
```typescript
{ href: '/services', label: 'Services' }
```

## 💡 Tips

1. **Test changes locally** before deploying
2. **Keep animations subtle** for professional look
3. **Optimize images** before uploading
4. **Mobile-first** approach for best results
5. **Use real photos** in demos for impact

## 🆘 Common Issues

**Fonts not loading?**
- Check font imports in `layout.tsx`
- Verify Google Fonts CDN is accessible

**3D not showing?**
- Check console for WebGL errors
- Verify browser supports WebGL
- Try different 3D shape

**Slow performance?**
- Reduce image sizes
- Disable 3D on mobile
- Simplify animations

---

**Questions? Check README.md or consult Next.js docs**
