import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { PROJECTS } from './Portfolio'

type Project = typeof PROJECTS extends readonly (infer T)[] ? T : never

interface Props {
  project: Project
  onClose: () => void
  onNext: () => void
  nextProject: Project
}

export default function ProjectDetail({ project, onClose, onNext, nextProject }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [closing, setClosing] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  // Lock body scroll & animate in
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
      )
    })
    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [])

  // Animate detail sections on mount
  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.pd-meta', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
      gsap.from('.pd-vision', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.55 })
      gsap.from('.pd-gallery-img', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.65, stagger: 0.1 })
      gsap.from('.pd-quote', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })
    }, contentRef)
    return () => ctx.revert()
  }, [project.id])

  const handleClose = () => {
    setClosing(true)
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: onClose,
    })
  }

  const handleNext = () => {
    if (transitioning) return
    setTransitioning(true)
    gsap.to(contentRef.current, {
      y: -40, opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        if (contentRef.current) contentRef.current.scrollTop = 0
        onNext()
        setTransitioning(false)
        gsap.fromTo(contentRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      },
    })
  }

  // ESC to close
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const META = [
    { label: 'Klient', value: project.client },
    { label: 'Jahr', value: project.year },
    { label: 'Ort', value: project.location },
    { label: 'Service', value: project.service },
  ]

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#fff',
        opacity: 0,
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: 'fixed', top: 28, right: 28, zIndex: 10001,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.25s, transform 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.08)'; (e.currentTarget.querySelector('svg') as SVGElement).style.stroke = '#000' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.transform = 'scale(1)'; (e.currentTarget.querySelector('svg') as SVGElement).style.stroke = '#fff' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'stroke 0.25s' }}>
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Scrollable content */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute', inset: 0,
          overflowY: 'auto', overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Hero */}
        <div style={{
          position: 'relative', width: '100%',
          height: '100svh', minHeight: 500,
          overflow: 'hidden',
        }}>
          <img
            src={project.heroImg}
            alt={project.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          />
          {/* Dark overlay bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.25) 100%)',
          }}/>

          {/* Hero text */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)',
          }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: 16, opacity: 0.9,
            }}>{project.category} — {project.location}</p>

            <h1 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(40px,7vw,88px)',
              fontWeight: 600, lineHeight: 1.04,
              letterSpacing: '-0.03em', color: '#fff',
              marginBottom: 16,
            }}>{project.title}</h1>

            <p style={{
              fontSize: 'clamp(16px,2vw,20px)',
              fontWeight: 300, lineHeight: 1.5,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 500,
            }}>{project.description.slice(0, 80)}...</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="pd-meta pd-meta-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: 1200, margin: '0 auto',
          padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,80px)',
          gap: 20,
        }}>
          {META.map(m => (
            <div key={m.label}>
              <p style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--accent-dark)',
                marginBottom: 8,
              }}>{m.label}</p>
              <p style={{
                fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 500,
                color: '#1d1d1f', letterSpacing: '-0.01em',
              }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
          <div style={{ height: 1, background: '#e8e8ed' }}/>
        </div>

        {/* Vision section */}
        <div className="pd-vision pd-vision-grid" style={{
          maxWidth: 1200, margin: '0 auto',
          padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)',
          display: 'grid', gridTemplateColumns: '1fr 1.3fr',
          gap: 'clamp(32px,5vw,80px)', alignItems: 'start',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,3.5vw,44px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f',
              marginBottom: 28,
            }}>Das Projekt.</h2>

            <p style={{
              fontSize: 17, fontWeight: 300, lineHeight: 1.65,
              color: 'rgba(0,0,0,0.55)', marginBottom: 24,
            }}>{project.description}</p>

            <p style={{
              fontSize: 17, fontWeight: 300, lineHeight: 1.65,
              color: 'rgba(0,0,0,0.55)', marginBottom: 36,
            }}>{project.descriptionExtra}</p>

            <a href="#kontakt" onClick={(e) => { e.preventDefault(); handleClose() }} style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#1d1d1f', color: '#fff',
              fontSize: 14, fontWeight: 500,
              padding: '13px 28px', borderRadius: 980,
              letterSpacing: '0.02em',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >Ähnliches Projekt anfragen</a>
          </div>

          <div style={{
            borderRadius: 16, overflow: 'hidden',
            aspectRatio: '4/3',
            boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
          }}>
            <img
              src={project.images[0]}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Gallery images — always full width, 2 columns */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 clamp(24px,5vw,80px) clamp(48px,5vw,64px)',
          display: 'grid',
          gridTemplateColumns: project.images.length === 1 ? '1fr' : '1fr 1fr',
          gap: 16,
        }}>
          {project.images.map((img, i) => (
            <div key={i} className="pd-gallery-img" style={{
              borderRadius: 14, overflow: 'hidden',
              aspectRatio: '16/10',
            }}>
              <img src={img} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,80px) 0' }}>
          <div style={{ height: 1, background: '#e8e8ed' }}/>
        </div>

        {/* Quote */}
        <div className="pd-quote" style={{
          maxWidth: 800, margin: '0 auto',
          padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)',
          textAlign: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-dark)" strokeWidth="1.5" style={{ marginBottom: 24, opacity: 0.6 }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>

          <blockquote style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(22px,3vw,32px)',
            fontWeight: 400, lineHeight: 1.45,
            letterSpacing: '-0.015em', color: '#1d1d1f',
            fontStyle: 'italic',
            marginBottom: 24,
          }}>"{project.quote}"</blockquote>

          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
          }}>{project.quoteAuthor}</p>
        </div>

        {/* Divider */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
          <div style={{ height: 1, background: '#e8e8ed' }}/>
        </div>

        {/* Next Project */}
        <div
          onClick={handleNext}
          style={{
            position: 'relative',
            width: '100%', height: '60vh', minHeight: 400,
            overflow: 'hidden', cursor: 'pointer',
          }}
          onMouseEnter={e => {
            const img = e.currentTarget.querySelector('img') as HTMLImageElement
            if (img) img.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={e => {
            const img = e.currentTarget.querySelector('img') as HTMLImageElement
            if (img) img.style.transform = 'scale(1)'
          }}
        >
          <img
            src={nextProject.heroImg}
            alt={nextProject.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.5)',
          }}/>

          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: 16,
            }}>Nächstes Projekt</p>

            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(32px,5vw,56px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#fff',
              marginBottom: 20,
            }}>{nextProject.title}</h2>

            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
