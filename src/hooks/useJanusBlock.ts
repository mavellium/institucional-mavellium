"use client";

import { useEffect, useState } from "react";

const JANUS_URL = process.env.NEXT_PUBLIC_JANUS_URL ?? "";
const JANUS_TENANT = process.env.NEXT_PUBLIC_JANUS_TENANT ?? "";

// Cache de sessão — limpa no hard refresh, persiste entre navegações
const cache = new Map<string, unknown>();

/**
 * Busca um bloco específico de uma página Janus, client-side.
 * F5 sempre busca fresco do Janus (sem cache do Next.js).
 *
 * @param pageSlug  slug da página no Janus (ex: "home")
 * @param blockId   id do bloco no schema (ex: "hero-section-mavellium")
 */
export function useJanusBlock<T>(pageSlug: string, blockId: string) {
  const key = `${pageSlug}::${blockId}`;
  const [data, setData] = useState<T | null>((cache.get(key) as T) ?? null);
  const [loading, setLoading] = useState(!cache.has(key) && !!pageSlug);

  useEffect(() => {
    if (!pageSlug || !blockId || !JANUS_URL || !JANUS_TENANT) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const url = `${JANUS_URL}/api/v1/content/${JANUS_TENANT}/${pageSlug}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((page: { schema: { content: Record<string, T> } }) => {
        if (cancelled) return;
        const block = page?.schema?.content?.[blockId] ?? null;
        if (block) {
          cache.set(key, block);
          setData(block);
        }
      })
      .catch((err) => {
        if (!cancelled) console.error(`[useJanusBlock] ${key}:`, err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key, pageSlug, blockId]);

  return { data, loading };
}

/**
 * Busca o schema de uma página Janus autorada em modo "advanced", client-side
 * — `schema` É o dado da página diretamente (sem mapa de blocos, sem blockId).
 * Ex: /quem-somos.
 *
 * @param pageSlug  slug da página no Janus (ex: "quem-somos")
 */
export function useJanusPageSchema<T>(pageSlug: string) {
  const key = `page-schema::${pageSlug}`;
  const [data, setData] = useState<T | null>((cache.get(key) as T) ?? null);
  const [loading, setLoading] = useState(!cache.has(key) && !!pageSlug);

  useEffect(() => {
    if (!pageSlug || !JANUS_URL || !JANUS_TENANT) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const url = `${JANUS_URL}/api/v1/content/${JANUS_TENANT}/${pageSlug}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((page: { schema: T }) => {
        if (cancelled) return;
        const schema = page?.schema ?? null;
        if (schema) {
          cache.set(key, schema);
          setData(schema);
        }
      })
      .catch((err) => {
        if (!cancelled) console.error(`[useJanusPageSchema] ${key}:`, err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key, pageSlug]);

  return { data, loading };
}
