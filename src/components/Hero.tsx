import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-h1', { y: 48, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-ctas', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('.hero-img', { scale: 1.08, opacity: 0.3, duration: 1.8, ease: 'power2.out' }, 0)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <section style={{
        position: 'relative', width: '100%',
        height: '100svh', minHeight: 'min(640px, 100svh)',
        background: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Full-bleed image */}
        <div
          className="hero-img"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a1/ab/a1ab6d94-9158-4b05-a511-c5aa424ff277/smr_web_was_markisen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
          }}
        />
        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
        }}/>
        {/* Accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: '28vh',
          background: 'linear-gradient(to top, var(--accent) 0%, transparent 100%)',
          opacity: 0.6,
        }}/>

        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center', padding: '0 24px 100px',
          maxWidth: 740, margin: '0 auto', width: '100%',
        }}>
          <p className="hero-eyebrow" style={{
            fontSize: 12, fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 18,
          }}>Schattenmeister AG — Seit 2003</p>

          <h1 className="hero-h1" style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(42px, 7vw, 84px)',
            fontWeight: 600, lineHeight: 1.04,
            letterSpacing: '-0.028em', color: '#fff',
            marginBottom: 20,
          }}>
            Und die Sonne<br/>kann kommen.
          </h1>

          <p className="hero-sub" style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            fontWeight: 300, lineHeight: 1.48,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 36, maxWidth: 520, margin: '0 auto 36px',
          }}>
            Massgeschneiderter Sonnenschutz für Ihr Zuhause
            und Ihren Betrieb.
          </p>

          <div className="hero-ctas" style={{
            display: 'flex', gap: 14,
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <a href="#kontakt" style={{
              background: 'var(--accent)', color: '#000',
              fontSize: 17, fontWeight: 500,
              padding: '12px 28px', borderRadius: 980,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(191,212,98,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >Kostenlose Beratung</a>
            <a href="#markisen" style={{
              background: 'transparent', color: '#fff',
              fontSize: 17, fontWeight: 400,
              padding: '11px 28px', borderRadius: 980,
              border: '1px solid rgba(255,255,255,0.28)',
            }}>Produkte entdecken ↓</a>
          </div>
        </div>
      </section>
    </div>
  )
}
