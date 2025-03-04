"use client";
import { useEffect } from "react";

export default function LiveChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67c6e8147c98a8190c587f75/1ilgfl4jr";
    script.async = true;
    script.setAttribute("crossorigin", "*");
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
