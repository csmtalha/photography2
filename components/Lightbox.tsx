'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

interface InstagramPost {
  id: string
  image: string
  caption: string
  link: string
}

interface LightboxProps {
  isOpen: boolean
  currentIndex: number
  posts: InstagramPost[]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({
  isOpen,
  currentIndex,
  posts,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || !posts[currentIndex]) return null

  const currentPost = posts[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center glass-dark rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-6 z-10 w-12 h-12 flex items-center justify-center glass-dark rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-6 z-10 w-12 h-12 flex items-center justify-center glass-dark rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl w-full mx-auto px-6 flex flex-col md:flex-row items-center gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full md:w-2/3 aspect-[3/4]">
              <Image
                src={currentPost.image}
                alt={currentPost.caption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                unoptimized={!currentPost.image.startsWith('/instagram-images/')}
              />
            </div>

            {/* Info */}
            <div className="w-full md:w-1/3 space-y-6">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  {currentIndex + 1} / {posts.length}
                </p>
                <p className="text-white leading-relaxed">{currentPost.caption}</p>
              </div>
              <a
                href={currentPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 glass-dark text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                View on Instagram
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
