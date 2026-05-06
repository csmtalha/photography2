'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import ImageGrid from '@/components/ImageGrid'
import Lightbox from '@/components/Lightbox'

interface InstagramPost {
  id: string
  image: string
  caption: string
  link: string
}

export default function GalleryPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/instagram?limit=50')
        const data = await response.json()
        setPosts(data.posts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % posts.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-hero mb-6"
            >
              Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Explore my complete portfolio of visual stories, from intimate portraits to sweeping landscapes.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-gray-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && <ImageGrid posts={posts} onImageClick={handleImageClick} />}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No posts found. Please check back later.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        posts={posts}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}
