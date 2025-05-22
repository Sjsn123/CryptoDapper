
"use client";

import { useState } from "react";
import { FaqItem } from "@/components/core/faq-item";
import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { FAQS_DATA } from "@/constants";
import { Search } from "lucide-react";

export default function FaqsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = FAQS_DATA.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about Digital Dapper and digital asset concepts.
        </p>
      </header>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
      </div>

      {filteredFaqs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {filteredFaqs.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-muted-foreground py-8">No FAQs found matching your search.</p>
      )}
    </div>
  );
}

    
