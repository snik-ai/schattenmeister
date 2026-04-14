import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  image: string
  imagePosition?: string
}

export default function PageHero({ eyebrow, title, subtitle, image, imagePosition = 'center 30%' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from('.ph-img', { scale: 1.08, opacity: 0.3, duration: 1.6, ease: 'power2.out' }, 0)
        .from('.ph-eyebrow', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.3)
        .from('.ph-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.4)
        .from('.ph-sub', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.55)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <section style={{
        position: 'relative', width: '100%',
        height: '70svh', minHeight: 420, maxHeight: 680,
        background: '#000',
        display: 'flex', alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        <div className="ph-img" style={{
          position: 'absolute', inset: 0, opacity: 0.45,
        }}>
          <img src={image} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: imagePosition,
          }}/>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
        }}/>

        <div style={{
          position: 'relative', zIndex: 1, width: '100%',
          maxWidth: 1200, margin: '0 auto',
          padding: '0 clamp(24px,5vw,80px) clamp(48px,6vw,80px)',
        }}>
          <p className="ph-eyebrow" style={{
            fontSize: 12, fontWeight: 500, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16,
          }}>{eyebrow}</p>

          <h1 className="ph-title" style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 600, lineHeight: 1.06,
            letterSpacing: '-0.028em', color: '#fff',
            marginBottom: subtitle ? 18 : 0,
          }} dangerouslySetInnerHTML={{ __html: title }} />

          {subtitle && (
            <p className="ph-sub" style={{
              fontSize: 'clamp(17px, 2vw, 21px)',
              fontWeight: 300, lineHeight: 1.5,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 520,
            }}>{subtitle}</p>
          )}
        </div>
      </section>
    </div>
  )
}
