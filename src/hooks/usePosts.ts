
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

export type Post = Tables<'posts'>

export const usePosts = (location?: string, limit = 20) => {
  return useQuery({
    queryKey: ['posts', location, limit],
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
  const runScraper = async (location = 'New York, NY') => {
    try {
      const response = await fetch('/api/twitter-scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to run scraper')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error running scraper:', error)
      throw error
    }
  }
  
  return { runScraper }
}
