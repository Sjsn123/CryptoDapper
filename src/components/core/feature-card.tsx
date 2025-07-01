import type { Feature } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon;
  return (
    <Card className={cn("h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1")}>
      <CardHeader>
        <div className="mb-4 flex justify-center items-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
          <IconComponent className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
