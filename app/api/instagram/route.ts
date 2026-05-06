import { NextRequest, NextResponse } from 'next/server'
import instagramData from '@/instagram-data.json'

interface InstagramPost {
  id: string
  image: string
  caption: string
  timestamp: string
  link: string
}

interface RawInstagramPost {
  id: string
  type: string
  shortCode: string
  caption: string
  displayUrl: string
  images: string[]
  url: string
  timestamp: string | null
  likesCount: number | null
  hashtags: string[]
}

function transformInstagramData(rawPosts: RawInstagramPost[]): InstagramPost[] {
  return rawPosts
    .filter(post => {
      // Check if local image exists or if there's a valid remote URL
      const hasLocalImage = post.displayUrl && post.displayUrl.startsWith('/instagram-images/')
      const hasValidImage = post.images && post.images.length > 0 && post.images[0].startsWith('http')
      const hasValidDisplayUrl = post.displayUrl && post.displayUrl.startsWith('http')
      return (hasLocalImage || hasValidImage || hasValidDisplayUrl) && post.timestamp
    })
    .map(post => {
      // Priority: local image > images array > displayUrl
      let imageUrl: string
      
      if (post.displayUrl && post.displayUrl.startsWith('/instagram-images/')) {
        // Use local image
        imageUrl = post.displayUrl
      } else if (post.images && post.images.length > 0 && post.images[0].startsWith('http')) {
        // Use first image from array
        imageUrl = post.images[0]
      } else {
        // Fallback to displayUrl
        imageUrl = post.displayUrl
      }
      
      return {
        id: post.id,
        image: imageUrl,
        caption: post.caption || '',
        timestamp: post.timestamp || new Date().toISOString(),
        link: post.url,
      }
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by newest first
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '50', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  try {
    const allPosts = transformInstagramData(instagramData as RawInstagramPost[])
    const paginatedPosts = allPosts.slice(offset, offset + limit)

    return NextResponse.json(
      { 
        posts: paginatedPosts,
        total: allPosts.length,
        limit,
        offset,
        hasMore: offset + limit < allPosts.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    )
  } catch (error) {
    console.error('Instagram API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    )
  }
}
