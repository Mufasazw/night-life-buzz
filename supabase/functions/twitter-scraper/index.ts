
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// Party-related keywords to search for
const PARTY_KEYWORDS = [
  'club', 'party', 'nightlife', 'lit', 'turnt', 'DJ', 'dance', 'rave',
  'clubbing', 'nightout', 'drinks', 'dancing', 'music', 'vibes'
]

// Emoji patterns for vibe score calculation
const PARTY_EMOJIS = ['🎉', '🍾', '🥳', '💃', '🕺', '🎵', '🎶', '🔥', '✨', '🌟']

function calculateVibeScore(text: string, likes: number): number {
  const emojiCount = PARTY_EMOJIS.reduce((count, emoji) => {
    return count + (text.match(new RegExp(emoji, 'g')) || []).length
  }, 0)
  
  return likes + (2 * emojiCount)
}

function extractKeywords(text: string): string[] {
  const foundKeywords: string[] = []
  const lowercaseText = text.toLowerCase()
  
  PARTY_KEYWORDS.forEach(keyword => {
    if (lowercaseText.includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword)
    }
  })
  
  return foundKeywords
}

// Mock scraper function - in production, you'd use Twitter API or web scraping
async function scrapeTwitterPosts(location?: string): Promise<any[]> {
  // This is a mock implementation - replace with actual Twitter API calls
  // For now, we'll generate some sample data to demonstrate the concept
  const mockPosts = [
    {
      id: '1234567890',
      username: 'party_lover_nyc',
      text: 'Amazing night at the club! 🎉🔥 The DJ was incredible #nightlife #NYC',
      likes: 45,
      created_at: new Date().toISOString(),
      media_url: 'https://example.com/image1.jpg',
      location: location || 'New York, NY'
    },
    {
      id: '1234567891',
      username: 'dj_mike_beats',
      text: 'Lit party tonight! Come dance with us 💃🕺 #party #dance #vibes',
      likes: 78,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      media_url: null,
      location: location || 'New York, NY'
    },
    {
      id: '1234567892',
      username: 'club_scene',
      text: 'Best nightout ever! Drinks flowing 🍾✨ #clubbing #drinks #turnt',
      likes: 123,
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      media_url: 'https://example.com/image2.jpg',
      location: location || 'New York, NY'
    }
  ]
  
  return mockPosts
}

async function savePostsToDatabase(posts: any[]) {
  const postsToInsert = posts.map(post => {
    const keywords = extractKeywords(post.text)
    const vibeScore = calculateVibeScore(post.text, post.likes)
    
    return {
      platform: 'twitter',
      username: post.username,
      caption: post.text,
      media_url: post.media_url,
      likes: post.likes,
      timestamp: post.created_at,
      location: post.location,
      keywords: keywords,
      vibe_score: vibeScore,
      post_url: `https://twitter.com/${post.username}/status/${post.id}`,
      external_id: post.id
    }
  }).filter(post => post.keywords.length > 0) // Only save posts with party keywords
  
  if (postsToInsert.length > 0) {
    const { data, error } = await supabase
      .from('posts')
      .insert(postsToInsert)
    
    if (error) {
      console.error('Error saving posts:', error)
      throw error
    }
    
    console.log(`Saved ${postsToInsert.length} posts to database`)
    return data
  }
  
  return []
}

Deno.serve(async (req) => {
  try {
    const { location } = await req.json().catch(() => ({ location: 'New York, NY' }))
    
    console.log(`Starting Twitter scrape for location: ${location}`)
    
    // Scrape posts from Twitter
    const scrapedPosts = await scrapeTwitterPosts(location)
    console.log(`Scraped ${scrapedPosts.length} posts`)
    
    // Save to database
    const savedPosts = await savePostsToDatabase(scrapedPosts)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully scraped and saved ${savedPosts?.length || 0} posts`,
        location: location,
        scraped_count: scrapedPosts.length,
        saved_count: savedPosts?.length || 0
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('Scraper error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
