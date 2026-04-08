import { useState, useEffect, useRef } from 'react'

const ACTIONS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/41763995912?text=Hallo%20Schattenmeister%2C%20ich%20hätte%20eine%20Anfrage.',
    color: '#25D366',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Anrufen',
    href: 'tel:+41445944445',
    color: 'var(--accent)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.9z"/>
      </svg>
    ),
  },
  {
    label: 'Anfrage',
    href: '#kontakt',
    color: '#fff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 6l10 7.5L22 6"/>
      </svg>
    ),
  },
]

export default function FloatingCTA() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      if (y > 300) {
        if (y > prevScrollY.current + 5) setVisible(true)
        else if (y < prevScrollY.current - 5) { setVisible(false); setOpen(false) }
      } else {
        setVisible(false)
        setOpen(false)
      }
      prevScrollY.current = y
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9990,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    }}>
      {/* Action buttons */}
      {ACTIONS.map((a, i) => (
        <a
          key={a.label}
          href={a.href}
          target={a.href.startsWith('http') ? '_blank' : undefined}
          rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={() => { if (a.href.startsWith('#')) setOpen(false) }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#1a1a1d',
            border: `1px solid ${a.color === '#fff' ? 'rgba(255,255,255,0.15)' : a.color}44`,
            borderRadius: 980,
            padding: '10px 18px 10px 14px',
            color: a.color,
            fontSize: 14, fontWeight: 600,
            letterSpacing: '-0.01em',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
            pointerEvents: open ? 'all' : 'none',
            transition: `opacity 0.3s ease ${open ? i * 0.06 : (ACTIONS.length - i) * 0.03}s, transform 0.35s cubic-bezier(0.23,1,0.32,1) ${open ? i * 0.06 : (ACTIONS.length - i) * 0.03}s`,
            textDecoration: 'none',
          }}
        >
          {a.icon}
          {a.label}
        </a>
      ))}

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'var(--accent)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open
            ? '0 8px 32px rgba(191,212,98,0.35)'
            : '0 8px 28px rgba(191,212,98,0.25)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s',
          transform: open ? 'scale(0.9)' : 'scale(1)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = open ? 'scale(0.95)' : 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = open ? 'scale(0.9)' : 'scale(1)')}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#000" stroke="none">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
        </svg>
      </button>
    </div>
  )
}
