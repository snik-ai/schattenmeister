import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LINKS = [
  { label: 'Markisen',  sub: 'Sonnenstoren & Terrassenbeschattung', href: '#markisen' },
  { label: 'Rollladen', sub: 'Sicherheit & Wärmedämmung',           href: '#rollladen' },
  { label: 'Plissees',  sub: 'Innenraum-Lichtschutz',               href: '#plissees' },
  { label: 'Reparaturen', sub: 'Service & Wartung',                   href: '#service' },
  { label: 'Unternehmen', sub: 'Team & Referenzen',                  href: '#team' },
  { label: 'Kontakt',   sub: 'Beratung anfragen',                    href: '#kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const threshold = document.documentElement.scrollHeight * 0.07
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > threshold) {
        if (y > prevScrollY.current + 5) setHidden(true)
        else if (y < prevScrollY.current - 5) setHidden(false)
      } else {
        setHidden(false)
      }
      prevScrollY.current = y
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      // Animate links in staggered
      gsap.fromTo('.nav-link-item', {
        y: 32, opacity: 0,
      }, {
        y: 0, opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.1,
      })
      gsap.fromTo('.nav-footer-info', {
        y: 16, opacity: 0,
      }, {
        y: 0, opacity: 1,
        duration: 0.5,
        delay: 0.5,
        ease: 'power2.out',
      })
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        height: 60,
        background: (scrolled && !open) ? '#000' : 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        transform: (hidden && !open) ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'background 0.5s ease, transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 32px',
      }}>
        <a href="#" onClick={() => setOpen(false)} style={{ zIndex: 10001, position: 'relative' }}>
          <img
            src="https://schattenmeister.ch/static/assets/images/schatten-logo-white.svg"
            alt="Schattenmeister"
            style={{ height: 40, width: 'auto' }}
          />
        </a>

        {/* Storen-burger — 3 thick slats */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menü"
          style={{
            zIndex: 10001, position: 'relative',
            background: 'none', border: 'none', cursor: 'pointer',
            width: 34, height: 26, padding: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: open
                ? (i === 0 ? '100%' : i === 1 ? '0%' : '100%')
                : '100%',
              height: 4,
              borderRadius: 2,
              background: '#fff',
              transformOrigin: 'center',
              transform: open
                ? (i === 0 ? 'translateY(11px) rotate(45deg)' :
                   i === 1 ? 'scaleX(0)' :
                   'translateY(-11px) rotate(-45deg)')
                : 'none',
              transition: [
                'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                'width 0.25s ease',
                'opacity 0.2s',
              ].join(', '),
              opacity: open && i === 1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </nav>

      {/* Fullscreen overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: '#050506',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(90px,10vh,120px) clamp(28px,5vw,64px) 60px',
        overflow: 'hidden',
      }}>
        {/* Accent glow */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191,212,98,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        <nav style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="nav-link-item"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  color: 'rgba(255,255,255,0.22)',
                  letterSpacing: '0.08em', minWidth: 26,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--f)',
                  fontSize: 'clamp(30px, 5.5vw, 58px)',
                  fontWeight: 600,
                  letterSpacing: '-0.028em', lineHeight: 1,
                  color: hovered !== null && hovered !== i
                    ? 'rgba(255,255,255,0.18)'
                    : hovered === i ? 'var(--accent)' : '#fff',
                  transition: 'color 0.25s',
                }}>
                  {l.label}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="nav-sub" style={{
                  fontSize: 14, fontWeight: 300,
                  color: 'var(--accent)',
                  letterSpacing: '-0.01em',
                }}>{l.sub}</span>
                <span style={{
                  fontSize: 22, color: 'var(--accent)',
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.22s, transform 0.22s',
                }}>→</span>
              </div>
            </a>
          ))}
        </nav>

        {/* Footer row */}
        <div className="nav-footer-info" style={{
          maxWidth: 900, width: '100%', margin: '44px auto 0',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, alignItems: 'center',
        }}>
          {[
            { l: 'Telefon',    v: '+41 44 594 44 45',          h: 'tel:+41445944445' },
            { l: 'E-Mail',     v: 'info@schattenmeister.ch',   h: 'mailto:info@schattenmeister.ch' },
            { l: 'Öffnungszeiten', v: 'Mo–Fr, 08:00–17:00',   h: undefined },
          ].map(i => (
            <div key={i.l}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>{i.l}</div>
              {i.h
                ? <a href={i.h} style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>{i.v}</a>
                : <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>{i.v}</div>
              }
            </div>
          ))}
          <a href="#kontakt" onClick={() => setOpen(false)} style={{
            background: 'var(--accent)', color: '#000',
            fontSize: 15, fontWeight: 500,
            padding: '11px 24px', borderRadius: 980,
          }}>Beratung anfragen</a>
        </div>
      </div>
    </>
  )
}
