export function SdkInstall() {
  return (
    <section aria-labelledby="install-heading" className="mb-12">
      <h2
        id="install-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Instalação
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        Escolha o método adequado ao seu cenário: projeto independente via
        registry npm, projeto dentro do monorepo Mavellium via workspace, ou
        desenvolvimento local com{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          pnpm link
        </code>
        .
      </p>

      {/* Opção A — npm */}
      <section aria-labelledby="install-npm-heading" className="mb-8">
        <h3
          id="install-npm-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          Opção A — Projeto externo (npm / pnpm / yarn)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Instale o pacote publicado no registry:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`npm i janus-sdk
# ou
pnpm add janus-sdk
# ou
yarn add janus-sdk`}</code>
        </pre>
      </section>

      {/* Opção B — workspace */}
      <section aria-labelledby="install-workspace-heading" className="mb-8">
        <h3
          id="install-workspace-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          Opção B — Monorepo Mavellium (pnpm workspace)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Se o seu projeto já está dentro do monorepo, o{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            janus-sdk
          </code>{" "}
          já está linkado via workspace. Declare a dependência no{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            package.json
          </code>{" "}
          do seu projeto e instale na raiz:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`// package.json do seu projeto
{
  "dependencies": {
    "janus-sdk": "workspace:*"
  }
}

// Instale na raiz do monorepo
pnpm install`}</code>
        </pre>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          O pnpm cria um symlink em{" "}
          <code className="font-mono">node_modules/janus-sdk</code> → pasta{" "}
          <code className="font-mono">janus-sdk/dist/</code>. Rode{" "}
          <code className="font-mono">pnpm build</code> no SDK antes de usar, ou
          mantenha{" "}
          <code className="font-mono">pnpm dev</code> em watch mode em outro
          terminal.
        </p>
      </section>

      {/* Opção C — pnpm link */}
      <section aria-labelledby="install-link-heading" className="mb-8">
        <h3
          id="install-link-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          Opção C — Desenvolvimento local (pnpm link)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Para testar o SDK em um projeto externo sem publicar no npm:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`# 1. No diretório do SDK — registra o link global
cd janus-sdk
pnpm build
pnpm link --global

# 2. No seu projeto externo — conecta ao link
cd /caminho/do/seu-projeto
pnpm link --global janus-sdk

# A partir daqui, importe normalmente:
# import { JanusClient } from "janus-sdk"

# Quando terminar os testes:
pnpm unlink janus-sdk`}</code>
        </pre>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          O link aponta diretamente para{" "}
          <code className="font-mono">janus-sdk/dist/</code>. Qualquer rebuild
          do SDK com{" "}
          <code className="font-mono">pnpm build</code> reflete imediatamente no
          projeto linkado, sem precisar re-executar o link.
        </p>
      </section>

      {/* Variáveis de ambiente */}
      <section aria-labelledby="env-heading">
        <h3
          id="env-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Variáveis de ambiente necessárias
        </h3>
        <div className="overflow-x-auto rounded-md border border-zinc-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Variável
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Exemplo
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 font-mono text-zinc-700">
                  JANUS_URL
                </td>
                <td className="px-4 py-3 font-mono text-zinc-500">
                  https://cms.exemplo.com.br
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  URL base do Janus (sem barra final)
                </td>
              </tr>
              <tr className="bg-zinc-50/50">
                <td className="px-4 py-3 font-mono text-zinc-700">
                  JANUS_TENANT_ID
                </td>
                <td className="px-4 py-3 font-mono text-zinc-500">
                  minha-empresa
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  companySlug cadastrado no Janus
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
