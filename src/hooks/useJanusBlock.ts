"use client";

import { useEffect, useState } from "react";
import { JanusClient } from "janus-sdk";

// Module-level singleton — recriado apenas em hard refresh (igual ao tegbe)
let _client: JanusClient | null = null;

function getClient(): JanusClient {
  if (!_client) {
    _client = new JanusClient({
      baseUrl: process.env.NEXT_PUBLIC_JANUS_URL ?? "",
      tenantId: process.env.NEXT_PUBLIC_JANUS_TENANT ?? "",
    });
  }
  return _client;
}

// Cache de sessão — limpa no hard refresh, persiste entre navegações
const cache = new Map<string, unknown>();

/**
 * Busca um bloco específico de uma página Janus, client-side.
 * Estratégia stale-while-revalidate: serve cache imediatamente e
 * revalida em background — F5 sempre busca fresco do Janus.
 *
 * @param pageSlug  slug da página no Janus (ex: "home")
 * @param blockId   id do bloco no schema (ex: "hero-section-mavellium")
 */
export function useJanusBlock<T>(pageSlug: string, blockId: string) {
  const key = `${pageSlug}::${blockId}`;
  const [data, setData] = useState<T | null>((cache.get(key) as T) ?? null);
  const [loading, setLoading] = useState(!cache.has(key) && !!pageSlug);

  useEffect(() => {
    if (!pageSlug || !blockId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    getClient()
      .getPage(pageSlug)
      .then((page) => {
        if (cancelled || !page) return;
        const content = page.content as Record<string, T> | null;
        const block = content?.[blockId] ?? null;
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
