import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_INFO = [
  { l: 'Telefon', v: '+41 44 594 44 45', h: 'tel:+41445944445' },
  { l: 'E-Mail', v: 'info@schattenmeister.ch', h: 'mailto:info@schattenmeister.ch' },
  { l: 'Öffnungszeiten', v: 'Mo–Fr, 08:00–17:00' },
]

const LOCATIONS = [
  { name: 'Pfäffikon SZ', address: 'Churerstrasse 135, 8808 Pfäffikon SZ', label: 'Hauptsitz' },
  { name: 'Geroldswil', address: 'Steinhaldenstrasse 22, 8954 Geroldswil', label: 'Filiale' },
]

const FAQ = [
  { q: 'Wie schnell kann eine Beratung stattfinden?', a: 'In der Regel vereinbaren wir einen Beratungstermin innerhalb von 3–5 Werktagen. Bei dringenden Anliegen sind wir auch kurzfristig verfügbar.' },
  { q: 'Ist die Beratung wirklich kostenlos?', a: 'Ja. Die Erstberatung inkl. Aufmass vor Ort ist bei uns immer kostenlos und unverbindlich. Erst nach Ihrer Freigabe der Offerte entstehen Kosten.' },
  { q: 'In welchem Gebiet sind Sie tätig?', a: 'Wir sind in der gesamten Deutschschweiz tätig — von Zürich und der Zentralschweiz bis nach Bern und in den Aargau.' },
  { q: 'Reparieren Sie auch Fremdprodukte?', a: 'Ja. Wir sind herstellerunabhängig und reparieren Sonnenschutzanlagen jeder Marke und jeden Alters.' },
]

export default function KontaktPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({ name: '', email: '', phone: '', interest: 'Markise', message: '' })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.kt-fade').forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      })
      gsap.from('.kt-faq', {
        scrollTrigger: { trigger: '.kt-faqs', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const inp: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, color: '#fff',
    fontSize: 17, fontFamily: 'var(--f)',
    letterSpacing: '-0.022em', outline: 'none',
    transition: 'border-color 0.2s',
  }

  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    marginBottom: 8,
  }

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Kontakt"
        title="Lassen Sie uns<br/>sprechen."
        subtitle="Kostenlos. Unverbindlich. Persönlich."
        image="https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e8/c5/e8c5ef05-9f55-4cce-86e7-7a29c894f4a2/smr_web_was_rolladen_5.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg"
        imagePosition="center 60%"
      />

      {/* Contact section */}
      <section style={{
        background: '#f5f5f7',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.1fr',
          gap: 'clamp(40px,6vw,80px)', alignItems: 'start',
        }} className="contact-grid">
          {/* Left — Info */}
          <div className="kt-fade">
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Kontaktdaten</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f', marginBottom: 36,
            }}>So erreichen<br/>Sie uns.</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 48 }}>
              {CONTACT_INFO.map(i => (
                <div key={i.l}>
                  <div style={{
                    fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.3)',
                    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
                  }}>{i.l}</div>
                  {i.h ? (
                    <a href={i.h} style={{
                      fontSize: 18, color: '#1d1d1f', fontWeight: 500,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-dark)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#1d1d1f')}
                    >{i.v}</a>
                  ) : (
                    <div style={{ fontSize: 18, color: '#1d1d1f', fontWeight: 500 }}>{i.v}</div>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              borderTop: '1px solid #e0e0e0', paddingTop: 32,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20,
              }}>Standorte</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {LOCATIONS.map(loc => (
                  <div key={loc.name}>
                    <div style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 6,
                    }}>{loc.label}</div>
                    <div style={{
                      fontSize: 16, color: 'rgba(0,0,0,0.6)', lineHeight: 1.5,
                    }}>
                      <strong style={{ color: '#1d1d1f' }}>{loc.name}</strong> — {loc.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="kt-fade" style={{
            background: '#0a0a0b',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: 'clamp(32px,4vw,44px) clamp(28px,3.5vw,40px)',
            boxShadow: '0 16px 60px rgba(0,0,0,0.3)',
          }}>
            <h3 style={{
              fontSize: 22, fontWeight: 600, color: '#fff',
              letterSpacing: '-0.02em', marginBottom: 8,
            }}>Anfrage senden</h3>
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.35)',
              marginBottom: 28,
            }}>Antwort innerhalb 1 Werktag — garantiert.</p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--accent)', margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                    <path d="M4 11l5 5 9-10" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 21, fontWeight: 600, color: '#fff' }}>Vielen Dank!</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>Wir melden uns innerhalb von 1 Werktag bei Ihnen.</div>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={lbl}>Name *</label>
                    <input required style={inp} placeholder="Max Muster" value={f.name} onChange={upd('name')} />
                  </div>
                  <div>
                    <label style={lbl}>E-Mail *</label>
                    <input required type="email" style={inp} placeholder="max@example.ch" value={f.email} onChange={upd('email')} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Telefon</label>
                  <input style={inp} placeholder="+41 ..." value={f.phone} onChange={upd('phone')} />
                </div>
                <div>
                  <label style={lbl}>Interesse</label>
                  <select style={{ ...inp, color: '#fff' }} value={f.interest} onChange={upd('interest')}>
                    {['Markise', 'Rollladen', 'Plissee / Jalousie', 'Insektenschutz', 'Reparatur', 'Anderes'].map(o => (
                      <option key={o} style={{ background: '#1a1a1d' }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Nachricht</label>
                  <textarea rows={4} style={{ ...inp, resize: 'none' }} placeholder="Beschreiben Sie Ihr Projekt in wenigen Worten..." value={f.message} onChange={upd('message')} />
                </div>
                <button type="submit" style={{
                  background: 'var(--accent)', color: '#000',
                  fontSize: 16, fontWeight: 500,
                  padding: '14px', borderRadius: 10,
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--f)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
                >Anfrage senden</button>
                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>
                  Kostenlos & unverbindlich
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="kt-faqs" style={{
        background: '#fff',
        padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <div className="kt-fade" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
            }}>Häufige Fragen</p>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#1d1d1f',
            }}>Gut zu wissen.</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQ.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="kt-faq" style={{
                  borderBottom: '1px solid #e8e8ed',
                }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%', padding: '24px 0',
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      gap: 20, textAlign: 'left',
                      fontFamily: 'var(--f)',
                    }}
                  >
                    <span style={{
                      fontSize: 18, fontWeight: 500,
                      letterSpacing: '-0.015em', color: '#1d1d1f',
                    }}>{faq.q}</span>
                    <span style={{
                      fontSize: 22, color: 'rgba(0,0,0,0.3)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
                      flexShrink: 0, lineHeight: 1,
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.23,1,0.32,1)',
                  }}>
                    <p style={{
                      fontSize: 16, lineHeight: 1.65,
                      color: 'rgba(0,0,0,0.5)',
                      paddingBottom: 24,
                    }}>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
