'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import { siteConfig } from '@/config/site'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Hero */}
        <AnimatedSection>
          <div className="mb-20 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-hero mb-6"
            >
              About
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              The story behind the lens
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
          {/* Image */}
          <AnimatedSection delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://picsum.photos/seed/about/800/1000"
                alt={siteConfig.name}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          {/* Bio */}
          <AnimatedSection delay={0.4}>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                {siteConfig.name}
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {siteConfig.bio}
                </p>
                <p>
                  With over a decade of experience in visual storytelling, I&apos;ve had the privilege of working
                  with leading publications, brands, and cultural institutions across the globe.
                </p>
                <p>
                  My approach to photography is rooted in authenticity and emotion. I believe the most powerful 
                  images are those that capture genuine moments and evoke deep feelings.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  { value: '10+', label: 'Years' },
                  { value: '500+', label: 'Projects' },
                  { value: '50+', label: 'Awards' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  >
                    <div className="font-serif text-3xl mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Services */}
        <AnimatedSection delay={0.6}>
          <div className="bg-gradient-to-br from-gray-900 to-black p-12 md:p-16">
            <h3 className="font-serif text-3xl md:text-4xl mb-12 text-center">
              Services
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Editorial',
                  description: 'Magazine features, lifestyle stories, and artistic narratives for publications.',
                },
                {
                  title: 'Portraits',
                  description: 'Intimate, authentic portraits that capture the essence of individuals and brands.',
                },
                {
                  title: 'Commercial',
                  description: 'High-impact imagery for campaigns, products, and brand storytelling.',
                },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <h4 className="font-serif text-2xl mb-4">{service.title}</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.8}>
          <div className="text-center mt-20">
            <h3 className="font-serif text-3xl md:text-4xl mb-6">
              Let&apos;s Work Together
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I&apos;m currently accepting new projects and collaborations. Reach out to discuss how we can create something exceptional.
            </p>
            <a href="/contact">
              <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors text-sm uppercase tracking-widest font-medium">
                Start a Project
              </button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
