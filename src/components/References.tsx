import { useRef, useState } from 'react'

const LOGOS = [
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a2/07/a207aa60-5213-43f2-87c0-53f946127e05/smr_logo_referenzen_1.png__530x80_subsampling-2.png', alt: 'Referenz 1' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e7/cb/e7cb7050-118c-4579-b17f-7e09bb3d9226/smr_logo_referenzen_2.png__1023x80_subsampling-2.png', alt: 'Referenz 2' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/66/d0/66d09172-4ed4-489b-9191-26fac3640eb7/smr_logo_referenzen_3.png__586x80_subsampling-2.png', alt: 'Referenz 3' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e7/de/e7de740a-1bab-4cc8-9a99-dd5039bd6175/zkb.png__393x122_q85_subsampling-2.jpg', alt: 'ZKB' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e5/68/e568c62e-0ebb-4a57-a446-34cc9f7138d5/sisbau.jpeg__396x84_q85_subsampling-2.jpg', alt: 'Sisbau' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a6/bb/a6bbe87f-1b3b-47c4-89ad-3f57c84c3640/unbenannt.jpg__434x116_q85_subsampling-2.jpg', alt: 'Referenz 6' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/78/ad/78ad108e-cfbb-4b43-9401-ac76b188d9be/logo_schwarz.png__596x399_subsampling-2.png', alt: 'Referenz 7' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/4f/18/4f187a6b-7d5c-4602-a019-cd55d850023b/logo.png__459x138_subsampling-2.png', alt: 'Referenz 8' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e3/17/e317e43d-cc74-49de-8ac4-1448732d6f87/hbre.png__640x238_subsampling-2.png', alt: 'HBRE' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/2a/5b/2a5be87e-5c4e-4b23-9255-65bbf0c5b4ef/logo_argoviabaugmbh_trans-mittel-weiss.png__650x168_subsampling-2.png', alt: 'Argovia Bau' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/45/95/45954bd6-e775-47c3-a829-d174c8503efe/wohnagenturlogo-2.png__150x75_subsampling-2.png', alt: 'Wohnagentur' },
  { src: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/f5/55/f555803f-b0e5-465b-a136-49ecc49f1c0d/bildschirmfoto_11-5-2025_25819.jpeg__1569x223_q85_subsampling-2.jpg', alt: 'Referenz 12' },
]

// Triplicate for seamless long loop
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS]

export default function References() {
  const [paused, setPaused] = useState(false)
  const [hov, setHov] = useState<number | null>(null)

  return (
    <section style={{
      background: '#fff',
      borderTop: '1px solid #e8e8ed',
      borderBottom: '1px solid #e8e8ed',
      padding: '56px 0',
      overflow: 'hidden',
    }}>
      <p style={{
        textAlign: 'center', fontSize: 11, fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.28)', marginBottom: 40,
      }}>Vertrauen von führenden Unternehmen</p>

      {/* Marquee */}
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHov(null) }}
      >
        {/* Fade masks */}
        <div style={{ position:'absolute',left:0,top:0,bottom:0,width:160,zIndex:2, background:'linear-gradient(to right,#fff,transparent)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute',right:0,top:0,bottom:0,width:160,zIndex:2, background:'linear-gradient(to left,#fff,transparent)', pointerEvents:'none' }}/>

        <div style={{
          display: 'flex', alignItems: 'center',
          width: 'max-content',
          animation: 'marquee-roll 38s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}>
          {TRACK.map((logo, i) => {
            const isHov = hov === i
            const dim = hov !== null && !isHov
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  padding: '0 52px',
                  height: 60,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isHov ? 'scale(1.25) translateY(-2px)' : dim ? 'scale(0.9)' : 'scale(1)',
                }}
              >
                <img
                  src={logo.src} alt={logo.alt}
                  style={{
                    height: 44, maxWidth: 160,
                    objectFit: 'contain',
                    filter: isHov
                      ? 'brightness(0) sepia(1) saturate(6) hue-rotate(38deg) brightness(1.15)'
                      : 'grayscale(100%)',
                    opacity: isHov ? 1 : dim ? 0.15 : 0.38,
                    transition: 'filter 0.4s, opacity 0.4s',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee-roll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
