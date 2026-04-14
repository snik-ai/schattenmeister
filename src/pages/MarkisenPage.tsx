import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

const TYPES = [
  {
    name: 'Kassettenmarkise',
    desc: 'Der Klassiker für Terrassen und Balkone. Das Tuch wird im geschlossenen Zustand vollständig in der Kassette geschützt — langlebig und wartungsarm.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/cc/d0/ccd083de-1241-4bcf-b49d-e35d8008fd1f/smr_web_was_markisen_2.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
  },
  {
    name: 'Pergola-Markise',
    desc: 'Maximale Fläche, maximaler Schutz. Freitragend über grosse Terrassen — motorisiert, windstabil und mit optionalem Regenschutz.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a1/ab/a1ab6d94-9158-4b05-a511-c5aa424ff277/smr_web_was_markisen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
  },
  {
    name: 'Senkrechtmarkise',
    desc: 'Seitlicher Sonnenschutz und Windschutz in einem. Ideal als Ergänzung zu bestehenden Markisen oder für verglaste Loggien.',
    img: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/bc/0b/bc0bc12e-767d-48ca-ba90-7813d3de1012/smr_web_was_markisen_4.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
  },
]

const FEATURES = [
  { icon: '01', title: 'Massanfertigung', text: 'Jede Markise wird exakt auf Ihre Masse, Fassade und Wünsche gefertigt.' },
  { icon: '02', title: 'Motorisierung', text: 'Komfortable Bedienung per Schalter, Fernbedienung oder Smart Home.' },
  { icon: '03', title: 'Windautomatik', text: 'Sensoren schützen Ihre Markise automatisch vor Sturmschäden.' },
  { icon: '04', title: '5 Jahre Garantie', text: 'Auf Material, Mechanik und Montage — verlängerbar auf Wunsch.' },
]

const PROCESS = [
  { step: '01', title: 'Beratung vor Ort', text: 'Kostenlose Besichtigung, Aufmass und persönliche Beratung bei Ihnen zu Hause.' },
  { step: '02', title: 'Offerte & Planung', text: 'Detaillierte Offerte mit 3D-Visualisierung innerhalb von 5 Werktagen.' },
  { step: '03', title: 'Fertigung', text: 'Massanfertigung bei unseren Schweizer Partnern — keine Standardware.' },
  { step: '04', title: 'Montage & Abnahme', text: 'Eigenes Montageteam, saubere Ausführung und gemeinsame Endabnahme.' },
]

export default function MarkisenPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.mk-fade').forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      })
      gsap.from('.mk-type-card', {
        scrollTrigger: { trigger: '.mk-types', start: 'top 78%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
      gsap.from('.mk-feat', {
        scrollTrigger: { trigger: '.mk-feats', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      })
      gsap.from('.mk-step', {
        scrollTrigger: { trigger: '.mk-process', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Sonnenstoren & Markisen"
        title="Draussen sein.<br/>Ohne Kompromisse."
        subtitle="Von der eleganten Kassettenmarkise bis zur motorisierten Pergola — massgeschneidert für Ihre Architektur."
        image="https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a1/ab/a1ab6d94-9158-4b05-a511-c5aa424ff277/smr_web_was_markisen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg"
      />

      {/* Intro */}
      <section style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)' }}>
        <div className="mk-fade" style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
        }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 18,
          }}>Unsere Expertise</p>
          <h2 style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(28px,4vw,48px)',
            fontWeight: 600, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: '#1d1d1f', marginBottom: 20,
          }}>Sonnenschutz, der zu Ihrem<br/>Zuhause passt.</h2>
          <p style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(0,0,0,0.5)', maxWidth: 580, margin: '0 auto',
          }}>
            Seit über 20 Jahren montieren wir Markisen in der ganzen Deutschschweiz.
            Jede Anlage wird individuell geplant, gefertigt und von unserem eigenen Team installiert.
          </p>
        </div>
      </section>

      {/* Types */}
      <section className="mk-types" style={{
        background: '#f5f5f7',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="mk-fade" style={{ marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Markisentypen</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f',
            }}>Für jede Situation<br/>die richtige Lösung.</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }} className="mk-types-grid">
            {TYPES.map(t => (
              <div key={t.name} className="mk-type-card" style={{
                borderRadius: 16, overflow: 'hidden', background: '#fff',
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)' }}
              >
                <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={t.img} alt={t.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <h3 style={{
                    fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em',
                    color: '#1d1d1f', marginBottom: 10,
                  }}>{t.name}</h3>
                  <p style={{
                    fontSize: 15, lineHeight: 1.6,
                    color: 'rgba(0,0,0,0.48)',
                  }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mk-feats" style={{
        background: '#000',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="mk-fade" style={{ marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14,
            }}>Ausstattung</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#fff',
            }}>Was uns auszeichnet.</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }} className="mk-feats-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="mk-feat" style={{
                padding: 'clamp(28px,4vw,44px)',
                background: ['#141415','#1a1a1b','#111112','#161617'][i],
                borderRadius: i === 0 ? '16px 0 0 16px' : i === 3 ? '0 16px 16px 0' : 0,
              }}>
                <div style={{
                  fontSize: 44, fontWeight: 700, lineHeight: 1,
                  color: 'rgba(255,255,255,0.05)', marginBottom: 24,
                }}>{f.icon}</div>
                <h3 style={{
                  fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em',
                  color: '#fff', marginBottom: 10,
                }}>{f.title}</h3>
                <p style={{
                  fontSize: 15, lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.44)',
                }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mk-process" style={{
        background: '#fff',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="mk-fade" style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Ablauf</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f',
            }}>Von der Beratung<br/>bis zur Montage.</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} className="mk-step" style={{
                display: 'grid', gridTemplateColumns: '56px 1fr',
                gap: 24, padding: '32px 0',
                borderBottom: i < PROCESS.length - 1 ? '1px solid #e8e8ed' : 'none',
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--accent-dark)',
                  letterSpacing: '0.06em', paddingTop: 2,
                }}>{p.step}</div>
                <div>
                  <h3 style={{
                    fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em',
                    color: '#1d1d1f', marginBottom: 8,
                  }}>{p.title}</h3>
                  <p style={{
                    fontSize: 16, lineHeight: 1.6,
                    color: 'rgba(0,0,0,0.48)',
                  }}>{p.text}</p>
                </div>
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
        <div className="mk-fade" style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18,
          }}>Jetzt beraten lassen</p>
          <h2 style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(28px,4.5vw,52px)',
            fontWeight: 600, lineHeight: 1.08,
            letterSpacing: '-0.025em', color: '#fff', marginBottom: 20,
          }}>Bereit für Ihre<br/>neue Markise?</h2>
          <p style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.5,
            color: 'rgba(255,255,255,0.45)', marginBottom: 36,
          }}>Kostenlose Beratung vor Ort — unverbindlich und persönlich.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/kontakt" style={{
              background: 'var(--accent)', color: '#000',
              fontSize: 16, fontWeight: 500,
              padding: '14px 36px', borderRadius: 980,
            }}>Beratung anfragen</Link>
            <a href="tel:+41445944445" style={{
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16, fontWeight: 400,
              padding: '14px 32px', borderRadius: 980,
            }}>+41 44 594 44 45</a>
          </div>
        </div>
      </section>
    </div>
  )
}
