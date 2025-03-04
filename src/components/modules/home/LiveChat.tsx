"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function LiveChat() {
  useEffect(() => {
    const loadTawkTo = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/67c6e8147c98a8190c587f75/1ilgfl4jr';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.head.appendChild(s1);
    };

    if (document.readyState === 'complete') {
      loadTawkTo();
    } else {
      window.addEventListener('load', loadTawkTo);
      return () => window.removeEventListener('load', loadTawkTo);
    }
  }, []);

  return null;
}
