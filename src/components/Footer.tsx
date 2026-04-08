const COL = {
  Leistungen: ['Markisen & Sonnenstoren', 'Rollladen & Lamellenstoren', 'Plissees & Jalousien', 'Insektenschutz', 'Reparaturen & Service'],
  Einsatzgebiete: ['Wohneigentum', 'Gewerbe', 'Gastronomie', 'Öffentliche Einrichtungen', 'Mietwohnungen'],
  Unternehmen: ['Über uns', 'Team', 'Referenzen', 'Karriere', 'Kontakt'],
}

const CONTACTS = [
  { label: 'Pfäffikon SZ', value: 'Churerstrasse 135\n8808 Pfäffikon SZ' },
  { label: 'Geroldswil', value: 'Steinhaldenstrasse 22\n8954 Geroldswil' },
  { label: 'Telefon', value: '+41 44 594 44 45', href: 'tel:+41445944445' },
  { label: 'E-Mail', value: 'info@schattenmeister.ch', href: 'mailto:info@schattenmeister.ch' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#000' }}>
      {/* CTA band */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(60px,8vw,100px) 32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
          }}>Kostenlos & unverbindlich</p>
          <h2 style={{
            fontFamily: 'var(--f)',
            fontSize: 'clamp(32px,5vw,60px)',
            fontWeight: 600, lineHeight: 1.06,
            letterSpacing: '-0.028em', color: '#fff',
            marginBottom: 24,
          }}>Bereit für Ihren<br/>perfekten Sonnenschutz?</h2>
          <p style={{
            fontSize: 19, fontWeight: 300, lineHeight: 1.5,
            color: 'rgba(255,255,255,0.44)',
            marginBottom: 40, maxWidth: 480, margin: '0 auto 40px',
          }}>Persönliche Beratung, massgeschneiderte Lösung — Antwort innerhalb 1 Werktag.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#kontakt" style={{
              background: 'var(--accent)', color: '#000',
              fontSize: 16, fontWeight: 500,
              padding: '14px 36px', borderRadius: 980,
              textDecoration: 'none',
            }}>Beratung anfragen</a>
            <a href="tel:+41445944445" style={{
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16, fontWeight: 400,
              padding: '14px 32px', borderRadius: 980,
              textDecoration: 'none',
            }}>+41 44 594 44 45</a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,32px) 0' }}>
        <div className="footer-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr repeat(3, 1fr)',
          gap: 48,
          paddingBottom: 64,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Brand column */}
          <div>
            <img
              src="https://schattenmeister.ch/static/assets/images/schatten-logo-white.svg"
              alt="Schattenmeister"
              className="footer-brand-logo"
              style={{ height: 40, marginBottom: 24 }}
            />
            <p className="footer-brand-desc" style={{
              fontSize: 16, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.36)',
              maxWidth: 280, marginBottom: 32,
            }}>Ihr Spezialist für Sonnenschutz<br/>in der Schweiz. Seit 2003.</p>

            {/* Contact info */}
            <div className="footer-contact-block" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {CONTACTS.map(c => (
                <div key={c.label}>
                  <div style={{
                    fontSize: 12, fontWeight: 600,
                    color: 'rgba(255,255,255,0.22)',
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                    marginBottom: 3,
                  }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{
                      fontSize: 15, color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >{c.value}</a>
                  ) : (
                    <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', whiteSpace: 'pre-line' }}>{c.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="footer-social" style={{ display: 'flex', gap: 10 }}>
              {[
                {
                  href: 'https://www.instagram.com/schattenmeisterag',
                  label: 'Instagram',
                  d: 'M7 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.5-.25a.75.75 0 110 1.5.75.75 0 010-1.5zM2 0a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V2a2 2 0 00-2-2H2z',
                },
                {
                  href: 'https://www.linkedin.com/company/schattenmeister',
                  label: 'LinkedIn',
                  d: 'M2 2h3v9H2V2zm1.5-2A1.5 1.5 0 110 1.5 1.5 1.5 0 013.5 0zM7 6.5c.7 0 1.5.5 1.5 1.5v3H11V8a3 3 0 00-6 0v3h2.5V8C7.5 7 7 6.5 7 6.5z',
                },
              ].map(({ href, label, d }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.36)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.36)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d={d}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COL).map(([title, links]) => (
            <div key={title} className="footer-link-col">
              <div style={{
                fontSize: 13, fontWeight: 600,
                color: 'rgba(255,255,255,0.28)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: 20,
              }}>{title}</div>
              {links.map(l => (
                <a key={l} href="#" style={{
                  display: 'block', fontSize: 16,
                  color: 'rgba(255,255,255,0.44)',
                  marginBottom: 14, letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.44)')}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '28px 0 40px', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Schattenmeister AG. Alle Rechte vorbehalten.
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {['Impressum', 'Datenschutz'].map(l => (
              <a key={l} href="#" style={{
                fontSize: 12, color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >{l}</a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontSize: 12, color: 'rgba(255,255,255,0.2)',
                background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6, cursor: 'pointer',
                fontFamily: 'var(--f)', padding: '5px 12px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >↑ Nach oben</button>
          </div>
        </div>
      </div>

    </footer>
  )
}
