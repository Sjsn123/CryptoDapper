import type { BlogPost } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={post.dataAiHint}
        />
      </div>
      <CardHeader>
        <p className="text-xs text-muted-foreground flex items-center">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <CardTitle className="text-xl text-foreground hover:text-primary transition-colors">
          <Link href={`/education/blog/${post.id}`}>{post.title}</Link>
        </CardTitle>
         <div className="flex flex-wrap gap-1 pt-1">
          {post.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs bg-primary/50 text-muted-foreground">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3 text-muted-foreground">{post.summary}</CardDescription>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="link" asChild className="text-primary px-0 hover:underline">
          <Link href={`/education/blog/${post.id}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
