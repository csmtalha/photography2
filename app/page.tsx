import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import AnimatedSection from '@/components/AnimatedSection'
import FeaturedWork from '@/components/FeaturedWork'

// Lazy load 3D component for performance
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black" />,
})

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <Hero3D />
          </Suspense>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <AnimatedSection>
            <h1 className="font-serif text-display mb-6 tracking-tight">
              {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light tracking-wide">
              {siteConfig.tagline}
            </p>
            <Link href="/gallery">
              <button className="group relative px-8 py-4 glass-dark overflow-hidden">
                <span className="relative z-10 text-sm uppercase tracking-widest">
                  Explore Work
                </span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </button>
            </Link>
          </AnimatedSection>

          {/* Scroll indicator */}
          <AnimatedSection delay={0.4}>
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs uppercase tracking-wider text-gray-400">Scroll</span>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="section-padding bg-black">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="font-serif text-section mb-4">Featured Work</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A curated selection of my latest photography work, capturing moments that tell stories beyond words.
              </p>
            </div>
            <FeaturedWork />
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-section mb-6">
              Let's Create Together
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Available for commissions, collaborations, and creative projects worldwide.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors text-sm uppercase tracking-widest font-medium">
                Get in Touch
              </button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
