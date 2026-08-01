import Image from "next/image";

// Fundadores de /quem-somos — editável via Janus. Nomes reais já usados no
// JSON-LD global (src/app/layout.tsx) ficam como default até o campo
// "founders" ser preenchido no admin; foto é opcional — sem imagem cai pro
// avatar de iniciais (sem inventar asset). Foto em retrato (vertical),
// não circular.
export interface Founder {
  name: string;
  role?: string;
  description?: string;
  image?: string;
}

interface FoundersGridProps {
  heading?: string;
  founders?: Founder[];
}

const DEFAULT_FOUNDERS: Founder[] = [
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

export function FoundersGrid({ heading = "Fundadores", founders }: FoundersGridProps) {
  const list = founders && founders.length > 0 ? founders : DEFAULT_FOUNDERS;

  return (
    <section aria-labelledby="fundadores-heading" className="mb-12">
      <h2
        id="fundadores-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-6"
      >
        {heading}
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6" role="list">
        {list.map((founder) => (
          <li
            key={founder.name}
            className="flex flex-col rounded-md border border-zinc-200 bg-zinc-50/50 overflow-hidden"
          >
            {founder.image ? (
              <div className="relative w-full aspect-[3/4] bg-zinc-100 shrink-0">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/4] bg-[#00D26A]/10 border-b border-[#00D26A]/20 flex items-center justify-center font-bold text-[#00D26A] text-3xl shrink-0">
                {initials(founder.name)}
              </div>
            )}
            <div className="p-5 text-center flex flex-col gap-2">
              <div>
                <p className="text-sm font-bold text-zinc-900">{founder.name}</p>
                {founder.role && (
                  <p className="text-xs text-zinc-500 font-light tracking-wide">
                    {founder.role}
                  </p>
                )}
              </div>
              {founder.description && (
                <p className="text-xs text-zinc-600 font-light leading-relaxed">
                  {founder.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
