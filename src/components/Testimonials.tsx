import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  { q: 'Von der Beratung bis zur Montage absolut professionell. Die Markise übertrifft unsere Erwartungen bei Weitem.', who: 'Familie Müller', where: 'Küsnacht ZH', stars: 5 },
  { q: 'Schnelle Reaktion, fairer Preis, tadelloses Ergebnis. Unsere Rollladen funktionieren seit der Montage einwandfrei.', who: 'T. Reinhardt', where: 'Bern', stars: 5 },
  { q: 'Bereits zum zweiten Mal beauftragt. Die Qualität und Freundlichkeit des Teams überzeugen jedes Mal aufs Neue.', who: 'M. & S. Hofmann', where: 'Winterthur', stars: 5 },
  { q: 'Unsere Gäste lieben die neue Terrassenbeschattung. Die Saison hat sich spürbar verlängert.', who: 'Restaurant Seegarten', where: 'Aargau', stars: 5 },
  { q: 'Kompetente Beratung ohne Verkaufsdruck. Man merkt sofort, dass hier echte Fachleute am Werk sind.', who: 'B. Keller', where: 'Pfäffikon SZ', stars: 5 },
  { q: 'Zuverlässiger Partner für unser gesamtes Portfolio. Einheitliche Qualität über alle Objekte.', who: 'Immobilien GmbH', where: 'Zürich', stars: 5 },
]

const CARD_W = 380
const GAP = 20

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [hovIdx, setHovIdx] = useState<number | null>(null)
  const [containerW, setContainerW] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Measure container width
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setContainerW(wrapRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % QUOTES.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [startAuto])

  const goTo = (i: number) => {
    setActive(i)
    startAuto()
  }

  // Touch swipe support
  const touchStart = useRef<number | null>(null)
  const touchDelta = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
    touchDelta.current = 0
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    touchDelta.current = e.touches[0].clientX - touchStart.current
  }
  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current < 0) goTo((active + 1) % QUOTES.length)
      else goTo((active - 1 + QUOTES.length) % QUOTES.length)
    }
    touchStart.current = null
    touchDelta.current = 0
  }

  // Center the active card
  const offset = containerW / 2 - (active * (CARD_W + GAP)) - CARD_W / 2

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-header', {
        scrollTrigger: { trigger: '.testi-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.testi-track', {
        scrollTrigger: { trigger: '.testi-track', start: 'top 88%' },
        y: 48, opacity: 0, duration: 1, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#000',
      padding: 'clamp(80px,10vw,140px) 0',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>
        {/* Header */}
        <div className="testi-header" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 56, flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14,
            }}>Kundenstimmen</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(32px,4.5vw,56px)',
              fontWeight: 600, lineHeight: 1.07,
              letterSpacing: '-0.025em', color: '#fff',
            }}>Was unsere<br/>Kunden sagen.</h2>
          </div>

          {/* Nav arrows */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => goTo((active - 1 + QUOTES.length) % QUOTES.length)}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >←</button>
            <button
              onClick={() => goTo((active + 1) % QUOTES.length)}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--accent)', border: 'none',
                color: '#000', fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >→</button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={wrapRef}
        className="testi-track"
        style={{ position: 'relative', touchAction: 'pan-y' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Fade masks */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(to right, #000, transparent)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(to left, #000, transparent)', pointerEvents: 'none' }}/>

        <div
          style={{
            display: 'flex', gap: GAP,
            transform: `translateX(${offset}px)`,
            transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
          }}
          onMouseLeave={() => setHovIdx(null)}
        >
          {QUOTES.map((r, i) => {
            const isActive = i === active
            const isHov = hovIdx === i
            const dimmed = hovIdx !== null && !isHov
            // Distance from active for scale effect
            const dist = Math.abs(i - active)
            const scaleDown = dist === 0 ? 1 : dist === 1 ? 0.96 : 0.92

            return (
              <figure
                key={r.who}
                onClick={() => goTo(i)}
                onMouseEnter={() => setHovIdx(i)}
                style={{
                  flex: `0 0 ${CARD_W}px`,
                  background: isActive
                    ? 'linear-gradient(145deg, rgba(191,212,98,0.12) 0%, rgba(191,212,98,0.02) 100%)'
                    : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? '1px solid rgba(191,212,98,0.3)'
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 22,
                  padding: '36px 32px',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 280,
                  cursor: 'pointer',
                  transform: isHov
                    ? 'translateY(-8px) scale(1.03)'
                    : dimmed
                    ? `scale(${scaleDown * 0.97})`
                    : `scale(${scaleDown})`,
                  opacity: dimmed ? 0.4 : dist > 1 ? 0.6 : 1,
                  transition: 'all 0.55s cubic-bezier(0.23,1,0.32,1)',
                  position: 'relative', overflow: 'hidden',
                  margin: 0,
                }}
              >
                {/* Accent glow */}
                {isActive && (
                  <div style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 140, height: 140, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(191,212,98,0.18) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}/>
                )}

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <Stars n={r.stars} />
                    <div style={{
                      fontSize: 48, lineHeight: 1, fontFamily: 'Georgia, serif',
                      color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                      transition: 'color 0.4s',
                      marginTop: -8,
                    }}>"</div>
                  </div>

                  <blockquote style={{
                    fontSize: 17, lineHeight: 1.6,
                    letterSpacing: '-0.015em',
                    color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.4s',
                  }}>{r.q}</blockquote>
                </div>

                <figcaption style={{
                  marginTop: 28, paddingTop: 20,
                  borderTop: isActive
                    ? '1px solid rgba(191,212,98,0.15)'
                    : '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'border-color 0.4s',
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700,
                    color: isActive ? '#000' : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.4s', flexShrink: 0,
                  }}>
                    {r.who.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 15, fontWeight: 600,
                      color: '#fff', letterSpacing: '-0.01em',
                    }}>{r.who}</div>
                    <div style={{
                      fontSize: 12, color: 'rgba(255,255,255,0.32)', marginTop: 2,
                    }}>{r.where}</div>
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        display: 'flex', gap: 6, justifyContent: 'center',
        marginTop: 44, padding: '0 32px',
      }}>
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? 40 : 8,
              height: 8, borderRadius: 4,
              background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.5s cubic-bezier(0.23,1,0.32,1), background 0.3s',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Auto-progress fill */}
            {i === active && (
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                background: 'var(--accent-dark)',
                borderRadius: 4,
                animation: 'progress-fill 5s linear',
              }}/>
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
