"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { cn } from "@/src/lib/utils";
import { type BlogPost, CATEGORY_COLORS, formatDate } from "@/src/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
  index?: number;
  priority?: boolean;
}

export function BlogCard({
  post,
  variant = "default",
  index = 0,
  priority = false,
}: BlogCardProps) {
  const colors = CATEGORY_COLORS[post.category];

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <Card className="overflow-hidden border-zinc-200 hover:border-blue-300 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-500 rounded-3xl bg-white">
          <div className="lg:grid lg:grid-cols-[55%_45%]">
            <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden min-h-[280px] lg:min-h-[400px]">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                priority={priority}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
                      colors.bg,
                      colors.text,
                      colors.border
                    )}
                  >
                    {post.category}
                  </div>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                    Artigo em Destaque
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 leading-snug group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-zinc-500 leading-relaxed line-clamp-4">
                  {post.description}
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0",
                      post.author.avatarColor
                    )}
                  >
                    {post.author.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {formatDate(post.publishedAt)} ·{" "}
                      {post.readingTimeMinutes} min de leitura
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Ler artigo completo <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <Card className="h-full flex flex-col overflow-hidden border-zinc-200 hover:border-blue-300 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-500 rounded-2xl bg-white">
          <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4">
              <div
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
                  colors.bg,
                  colors.text,
                  colors.border
                )}
              >
                {post.category}
              </div>
            </div>
          </div>

          <CardContent className="flex flex-col flex-1 p-6 space-y-3">
            <h3 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 flex-1">
              {post.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0",
                    post.author.avatarColor
                  )}
                >
                  {post.author.avatarInitials}
                </div>
                <span className="text-xs text-zinc-500 truncate max-w-[120px]">
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 flex-shrink-0">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingTimeMinutes} min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.article>
  );
}
