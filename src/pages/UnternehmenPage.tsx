import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

const MEMBERS = [
  {
    name: 'Astrit Krivaca', role: 'Partner',
    mail: 'astrit.krivaca@schattenmeister.ch',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/81/55/81558efd-5b00-40a1-b478-b124ca6f1aff/astrit-highres-new.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
  {
    name: 'Shaqir Krivaca', role: 'Geschäftsführer',
    mail: 'shaqir.krivaca@schattenmeister.ch',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/eb/39/eb3953b3-daf5-4c1a-aa8b-acb5a5281666/shaqir-highres.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
  {
    name: 'Gezim Alija', role: 'Partner',
    mail: 'gezim.alija@schattenmeister.ch',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/3d/34/3d34eb55-a780-40cb-969f-db3dcfe494ea/gezim-highres.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
  {
    name: 'Gazmend Sopaj', role: 'Partner',
    mail: 'gazmend.sopaj@schattenmeister.ch',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/ce/ae/ceae8891-1474-4f20-be5b-145569da6c50/gaz-highres.jpg__528x528_q85_crop_subsampling-2.jpg',
  },
]

const STATS = [
  { n: '2003', l: 'Gegründet' },
  { n: '200+', l: 'Realisierte Projekte' },
  { n: '2', l: 'Standorte in der Schweiz' },
  { n: '4', l: 'Erfahrene Partner' },
]

const VALUES = [
  {
    title: 'Eigene Montage',
    text: 'Kein Subunternehmer berührt Ihr Projekt. Unser eigenes Team plant, montiert und kontrolliert jede Installation.',
  },
  {
    title: 'Herstellerunabhängig',
    text: 'Wir beraten produktneutral und wählen die beste Lösung — nicht die profitabelste. Das gilt auch für Reparaturen.',
  },
  {
    title: 'Schweizer Qualität',
    text: 'Materialeinkauf und Fertigung bei bewährten Schweizer Partnern. Kurze Wege, schnelle Lieferung, faire Preise.',
  },
]

const LOCATIONS = [
  {
    name: 'Pfäffikon SZ',
    address: 'Churerstrasse 135\n8808 Pfäffikon SZ',
    label: 'Hauptsitz',
  },
  {
    name: 'Geroldswil',
    address: 'Steinhaldenstrasse 22\n8954 Geroldswil',
    label: 'Filiale',
  },
]

export default function UnternehmenPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovTeam, setHovTeam] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.un-fade').forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      })
      gsap.from('.un-stat', {
        scrollTrigger: { trigger: '.un-stats', start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
      gsap.from('.un-team-card', {
        scrollTrigger: { trigger: '.un-team-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      })
      gsap.from('.un-val', {
        scrollTrigger: { trigger: '.un-vals', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Schattenmeister AG"
        title="Seit 2003. Für<br/>Ihren Sonnenschutz."
        subtitle="Ein Team aus erfahrenen Fachleuten mit einer gemeinsamen Leidenschaft: den perfekten Sonnenschutz."
        image="https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/f1/1f/f11f2c0d-c03f-4207-8fd3-50e7359963c7/team-bild-desktop-high-res.jpg__2978x950_q85_subsampling-2.jpg"
        imagePosition="center 20%"
      />

      {/* Story */}
      <section style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(40px,6vw,80px)', alignItems: 'center',
        }} className="un-story-grid">
          <div className="un-fade">
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Unsere Geschichte</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f', marginBottom: 24,
            }}>Vier Partner.<br/>Eine Vision.</h2>
            <p style={{
              fontSize: 17, fontWeight: 300, lineHeight: 1.65,
              color: 'rgba(0,0,0,0.5)', marginBottom: 20,
            }}>
              Was 2003 als kleiner Montagebetrieb begann, ist heute eines der führenden
              Sonnenschutz-Unternehmen der Deutschschweiz. Vier Partner bringen ihre
              individuellen Stärken ein — von der technischen Beratung über die Planung
              bis zur Montage.
            </p>
            <p style={{
              fontSize: 17, fontWeight: 300, lineHeight: 1.65,
              color: 'rgba(0,0,0,0.5)',
            }}>
              Unser Prinzip ist einfach: Wir machen alles selbst. Keine Subunternehmer,
              keine Kompromisse. Jede Anlage wird von unserem eigenen Team geplant,
              montiert und gewartet.
            </p>
          </div>
          <div className="un-fade" style={{
            borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3',
            boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
          }}>
            <img
              src="https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e8/2f/e82f726d-c392-4df2-8a50-2f352818027b/smr_web_was_reparaturen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg"
              alt="Schattenmeister Team bei der Arbeit"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="un-stats" style={{
        background: '#fff',
        borderTop: '1px solid #e8e8ed',
        borderBottom: '1px solid #e8e8ed',
      }}>
        <div style={{
          maxWidth: 980, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }} className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.l} className="un-stat" style={{
              textAlign: 'center', padding: '56px 20px',
              borderRight: i < 3 ? '1px solid #e8e8ed' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--f)',
                fontSize: 'clamp(36px,4.5vw,60px)',
                fontWeight: 600, lineHeight: 1,
                letterSpacing: '-0.03em', color: '#1d1d1f',
              }}>{s.n}</div>
              <div style={{
                fontSize: 13, marginTop: 10,
                color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.01em',
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: '#000', padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="un-fade" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14,
            }}>Unser Team</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4.5vw,52px)',
              fontWeight: 600, lineHeight: 1.07,
              letterSpacing: '-0.025em', color: '#fff',
            }}>Die Menschen hinter<br/>jedem Projekt.</h2>
          </div>

          <div className="un-team-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }} onMouseLeave={() => setHovTeam(null)}>
            {MEMBERS.map((m, i) => {
              const isHov = hovTeam === i
              const dimmed = hovTeam !== null && !isHov
              return (
                <div
                  key={m.name}
                  className="un-team-card"
                  onMouseEnter={() => setHovTeam(i)}
                  style={{
                    transform: isHov ? 'translateY(-10px)' : 'translateY(0)',
                    opacity: dimmed ? 0.45 : 1,
                    transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s',
                  }}
                >
                  <div style={{
                    borderRadius: 16, overflow: 'hidden',
                    aspectRatio: '3/4', background: '#111', marginBottom: 18,
                    boxShadow: isHov ? '0 28px 56px rgba(0,0,0,0.5)' : '0 16px 40px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.5s',
                    position: 'relative',
                  }}>
                    <img src={m.img} alt={m.name} style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      objectPosition: 'center top',
                      transform: isHov ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
                    }}/>
                    {isHov && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(191,212,98,0.18) 0%, transparent 50%)',
                        pointerEvents: 'none',
                      }}/>
                    )}
                  </div>
                  <div style={{
                    fontSize: 17, fontWeight: 600, color: '#fff',
                    letterSpacing: '-0.015em', marginBottom: 2,
                  }}>{m.name}</div>
                  <div style={{
                    fontSize: 12, fontWeight: 500, textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: isHov ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
                    transition: 'color 0.3s', marginBottom: 10,
                  }}>{m.role}</div>
                  <a href={`mailto:${m.mail}`} style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.4)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >{m.mail.split('@')[0]}@...</a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="un-vals" style={{
        background: '#fff',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="un-fade" style={{ marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Unsere Werte</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f',
            }}>Wofür wir stehen.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="un-vals-grid">
            {VALUES.map((v, i) => (
              <div key={v.title} className="un-val" style={{
                padding: '36px 32px',
                border: '1px solid #e8e8ed',
                borderRadius: 16,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(191,212,98,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8ed'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{
                  fontSize: 44, fontWeight: 700, lineHeight: 1,
                  color: 'rgba(0,0,0,0.05)', marginBottom: 20,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{
                  fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em',
                  color: '#1d1d1f', marginBottom: 12,
                }}>{v.title}</h3>
                <p style={{
                  fontSize: 16, lineHeight: 1.6,
                  color: 'rgba(0,0,0,0.48)',
                }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section style={{
        background: '#f5f5f7',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="un-fade" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Standorte</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f',
            }}>In Ihrer Nähe.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="un-loc-grid">
            {LOCATIONS.map(loc => (
              <div key={loc.name} className="un-fade" style={{
                background: '#fff', borderRadius: 16,
                padding: '40px 36px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                border: '1px solid #e8e8ed',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 12,
                }}>{loc.label}</div>
                <h3 style={{
                  fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em',
                  color: '#1d1d1f', marginBottom: 16,
                }}>{loc.name}</h3>
                <p style={{
                  fontSize: 16, lineHeight: 1.6,
                  color: 'rgba(0,0,0,0.5)', whiteSpace: 'pre-line',
                }}>{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#000',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
        textAlign: 'center',
      }}>
        <div className="un-fade" style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18,
          }}>Lernen Sie uns kennen</p>
          <h2 style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(28px,4.5vw,52px)',
            fontWeight: 600, lineHeight: 1.08,
            letterSpacing: '-0.025em', color: '#fff', marginBottom: 20,
          }}>Bereit für ein<br/>persönliches Gespräch?</h2>
          <p style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.5,
            color: 'rgba(255,255,255,0.45)', marginBottom: 36,
          }}>Kostenlos, unverbindlich und bei Ihnen vor Ort.</p>
          <Link to="/kontakt" style={{
            display: 'inline-block',
            background: 'var(--accent)', color: '#000',
            fontSize: 16, fontWeight: 500,
            padding: '14px 36px', borderRadius: 980,
          }}>Kontakt aufnehmen</Link>
        </div>
      </section>
    </div>
  )
}
