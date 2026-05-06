'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface InstagramPost {
  id: string
  image: string
  caption: string
  link: string
}

interface ImageGridProps {
  posts: InstagramPost[]
  onImageClick?: (index: number) => void
}

export default function ImageGrid({ posts, onImageClick }: ImageGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (postId: string) => {
    console.warn('Image failed to load:', postId)
    setImageErrors(prev => new Set(prev).add(postId))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post, index) => {
        const hasError = imageErrors.has(post.id)
        
        return (
          <motion.div
            key={post.id}
            variants={item}
            className="relative aspect-[3/4] group cursor-pointer overflow-hidden bg-gray-900"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => onImageClick?.(index)}
          >
            {/* Image or Placeholder */}
            {!hasError ? (
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => handleImageError(post.id)}
                unoptimized={!post.image.startsWith('/instagram-images/')}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center p-6">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">Image unavailable</p>
                </div>
              </div>
            )}

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: hoveredIndex === index ? 0 : 20,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-center"
              >
                <p className="text-white text-sm line-clamp-3">
                  {post.caption}
                </p>
                <button className="mt-4 px-6 py-2 glass-dark text-xs uppercase tracking-wider hover:bg-white/10 transition-colors">
                  View
                </button>
              </motion.div>
            </motion.div>

            {/* Hover scale effect */}
            {!hasError && (
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
