import { NextRequest } from "next/server";
import { pool, ensureFitecVisitorsTable } from "@/src/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return Response.json(
        { error: "Nome, e-mail e telefone são obrigatórios." },
        { status: 400 }
      );
    }

    await ensureFitecVisitorsTable();

    await pool.query(
      "INSERT INTO fitec_visitors (name, email, phone) VALUES ($1, $2, $3)",
      [name.trim(), email.trim(), phone.trim()]
    );

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[fitec-register]", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
