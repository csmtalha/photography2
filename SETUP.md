# 🚀 Quick Setup Guide

Get your photography portfolio live in 10 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git (for deployment)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14
- React 18
- Framer Motion
- Three.js & React Three Fiber
- Tailwind CSS
- TypeScript
- Lenis (smooth scroll)

### 2. Configure Your Portfolio

Open `/config/site.ts` and update:

```typescript
{
  name: 'YOUR NAME',
  tagline: 'YOUR SPECIALTY',
  instagram: {
    username: 'YOUR_INSTAGRAM', // ⚠️ IMPORTANT: Change this!
  },
  contact: {
    email: 'your@email.com',
    phone: '+1 (555) 123-4567',
  },
  // ... update other fields
}
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Customize Content

**About Page**
- Edit `/app/about/page.tsx`
- Update bio, stats, services

**Contact Form**
- Currently simulated
- To enable real emails, integrate service like:
  - SendGrid
  - Resend
  - EmailJS

**Images**
- Replace placeholder images with real photos
- Use optimized images (WebP format recommended)
- Keep file sizes under 500KB

### 5. Instagram Integration (Optional)

**Option A: Use Mock Data** (Default)
- No setup needed
- Displays random placeholder images
- Good for testing/demo

**Option B: Real Instagram API**
- Get API key from Instagram Graph API or third-party service
- Edit `/app/api/instagram/route.ts`
- Add API credentials to `.env`:
  ```
  INSTAGRAM_API_KEY=your_key
  INSTAGRAM_API_URL=your_endpoint
  ```

### 6. Test Everything

Check these pages work:
- ✅ Home (/)
- ✅ Gallery (/gallery)
- ✅ About (/about)
- ✅ Contact (/contact)

Test functionality:
- ✅ Navbar transitions
- ✅ Image grid loads
- ✅ Lightbox opens/closes
- ✅ Smooth scrolling works
- ✅ Contact form submits
- ✅ Mobile menu works

### 7. Build for Production

```bash
npm run build
```

This creates optimized production build in `.next/`

Test production build locally:
```bash
npm start
```

### 8. Deploy to Vercel

**Via Dashboard:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Deploy (auto-configured)

**Via CLI:**
```bash
npm i -g vercel
vercel
```

## Common Customizations

### Change Colors

Edit `/config/site.ts`:
```typescript
theme: {
  primary: '#000000',
  secondary: '#ffffff',
  accent: '#999999',
}
```

### Disable 3D (for performance)

Edit `/app/page.tsx`:
Replace Hero3D with static gradient:
```typescript
<div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900" />
```

### Change Fonts

Edit `/app/layout.tsx`:
```typescript
import { YourFont, AnotherFont } from 'next/font/google'
```

See `CUSTOMIZATION.md` for detailed instructions.

## Troubleshooting

**"Module not found" errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**3D not rendering?**
- Check browser console for errors
- Try different browser (Chrome recommended)
- Disable 3D if issues persist

**Images not loading?**
- Verify URLs in `/app/api/instagram/route.ts`
- Check `next.config.js` image domains

**Build fails?**
```bash
npm run build -- --debug
```

## Next Steps

1. **Add Real Content**: Replace all placeholder text/images
2. **SEO Setup**: Update meta tags, add sitemap
3. **Analytics**: Add Google Analytics or Vercel Analytics
4. **Domain**: Connect custom domain in Vercel
5. **Performance**: Run Lighthouse audit, optimize

## File Structure Quick Reference

```
Important files to edit:
├── config/site.ts              ⭐ Main configuration
├── app/page.tsx                📄 Home page
├── app/about/page.tsx          📄 About page
├── app/contact/page.tsx        📄 Contact page
├── app/gallery/page.tsx        📄 Gallery page
├── app/api/instagram/route.ts  🔌 Instagram API
└── app/globals.css             🎨 Global styles
```

## Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)
- **Three.js**: [threejs.org/docs](https://threejs.org/docs/)

## Support

For template-specific questions:
1. Check `CUSTOMIZATION.md` for detailed guides
2. Check `DEPLOYMENT.md` for deployment issues
3. Consult component comments in code

---

**Total setup time: 10-15 minutes**
**Deployment time: 3-5 minutes**

Ready to launch? Run `npm run build && vercel` 🚀
