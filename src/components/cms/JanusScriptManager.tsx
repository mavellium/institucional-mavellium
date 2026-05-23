import Script from 'next/script'

interface JanusScript {
  id: string
  name: string
  code: string
  position: 'HEAD' | 'BODY_END'
}

interface JanusScriptManagerProps {
  siteId: string
  apiBase?: string
}

async function fetchScripts(siteId: string, apiBase: string): Promise<JanusScript[]> {
  try {
    const response = await fetch(`${apiBase}/api/sites/${siteId}/scripts`, {
      cache: 'no-store',
    })
    const { ok, data } = await response.json()
    return ok && Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function isExternalScript(code: string): boolean {
  return /<script[^>]+src=/i.test(code)
}

export async function JanusScriptManager({
  siteId,
  apiBase = 'https://januscms.com.br',
}: JanusScriptManagerProps) {
  const scripts = await fetchScripts(siteId, apiBase)
  const headScripts = scripts.filter((s) => s.position === 'HEAD')
  const bodyScripts = scripts.filter((s) => s.position === 'BODY_END')

  return (
    <>
      {headScripts.map((script) => {
        const isExternal = isExternalScript(script.code)

        if (isExternal) {
          const srcMatch = script.code.match(/src=["']([^"']+)["']/i)
          const src = srcMatch?.[1]
          if (src) {
            return (
              <Script
                key={script.id}
                src={src}
                strategy="afterInteractive"
              />
            )
          }
        } else {
          return (
            <Script
              key={script.id}
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: script.code
                  .replace(/<script[^>]*>/gi, '')
                  .replace(/<\/script>/gi, ''),
              }}
            />
          )
        }
      })}

      {bodyScripts.length > 0 && (
        <BodyScripts scripts={bodyScripts} />
      )}
    </>
  )
}

function BodyScripts({ scripts }: { scripts: JanusScript[] }) {
  return (
    <>
      {scripts.map((script) => {
        const isExternal = isExternalScript(script.code)

        if (isExternal) {
          const srcMatch = script.code.match(/src=["']([^"']+)["']/i)
          const src = srcMatch?.[1]
          if (src) {
            return (
              <Script
                key={script.id}
                src={src}
                strategy="lazyOnload"
              />
            )
          }
        } else {
          return (
            <Script
              key={script.id}
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: script.code
                  .replace(/<script[^>]*>/gi, '')
                  .replace(/<\/script>/gi, ''),
              }}
            />
          )
        }
      })}
    </>
  )
}
