import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            color: '#00D26A',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          MAVELLIUM
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: 58,
            fontWeight: 300,
            lineHeight: 1.15,
            marginBottom: 36,
            maxWidth: 880,
          }}
        >
          Tecnologia, Sites e Inteligência Artificial
        </div>
        <div style={{ color: '#52525b', fontSize: 26 }}>mavellium.com.br</div>
      </div>
    ),
    { ...size }
  )
}
