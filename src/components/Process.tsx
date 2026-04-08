import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { n: '21+', l: 'Jahre Erfahrung' },
  { n: '100+', l: 'Projekte' },
  { n: '2', l: 'Standorte' },
  { n: '4', l: 'Partner' },
]

const WHY = [
  { title: 'Erfahrung & Kompetenz', body: 'Über 21 Jahre Branchenwissen und ein eigenes Fachteam für jede Aufgabe.' },
  { title: 'Keine Subunternehmer', body: 'Jede Montage führen wir selbst durch — volle Kontrolle, volle Verantwortung.' },
  { title: 'Herstellerunabhängig', body: 'Wir beraten produktneutral und reparieren jede Anlage, jede Marke.' },
]

export default function Process() {
  const statsRef = useRef<HTMLElement>(null)
  const whyRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats count-up
      gsap.from('.stat-num', {
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
      // Why cards slide in
      gsap.from('.why-card', {
        scrollTrigger: { trigger: whyRef.current, start: 'top 78%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
      gsap.from('.why-header', {
        scrollTrigger: { trigger: whyRef.current, start: 'top 82%' },
        y: 36, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Stats — white */}
      <section ref={statsRef} style={{
        background: '#fff',
        borderTop: '1px solid #e8e8ed',
        borderBottom: '1px solid #e8e8ed',
      }}>
        <div style={{
          maxWidth: 980, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        }}
        className="stats-grid"
        >
          {STATS.map((s, i) => (
            <div key={s.l} style={{
              textAlign: 'center', padding: '64px 20px',
              borderRight: i < 3 ? '1px solid #e8e8ed' : 'none',
            }}>
              <div className="stat-num" style={{
                fontFamily: 'var(--f)',
                fontSize: 'clamp(44px,5.5vw,72px)',
                fontWeight: 600, lineHeight: 1,
                letterSpacing: '-0.03em', color: '#1d1d1f',
              }}>{s.n}</div>
              <div style={{
                fontSize: 13, marginTop: 10,
                color: 'rgba(0,0,0,0.44)', letterSpacing: '-0.01em',
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why — dark */}
      <section ref={whyRef} style={{ background: '#000', padding: 'clamp(72px,10vw,140px) clamp(16px,4vw,32px)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div className="why-header" style={{ textAlign: 'center', marginBottom: 72 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14,
            }}>Warum wir</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(32px,4.5vw,56px)',
              fontWeight: 600, lineHeight: 1.07,
              letterSpacing: '-0.025em', color: '#fff', marginBottom: 14,
            }}>Nicht das billigste.<br/>Das beste Angebot.</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
            gap: 2,
          }}>
            {WHY.map((w, i) => (
              <div key={w.title} className="why-card" style={{
                padding: 'clamp(32px,5vw,52px) clamp(24px,4vw,44px)',
                background: ['#141415','#1a1a1b','#111112'][i],
                borderRadius: i === 0 ? '18px 0 0 18px' : i === WHY.length-1 ? '0 18px 18px 0' : 0,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Accent top border */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'var(--accent)',
                  opacity: 0.5,
                }}/>
                <div style={{
                  fontSize: 56, fontWeight: 700, lineHeight: 1,
                  color: 'rgba(255,255,255,0.05)',
                  marginBottom: 32, fontVariantNumeric: 'tabular-nums',
                }}>{String(i+1).padStart(2,'0')}</div>
                <h3 style={{
                  fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em',
                  color: '#fff', marginBottom: 14,
                }}>{w.title}</h3>
                <p style={{
                  fontSize: 16, lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.48)', letterSpacing: '-0.018em',
                }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
