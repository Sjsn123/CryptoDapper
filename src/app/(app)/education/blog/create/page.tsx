
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, FilePenLine } from "lucide-react";

const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  summary: z.string().min(20, "Summary must be at least 20 characters long.").max(300, "Summary must be less than 300 characters."),
  content: z.string().min(50, "Content must be at least 50 characters long."),
  category: z.string().min(3, "Category is required."),
  tags: z.string().min(3, "Please provide at least one tag."),
  imageUrl: z.string().url("Please enter a valid URL for the image."),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export default function CreateBlogPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      tags: "",
      imageUrl: "https://placehold.co/1280x720.png",
    },
  });

  async function onSubmit(data: BlogPostFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("New blog post data (simulation):", {
      ...data,
      tags: data.tags.split(',').map(tag => tag.trim()), // Process tags into an array
      id: new Date().toISOString(), // Mock ID
      date: new Date().toISOString().split('T')[0], // Mock date
    });
    
    setIsLoading(false);

    toast({
      title: "Blog Post Created! (Simulation)",
      description: "Your new blog post has been successfully created. In a real app, this would now be live.",
    });

    // Redirect back to blog page after a short delay
    setTimeout(() => {
      router.push("/education/blog");
    }, 2000);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-9 w-9" asChild>
          <Link href="/education/blog">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Blog</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Create a New Blog Post</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-lg animate-fade-in border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FilePenLine className="h-6 w-6 text-primary" />
                Post Details
              </CardTitle>
              <CardDescription>
                Fill in the details for your new article. All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Future of Decentralized Finance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short, catchy summary of your article..." {...field} />
                    </FormControl>
                     <FormDescription>A brief description that will appear on the blog listing page.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your full article here. You can use Markdown for formatting." rows={10} {...field} />
                    </FormControl>
                     <FormDescription>The main body of your blog post.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Security, Concepts, Wallets" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., blockchain, 2fa, tutorial" {...field} />
                        </FormControl>
                        <FormDescription>Separate tags with a comma.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
               </div>
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Header Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="https://example.com/image.png" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter className="flex justify-end mt-6 border-t pt-6">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <FilePenLine className="mr-2 h-5 w-5" />
                )}
                {isLoading ? "Publishing..." : "Publish Post"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
