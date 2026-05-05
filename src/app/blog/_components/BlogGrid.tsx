"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlogCard } from "../../../components/ui/blog-card";
import { cn } from "@/src/lib/utils";
import {
  type BlogPost,
  type BlogCategory,
  getAllCategories,
} from "../../../lib/blog";

interface BlogGridProps {
  posts: BlogPost[];
}

const ALL = "Todos";
type FilterValue = BlogCategory | typeof ALL;

export function BlogGrid({ posts }: BlogGridProps) {
  const [active, setActive] = useState<FilterValue>(ALL);
  const categories = getAllCategories();

  const filtered =
    active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[ALL, ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat as FilterValue)}
            className={cn(
              "px-5 py-2 rounded-sm text-sm font-bold transition-all duration-300 border", // rounded-sm para visual mais corporativo
              active === cat
                ? "bg-[#00D26A] text-black border-[#00D26A] shadow-sm" // Verde Mavellium com texto preto (contraste perfeito)
                : "bg-white text-zinc-600 border-zinc-200 hover:border-[#00D26A]/50 hover:bg-[#00D26A]/5 hover:text-[#00b35a]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-light text-zinc-400 py-20"
          >
            Nenhum artigo nessa categoria ainda.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}