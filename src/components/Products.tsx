import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    id: 'markisen', tag: '01',
    eyebrow: 'Sonnenstoren & Markisen',
    headline: 'Draussen sein.\nOhne Kompromisse.',
    sub: 'Von der eleganten Kassettenmarkise bis zur motorisierten Pergola — massgeschneidert für Ihre Architektur.',
    bg: '#000', dark: true,
    imgs: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/cc/d0/ccd083de-1241-4bcf-b49d-e35d8008fd1f/smr_web_was_markisen_2.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a1/ab/a1ab6d94-9158-4b05-a511-c5aa424ff277/smr_web_was_markisen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/bc/0b/bc0bc12e-767d-48ca-ba90-7813d3de1012/smr_web_was_markisen_4.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
  },
  {
    id: 'rollladen', tag: '02',
    eyebrow: 'Rollladen & Lamellenstoren',
    headline: 'Schutz, der sich\nsehen lassen kann.',
    sub: 'Sicherheit und Wärmedämmung in zeitlosem Design. Manuell oder vollautomatisch.',
    bg: '#f5f5f7', dark: false,
    imgs: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/02/e3/02e313ba-2d75-4ec7-b42b-8ef8485ab143/smr_web_was_rolladen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/63/fd/63fd9ea8-bb7f-4170-976d-1794591baa6f/smr_web_was_rolladen_2.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/d6/78/d6783d86-2909-4c2a-adc7-e3f07f8e27bd/smr_web_was_rolladen_3.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
  },
  {
    id: 'plissees', tag: '03',
    eyebrow: 'Plissees & Jalousien',
    headline: 'Licht nach\nIhren Regeln.',
    sub: 'Präziser Blendschutz für Innenräume — in jeder Farbe, für jedes Fenster, perfekt auf Mass.',
    bg: '#000', dark: true,
    imgs: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/c3/69/c369d35d-2487-4696-a02d-ee01bf774eee/smr_web_was_jalousien_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/41/b1/41b145ac-85e9-4e73-8678-2a3223af1fce/smr_web_was_jalousien_3.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/df/de/dfde0baa-7450-44bb-a585-cec503ba5ae0/smr_web_was_plissees5.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
  },
  {
    id: 'service', tag: '04',
    eyebrow: 'Reparaturen & Service',
    headline: 'Schnell da.\nPräzise repariert.',
    sub: 'Herstellerunabhängig, fachkundig, nachhaltig. Wir verlängern die Lebensdauer jeder Anlage.',
    bg: '#f5f5f7', dark: false,
    imgs: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e8/2f/e82f726d-c392-4df2-8a50-2f352818027b/smr_web_was_reparaturen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e8/c5/e8c5ef05-9f55-4cce-86e7-7a29c894f4a2/smr_web_was_rolladen_5.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
  },
]

function ProductBlock({ p }: { p: typeof PRODUCTS[0] }) {
  const [img, setImg] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prod-text-' + p.id, {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 48, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
      })
      gsap.from(imgWrapRef.current, {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        scale: 0.95, opacity: 0, duration: 1.1, ease: 'power2.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [p.id])

  const tc = (a: number) => p.dark ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`

  return (
    <section ref={ref} id={p.id} style={{ background: p.bg }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(60px,10vw,120px) 32px',
        display: 'grid',
        gridTemplateColumns: p.dark ? '1fr 1fr' : '1fr 1fr',
        gap: 'clamp(32px,6vw,80px)',
        alignItems: 'center',
      }}
      className="products-grid"
      >
        {/* Text side */}
        <div style={{ order: p.dark ? 0 : 1 }}>
          <p className={`prod-text-${p.id}`} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 12,
          }}>{p.tag} — {p.eyebrow}</p>

          <h2 className={`prod-text-${p.id}`} style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(28px,4vw,52px)',
            fontWeight: 600, lineHeight: 1.06,
            letterSpacing: '-0.026em',
            color: p.dark ? '#fff' : '#1d1d1f',
            whiteSpace: 'pre-line', marginBottom: 18,
          }}>{p.headline}</h2>

          <p className={`prod-text-${p.id}`} style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.56,
            color: tc(0.58),
            marginBottom: 32, maxWidth: 400,
          }}>{p.sub}</p>

          <div className={`prod-text-${p.id}`} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#kontakt" style={{
              background: 'var(--accent)', color: '#000',
              fontSize: 15, fontWeight: 500,
              padding: '10px 24px', borderRadius: 980,
            }}>Beratung anfragen</a>
            <a href="#kontakt" style={{
              color: p.dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)',
              fontSize: 15, padding: '10px 4px',
            }}>Mehr erfahren ›</a>
          </div>
        </div>

        {/* Image side */}
        <div ref={imgWrapRef} style={{ order: p.dark ? 1 : 0 }}>
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            aspectRatio: '4/3',
            boxShadow: p.dark
              ? '0 32px 80px rgba(0,0,0,0.6)'
              : '0 24px 60px rgba(0,0,0,0.14)',
            position: 'relative',
          }}>
            <img src={p.imgs[img]} alt={p.eyebrow} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'opacity 0.4s ease',
            }}/>
          </div>
          {/* Thumbnails */}
          {p.imgs.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
              {p.imgs.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} style={{
                  width: 52, height: 38, borderRadius: 8,
                  overflow: 'hidden', padding: 0, border: 'none',
                  cursor: 'pointer',
                  outline: img === i ? `2px solid var(--accent)` : '2px solid transparent',
                  outlineOffset: 2,
                  opacity: img === i ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}>
                  <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Products() {
  return <div id="produkte">{PRODUCTS.map(p => <ProductBlock key={p.id} p={p}/>)}</div>
}
