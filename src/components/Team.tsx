import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MEMBERS = [
  {
    name: 'Astrit Krivaca',
    role: 'Partner',
    mail: 'astrit.krivaca@schattenmeister.ch',
    phone: '+41 44 594 44 45',
    linkedin: 'https://www.linkedin.com/company/schattenmeister',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/81/55/81558efd-5b00-40a1-b478-b124ca6f1aff/astrit-highres-new.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
  {
    name: 'Shaqir Krivaca',
    role: 'Geschäftsführer',
    mail: 'shaqir.krivaca@schattenmeister.ch',
    phone: '+41 44 594 44 45',
    linkedin: 'https://www.linkedin.com/company/schattenmeister',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/eb/39/eb3953b3-daf5-4c1a-aa8b-acb5a5281666/shaqir-highres.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
  {
    name: 'Gezim Alija',
    role: 'Partner',
    mail: 'gezim.alija@schattenmeister.ch',
    phone: '+41 44 594 44 45',
    linkedin: 'https://www.linkedin.com/company/schattenmeister',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/3d/34/3d34eb55-a780-40cb-969f-db3dcfe494ea/gezim-highres.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
  {
    name: 'Gazmend Sopaj',
    role: 'Partner',
    mail: 'gazmend.sopaj@schattenmeister.ch',
    phone: '+41 44 594 44 45',
    linkedin: 'https://www.linkedin.com/company/schattenmeister',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/ce/ae/ceae8891-1474-4f20-be5b-145569da6c50/gaz-highres.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
]

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 9.5c-.5-.5-1.7-1.1-2.3-1.1-.4 0-.9.4-1.3.8-.2.2-.4.2-.6.1C7.1 8.7 5.3 6.9 4.7 5.7c-.1-.2-.1-.4.1-.6.4-.4.8-.9.8-1.3 0-.6-.6-1.8-1.1-2.3C4 1 3.6.8 3.2.8 2 .8 1 2 1 3.2c0 1.8 1 4.5 3.8 7.2S10 13 11.8 13c1.2 0 2.2-1 2.2-2.2 0-.4-.2-.8-.5-1.3z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
      <path d="M1.5 5H3.5V12H1.5V5ZM2.5 1A1.25 1.25 0 1 1 2.5 3.5 1.25 1.25 0 0 1 2.5 1ZM5 5H7V6C7.4 5.4 8.2 5 9 5c2 0 3 1.3 3 3.2V12h-2V8.5C10 7.5 9.5 7 8.8 7S7.5 7.5 7.5 8.5V12H5V5Z"/>
    </svg>
  )
}

function TeamCard({ m, dimmed }: { m: typeof MEMBERS[0]; dimmed: boolean }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className="team-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        transform: hov ? 'translateY(-12px)' : dimmed ? 'scale(0.97)' : 'translateY(0)',
        opacity: dimmed ? 0.45 : 1,
        transition: 'transform 0.55s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease',
        cursor: 'pointer',
      }}
    >
      {/* Portrait */}
      <div className="team-portrait" style={{
        borderRadius: 16, overflow: 'hidden',
        aspectRatio: '3/4', background: '#111',
        marginBottom: 20, position: 'relative',
        boxShadow: hov
          ? '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(191,212,98,0.15)'
          : '0 20px 50px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.55s cubic-bezier(0.23,1,0.32,1)',
      }}>
        <img src={m.img} alt={m.name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: 'center top',
          transform: hov ? 'scale(1.08)' : 'scale(1)',
          filter: hov ? 'brightness(1.1)' : 'brightness(1)',
          transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1), filter 0.5s ease',
        }}/>

        {/* Accent gradient overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(191,212,98,0.2) 0%, transparent 50%)',
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}/>

        {/* Bottom name overlay on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '48px 20px 18px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>{m.role}</div>
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 17, fontWeight: 600, color: '#fff',
        letterSpacing: '-0.022em', marginBottom: 2,
        transition: 'color 0.3s',
      }}>{m.name}</div>
      <div style={{
        fontSize: 12, color: hov ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
        marginBottom: 14, fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '0.07em',
        transition: 'color 0.3s',
      }}>{m.role}</div>

      {/* Contact links — slide up on hover */}
      <div className="team-contact-links" style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        opacity: hov ? 1 : 0.6,
        transform: hov ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
      }}>
        <a href={`mailto:${m.mail}`} style={{
          display: 'flex', alignItems: 'center', gap: 7,
          fontSize: 12, color: 'rgba(255,255,255,0.44)',
          textDecoration: 'none', transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.44)')}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="12" height="9" rx="1.5"/>
            <path d="M1 4l6 4.5L13 4"/>
          </svg>
          {m.mail.split('@')[0]}@…
        </a>

        <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="team-link-secondary" style={{
          display: 'flex', alignItems: 'center', gap: 7,
          fontSize: 12, color: 'rgba(255,255,255,0.44)',
          textDecoration: 'none', transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.44)')}
        >
          <PhoneIcon/>
          {m.phone}
        </a>

        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="team-link-secondary" style={{
          display: 'flex', alignItems: 'center', gap: 7,
          fontSize: 12, color: 'rgba(255,255,255,0.44)',
          textDecoration: 'none', transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.44)')}
        >
          <LinkedInIcon/>
          LinkedIn Profil
        </a>
      </div>
    </div>
  )
}

export default function Team() {
  const ref = useRef<HTMLElement>(null)
  const [hovIdx, setHovIdx] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-banner', {
        scrollTrigger: { trigger: '.team-banner', start: 'top 85%' },
        scale: 1.04, opacity: 0, duration: 1.2, ease: 'power2.out',
      })
      gsap.from('.team-card', {
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="team" style={{ background: '#000' }}>
      {/* Full-bleed banner */}
      <div className="team-banner" style={{
        position: 'relative', height: '52vh', minHeight: 320, overflow: 'hidden',
      }}>
        <img
          src="https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/f1/1f/f11f2c0d-c03f-4207-8fd3-50e7359963c7/team-bild-desktop-high-res.jpg__2978x950_q85_subsampling-2.jpg"
          alt="Das Schattenmeister Team"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
        }}/>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          textAlign: 'center', padding: '0 24px 48px',
        }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12,
          }}>Unser Team</p>
          <h2 style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(28px,4.5vw,52px)',
            fontWeight: 600, lineHeight: 1.07,
            letterSpacing: '-0.025em', color: '#fff',
          }}>Die Menschen hinter<br/>jedem Projekt.</h2>
        </div>
      </div>

      {/* Portrait grid — 4 columns on desktop */}
      <div
        className="team-grid"
        style={{
          maxWidth: 1100, margin: '0 auto',
          padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,32px) clamp(60px,10vw,100px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}
        onMouseLeave={() => setHovIdx(null)}
      >
        {MEMBERS.map((m, i) => (
          <div key={m.name} onMouseEnter={() => setHovIdx(i)}>
            <TeamCard m={m} dimmed={hovIdx !== null && hovIdx !== i} />
          </div>
        ))}
      </div>
    </section>
  )
}
