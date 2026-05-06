'use client'

import { useEffect, useState } from 'react'
import ImageGrid from './ImageGrid'
import Lightbox from './Lightbox'

interface InstagramPost {
  id: string
  image: string
  caption: string
  link: string
}

export default function FeaturedWork() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/instagram?limit=6')
        const data = await response.json()
        setPosts(data.posts) // Featured: top 6 posts
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-gray-900 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No posts available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <ImageGrid posts={posts} onImageClick={handleImageClick} />
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        posts={posts}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  )
}
