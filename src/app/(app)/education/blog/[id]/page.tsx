
// This is a mock page for individual blog posts.
// In a real application, you would fetch the specific post data based on the ID.
"use client";

import { useParams } from 'next/navigation';
import { BLOG_POSTS_DATA } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, UserCircle, ExternalLink as ExternalLinkIcon } from 'lucide-react'; // Renamed to avoid conflict
import { Card, CardContent } from '@/components/ui/card';

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;

  // Find the blog post by ID from mock data
  const post = BLOG_POSTS_DATA.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-destructive">Post not found</h1>
        <p className="text-muted-foreground mt-2">The blog post you are looking for does not exist or has been moved.</p>
        <Button asChild variant="link" className="mt-4 text-primary">
          <Link href="/education/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  // Mock full content if not available
  const fullContent = post.content || `${post.summary} (This is placeholder content for the full blog post. In a real application, this would be the complete article text, potentially formatted with Markdown or a rich text editor.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;


  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/education/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <article key={postId} className="space-y-6"> {/* Added key={postId} here */}
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            {post.author && (
              <div className="flex items-center">
                <UserCircle className="mr-1.5 h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            )}
             <Badge variant="secondary" className="bg-primary/50 text-muted-foreground">{post.category}</Badge>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={post.dataAiHint}
          />
        </div>
        
        <Card className="bg-card/50">
          <CardContent className="prose prose-invert prose-lg max-w-none py-6 text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
            {/* For a real app, render Markdown here */}
            <p className="lead text-lg text-muted-foreground mb-6">{post.summary}</p>
            {fullContent.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </CardContent>
        </Card>
        
        {post.externalLink && (
          <div className="my-6 text-center">
            <Button asChild variant="secondary">
              <a href={post.externalLink} target="_blank" rel="noopener noreferrer">
                Read Full Article <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        <footer className="pt-4 border-t border-border/50">
          <h3 className="text-md font-semibold text-muted-foreground mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}
