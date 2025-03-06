"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail(""); // Reset the input field
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated with MediMart</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for health tips, medicine updates, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto px-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
