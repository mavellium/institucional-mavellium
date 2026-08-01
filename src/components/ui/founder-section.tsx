// Reposicionamento GEO/AEO (doc/reposicionamento.md item 3.3 — "Quem lidera").
// Fatos reais reaproveitados de src/app/quem-somos/page.tsx (FOUNDERS) e do
// JSON-LD global (src/app/layout.tsx: foundingDate "2022", sede Garça-SP).
// Não há ainda uma bio pessoal ("por que fundou") registrada em nenhum lugar
// do site para nenhum dos três — em vez de inventar uma narrativa pessoal e
// atribuí-la a alguém, esta seção usa só o que é verificável: nomes, papéis
// e a missão da empresa (já publicada em src/app/docs/new-mavellium/quem-e-a-mavellium.md).
// Sem foto real disponível em public/ — usa iniciais como placeholder até
// haver asset real.
const FOUNDERS = [
  { name: "Vinícius Tavares Mota", role: "Co-fundador" },
  { name: "Luan dos Santos", role: "Co-fundador" },
  { name: "Márcio Piva Junior", role: "Co-fundador" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function FounderSection() {
  return (
    <section
      id="quem-lidera"
      aria-labelledby="quem-lidera-heading"
      className="w-full bg-zinc-50 py-24 px-6 border-t border-zinc-100"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="quem-lidera-heading"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight"
        >
          Quem lidera
        </h2>

        <p className="text-base md:text-lg text-zinc-600 font-light leading-relaxed mb-10 max-w-2xl">
          A Mavellium nasceu em Garça-SP, em 2022, para resolver um problema
          concreto: a IA não lê, não entende e não recomenda a maioria das
          empresas — ela recomenda o concorrente. É esse o problema que os
          fundadores constroem para resolver todos os dias.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6" role="list">
          {FOUNDERS.map((founder) => (
            <li
              key={founder.name}
              className="flex flex-col items-center text-center gap-3 rounded-md border border-zinc-200 bg-white px-6 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/30 flex items-center justify-center font-bold text-[#00D26A] text-lg">
                {initials(founder.name)}
              </div>
              <p className="text-sm font-bold text-zinc-900">
                {founder.name}
              </p>
              <p className="text-xs text-zinc-500 font-light tracking-wide uppercase">
                {founder.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
