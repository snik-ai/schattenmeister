import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    id: 'wohn',
    label: 'Wohneigentum',
    tag: '01',
    headline: 'Ihr Zuhause.\nPerfekt beschattet.',
    body: 'Von der Terrassenmarkise bis zum motorisierten Rollladen — wir gestalten Ihren Aussenbereich so, dass er in jeder Jahreszeit genossen werden kann.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/fb/d5/fbd5b3b1-0e7e-4331-8915-f67b5e336469/smr_web_wo_wohn.jpg__738x612_q85_subsampling-2_upscale.jpg',
  },
  {
    id: 'gewerbe',
    label: 'Gewerbe',
    tag: '02',
    headline: 'Arbeitswelten,\ndie überzeugen.',
    body: 'Effiziente Sonnenschutzsysteme senken Energiekosten und schaffen ein angenehmes Raumklima — für produktivere Teams und beeindruckte Kunden.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/da/2c/da2c7ead-d622-47e1-ac3f-f159fbe7775c/smr_web_wo_gewerbe.jpg__738x612_q85_subsampling-2_upscale.jpg',
  },
  {
    id: 'gastro',
    label: 'Gastronomie',
    tag: '03',
    headline: 'Mehr Gäste.\nLängere Saison.',
    body: 'Intelligente Terrassenbeschattung macht aus einem guten Restaurantabend ein unvergessliches Erlebnis — bei jedem Wetter.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/08/3d/083ddbef-2658-48b2-a987-ac40b499f424/smr_web_wo_gastronomie1.jpg__738x612_q85_subject_location-840%2C700_subsampling-2_upscale.jpg',
  },
  {
    id: 'public',
    label: 'Öffentliche Einrichtungen',
    tag: '04',
    headline: 'Nachhaltig.\nFür alle.',
    body: 'Schulen, Spitäler, Gemeindegebäude: Wartungsarme, langlebige Lösungen für öffentliche Auftraggeber — mit Qualitätsgarantie.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/ef/f4/eff4f397-17ef-40ad-8bda-e0b4bccce8bc/smr_web_wo_oeffentlicheeinrichtungen.jpg__738x612_q85_subsampling-2_upscale.jpg',
  },
  {
    id: 'miete',
    label: 'Mietwohnungen',
    tag: '05',
    headline: 'Portfolio-Lösungen\ndie sich rechnen.',
    body: 'Einheitliche Systeme, einfache Wartung, attraktive Konditionen für Verwaltungen und Eigentümer mit mehreren Liegenschaften.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/61/b3/61b3c456-7ae6-4d42-9d72-36bb5025774b/smr_web_wo_mietwohnungen.jpg__738x612_q85_subsampling-2_upscale.jpg',
  },
]

export default function Markets() {
  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.markets-header', {
        scrollTrigger: { trigger: '.markets-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.market-tab', {
        scrollTrigger: { trigger: '.market-tabs', start: 'top 85%' },
        x: -30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const changeActive = (i: number) => {
    if (i === active) return
    setPrevActive(active)
    // Animate out old, animate in new
    gsap.to(imgRef.current, { opacity: 0, scale: 1.04, duration: 0.28, ease: 'power2.in', onComplete: () => {
      setActive(i)
      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }
      )
    }})
    gsap.to(textRef.current, { opacity: 0, y: 14, duration: 0.22, ease: 'power2.in', onComplete: () => {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }})
  }

  const cur = ITEMS[active]

  return (
    <section ref={sectionRef} style={{ background: '#fff', padding: '120px 0 0' }}>
      {/* Header */}
      <div className="markets-header" style={{ textAlign: 'center', padding: '0 24px 72px' }}>
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14,
        }}>Einsatzgebiete</p>
        <h2 style={{
          fontFamily: 'var(--f)',
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          fontWeight: 600, lineHeight: 1.07,
          letterSpacing: '-0.025em', color: '#1d1d1f',
          marginBottom: 14,
        }}>Für jeden Einsatzbereich.</h2>
        <p style={{
          fontSize: 20, fontWeight: 300, lineHeight: 1.45,
          color: 'rgba(0,0,0,0.48)', maxWidth: 440, margin: '0 auto',
        }}>Vom Einfamilienhaus bis zum Gewerbekomplex.</p>
      </div>

      {/* Interactive layout */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '300px 1fr',
        gap: 0, minHeight: 580,
      }}
      className="markets-layout"
      >
        {/* Left — tab list */}
        <div className="market-tabs" style={{
          borderRight: '1px solid #e8e8ed',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 0 0 32px',
        }}>
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              className={`market-tab ${active === i ? 'market-tab-active' : ''}`}
              onClick={() => changeActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 24px 20px 0',
                borderBottom: i < ITEMS.length - 1 ? '1px solid #f0f0f3' : 'none',
                background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'left', width: '100%',
                position: 'relative',
              }}
            >
              {/* Active indicator — vertical on desktop, horizontal bottom on mobile */}
              <div className="market-indicator" style={{
                position: 'absolute', left: -32, top: '50%', transform: 'translateY(-50%)',
                width: 3, height: active === i ? 48 : 0,
                background: 'var(--accent)', borderRadius: 2,
                transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}/>
              <div className="market-tab-active-line" style={{
                position: 'absolute', bottom: 0, left: 8, right: 8,
                height: active === i ? 2 : 0,
                background: 'var(--accent)', borderRadius: 2,
                transition: 'height 0.25s ease',
              }}/>
              <span style={{
                fontSize: 11, fontWeight: 500,
                color: active === i ? 'var(--accent)' : 'rgba(0,0,0,0.24)',
                letterSpacing: '0.06em', minWidth: 22,
                transition: 'color 0.25s',
              }}>{item.tag}</span>
              <span style={{
                fontSize: 16, fontWeight: active === i ? 600 : 400,
                color: active === i ? '#1d1d1f' : 'rgba(0,0,0,0.52)',
                letterSpacing: '-0.015em',
                transition: 'all 0.25s',
              }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right — content */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Image */}
          <div ref={imgRef} style={{
            flex: '1 1 400px', position: 'relative', overflow: 'hidden', minHeight: 360,
          }}>
            <img src={cur.img} alt={cur.label} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center center',
            }}/>
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)',
            }}/>
            {/* Text overlay on image */}
            <div ref={textRef} style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '40px 48px',
            }}>
              <p style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--accent)', marginBottom: 10,
              }}>{cur.label}</p>
              <h3 style={{
                fontFamily: 'var(--f)',
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 600, lineHeight: 1.1,
                letterSpacing: '-0.022em', color: '#fff',
                whiteSpace: 'pre-line', marginBottom: 14,
              }}>{cur.headline}</h3>
              <p style={{
                fontSize: 16, lineHeight: 1.55,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: 480, marginBottom: 24,
              }}>{cur.body}</p>
              <a href="#kontakt" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--accent)', color: '#000',
                fontSize: 14, fontWeight: 500,
                padding: '10px 22px', borderRadius: 980,
              }}>Beratung anfragen →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: 80 }}/>
    </section>
  )
}
