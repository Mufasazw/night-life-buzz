import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// List of major cities to scrape
const CITIES = [
  'New York, NY',
  'Los Angeles, CA',
  'Miami, FL',
  'Las Vegas, NV',
  'Chicago, IL',
  'San Francisco, CA'
]

Deno.serve(async (req) => {
  try {
    console.log('Starting scheduled scraper job...')
    
    const results = []
    
    // Run scraper for each city
    for (const city of CITIES) {
      try {
        console.log(`Scraping posts for ${city}`)
        
        // Call the twitter-scraper function
        const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/twitter-scraper`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
          },
          body: JSON.stringify({ location: city })
        })
        
        const result = await response.json()
        results.push({ city, result })
        
        console.log(`Completed scraping for ${city}: ${result.saved_count} posts saved`)
        
        // Add a small delay between cities to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000))
        
      } catch (error) {
        console.error(`Error scraping ${city}:`, error)
        results.push({ city, error: error.message })
      }
    }
    
    // Clean up old posts (keep only last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .lt('created_at', sevenDaysAgo)
    
    if (deleteError) {
      console.error('Error cleaning up old posts:', deleteError)
    } else {
      console.log('Successfully cleaned up old posts')
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Scheduled scraper completed',
        results: results,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    )
    
  } catch (error) {
    console.error('Scheduled scraper error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
