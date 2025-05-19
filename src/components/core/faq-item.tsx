import type { FAQ } from "@/types";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FaqItemProps {
  faq: FAQ;
}

export function FaqItem({ faq }: FaqItemProps) {
  return (
    <AccordionItem value={faq.id} className="border-b-border/50">
      <AccordionTrigger className="text-left text-lg hover:no-underline text-foreground hover:text-gold-accent">
        <div className="flex items-center">
          <HelpCircle className="mr-3 h-5 w-5 text-accent shrink-0" /> 
          {faq.question}
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
}
