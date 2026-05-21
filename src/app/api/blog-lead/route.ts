import { NextRequest } from "next/server";
import { pool, ensureBlogLeadsTable } from "@/src/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, whatsapp, articleSlug, articleTitle } = await request.json();

    await ensureBlogLeadsTable();

    await pool.query(
      "INSERT INTO blog_leads (name, whatsapp, article_slug, article_title) VALUES ($1, $2, $3, $4)",
      [
        name?.trim() || null,
        whatsapp?.trim() || null,
        articleSlug?.trim() || null,
        articleTitle?.trim() || null,
      ]
    );

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[blog-lead]", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
