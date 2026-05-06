# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

If using real Instagram API, add environment variables in Vercel:

1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add your variables:
   - `INSTAGRAM_API_KEY`
   - `INSTAGRAM_API_URL`
   - etc.

## Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `alexandrachen.com`)
3. Update DNS records as instructed
4. SSL automatically configured

## Performance Optimization

### Image Optimization

Vercel automatically optimizes images. Ensure:
- Images served from `/public` or external URLs
- Use Next.js `<Image>` component
- Set proper `sizes` attribute

### Edge Functions

API routes automatically deploy as Edge Functions for global performance.

### Caching

Instagram API route caches for 6 hours:
```typescript
headers: {
  'Cache-Control': 'public, s-maxage=21600',
}
```

## Build Settings

Default settings work out of the box:

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

## Analytics (Optional)

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics

Add to environment variables:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Monitoring

Vercel provides:
- Real-time logs
- Performance metrics
- Error tracking
- Deployment history

Access via: Project → Analytics

## Production Checklist

- [ ] Update `config/site.ts` with real data
- [ ] Configure Instagram API (or use mock data)
- [ ] Test all pages locally
- [ ] Optimize images
- [ ] Add custom domain
- [ ] Set up analytics
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target 85+)
- [ ] Update meta tags and SEO
- [ ] Configure error monitoring

## Alternative Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### AWS Amplify

1. Connect GitHub repo
2. Select Next.js framework
3. Deploy

### Railway

1. Connect GitHub
2. Select repo
3. Deploy automatically

## Performance Targets

- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: 85+

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading

- Check `next.config.js` remote patterns
- Verify image URLs are accessible
- Check CORS headers

### 3D Not Rendering

- Disable SSR for Three.js components
- Check browser WebGL support
- Reduce 3D complexity if needed

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

**Estimated deployment time: 3-5 minutes**
