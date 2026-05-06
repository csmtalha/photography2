export const siteConfig = {
  name: 'Omergraphy',
  tagline: 'Visual Storyteller & Fine Art Photographer',
  instagram: {
    username: 'natgeo', // Change this to your Instagram username
  },
  bio: `I capture moments that transcend time. Specializing in editorial and fine art photography, 
        my work explores the intersection of light, emotion, and human experience. 
        Based between New York and Paris, available worldwide.`,
  contact: {
    email: 'hello@alexandrachen.com',
    phone: '+1 (555) 123-4567',
  },
  social: {
    instagram: 'https://instagram.com/natgeo',
    twitter: 'https://twitter.com/natgeo',
    linkedin: 'https://linkedin.com/in/natgeo',
  },
  theme: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#999999',
  },
  seo: {
    title: 'Omergraphy - Photography Portfolio',
    description: 'Fine art and editorial photography by Omergraphy. View my latest work and get in touch.',
    keywords: ['photography', 'fine art', 'editorial', 'portrait', 'fashion'],
  }
}

export type SiteConfig = typeof siteConfig
