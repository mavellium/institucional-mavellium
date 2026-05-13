"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
