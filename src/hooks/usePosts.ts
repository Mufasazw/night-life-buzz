
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

export type Post = Tables<'posts'>

export const usePosts = (location?: string, platform?: string, limit = 20) => {
  return useQuery({
    queryKey: ['posts', location, platform, limit],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('*')
        .order('vibe_score', { ascending: false })
        .order('timestamp', { ascending: false })
        .limit(limit)
      
      if (location) {
        query = query.ilike('location', `%${location}%`)
      }
      
      if (platform) {
        query = query.eq('platform', platform)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching posts:', error)
        throw error
      }
      
      return data as Post[]
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  })
}

export const useRunScraper = () => {
  const runScraper = async (location = 'New York, NY', platform = 'twitter') => {
    try {
      console.log(`Calling ${platform}-scraper function with location:`, location)
      
      const { data, error } = await supabase.functions.invoke(`${platform}-scraper`, {
        body: { location },
      })
      
      if (error) {
        console.error('Supabase function error:', error)
        throw error
      }
      
      console.log('Scraper response:', data)
      return data
    } catch (error) {
      console.error('Error running scraper:', error)
      throw error
    }
  }
  
  const runAllScrapers = async (location = 'New York, NY') => {
    const platforms = ['twitter', 'instagram', 'tiktok']
    const results = []
    
    for (const platform of platforms) {
      try {
        const result = await runScraper(location, platform)
        results.push({ platform, success: true, result })
      } catch (error) {
        results.push({ platform, success: false, error: error.message })
      }
    }
    
    return results
  }
  
  return { runScraper, runAllScrapers }
}
