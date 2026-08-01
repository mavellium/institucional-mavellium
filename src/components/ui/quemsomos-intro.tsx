// Intro (H1 + parágrafo) de /quem-somos — editável via Janus (bloco da
// página, ver janus-quemsomos-sections.tsx). Default = copy atual, usado
// enquanto o campo não é preenchido no admin.
interface QuemSomosIntroProps {
  kicker?: string;
  heading?: string;
  description?: string;
}

const DEFAULT_DESCRIPTION =
  "A Mavellium não é uma agência de web design. É a criadora e líder de uma nova categoria de mercado: AI Visibility Infrastructure — a base tecnológica, a estruturação semântica de dados e a observabilidade contínua necessárias para que uma marca seja lida, compreendida e ativamente recomendada por grandes modelos de linguagem como ChatGPT, Perplexity AI e Google Gemini. Fundada por Vinícius Tavares Mota, Luan dos Santos e Márcio Piva Junior, sediada no polo tecnológico de Garça, São Paulo.";

export function QuemSomosIntro({
  kicker = "Institucional · Sobre nós",
  heading = "Quem Somos",
  description = DEFAULT_DESCRIPTION,
}: QuemSomosIntroProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 pt-12">
      <header className="pb-10 border-b border-zinc-200">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-3 py-1 bg-[#00D26A]/5">
            {kicker}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
          {heading}
        </h1>

        <p className="text-base text-zinc-600 font-light leading-relaxed">
          {description}
        </p>
      </header>
    </article>
  );
}
