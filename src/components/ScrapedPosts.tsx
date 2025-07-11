
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, MessageCircle, Share, ExternalLink, Sparkles } from 'lucide-react'
import { usePosts, useRunScraper } from '@/hooks/usePosts'
import { toast } from '@/hooks/use-toast'
import type { Post } from '@/hooks/usePosts'

interface ScrapedPostsProps {
  location?: string
}

const PostCard = ({ post }: { post: Post }) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500'
      case 'instagram': return 'bg-pink-500'
      case 'tiktok': return 'bg-black'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`${getPlatformColor(post.platform)} text-white capitalize`}>
              {post.platform}
            </Badge>
            <span className="font-semibold">@{post.username}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-600">{post.vibe_score}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{post.caption}</p>
        
        {post.media_url && (
          <div className="mb-3">
            <img 
              src={post.media_url} 
              alt="Post media" 
              className="rounded-lg max-w-full h-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
          <span>•</span>
          <span>{formatTimestamp(post.timestamp)}</span>
          {post.location && (
            <>
              <span>•</span>
              <span>{post.location}</span>
            </>
          )}
        </div>
        
        {post.keywords && post.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              <MessageCircle className="h-4 w-4 mr-1" />
              Comment
            </Button>
            <Button size="sm" variant="ghost">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          {post.post_url && (
            <Button size="sm" variant="ghost" asChild>
              <a href={post.post_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ScrapedPosts({ location }: ScrapedPostsProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const { data: posts, isLoading, error, refetch } = usePosts(
    location, 
    selectedPlatform === 'all' ? undefined : selectedPlatform
  )
  const { runAllScrapers } = useRunScraper()

  const handleRunAllScrapers = async () => {
    setIsRunning(true)
    try {
      console.log('Starting all scrapers...')
      const results = await runAllScrapers(location)
      console.log('All scrapers completed:', results)
      
      const successCount = results.filter(r => r.success).length
      
      toast({
        title: "Scrapers Completed",
        description: `Successfully completed ${successCount} out of 3 scrapers. ${successCount > 0 ? 'New posts will appear shortly.' : 'Check logs for issues.'}`,
      })
      
      // Refetch posts after a short delay
      setTimeout(() => {
        refetch()
      }, 3000)
    } catch (error) {
      console.error('Error running all scrapers:', error)
      toast({
        title: "Scraper Error",
        description: "Failed to start scrapers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error loading posts: {error.message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <CardTitle className="text-2xl font-bold">Live Party Feed</CardTitle>
        <div className="flex items-center gap-4">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleRunAllScrapers} 
            disabled={isRunning}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isRunning ? 'Running...' : 'Refresh All Feeds'}
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Showing {posts.length} hottest posts {location && `in ${location}`} 
            {selectedPlatform !== 'all' && ` from ${selectedPlatform}`}
          </p>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No posts found. Try running the scrapers to fetch the latest party posts!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
