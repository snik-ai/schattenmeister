import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({ name:'', email:'', phone:'', interest:'Markise', message:'' })
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setF({...f,[k]:e.target.value})

  const inp: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, color: '#fff',
    fontSize: 17, fontFamily: 'var(--f)',
    letterSpacing: '-0.022em',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    marginBottom: 8,
  }

  return (
    <section id="kontakt" style={{ background: '#f5f5f7', padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,24px)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'start',
        }}
        className="contact-grid"
        >
          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: 'var(--f)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 600, lineHeight: 1.07,
              letterSpacing: '-0.022em', color: '#1d1d1f',
              marginBottom: 14,
            }}>Lassen Sie uns<br/>sprechen.</h2>
            <p style={{
              fontSize: 21, fontWeight: 300, lineHeight: 1.42,
              color: 'rgba(0,0,0,0.45)',
              marginBottom: 56,
            }}>Kostenlos. Unverbindlich. Persönlich.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                {l:'Telefon', v:'+41 44 594 44 45', h:'tel:+41445944445'},
                {l:'E-Mail', v:'info@schattenmeister.ch', h:'mailto:info@schattenmeister.ch'},
                {l:'Öffnungszeiten', v:'Mo–Fr, 08:00–17:00', h:undefined},
                {l:'Pfäffikon SZ', v:'Churerstrasse 135, 8808 Pfäffikon SZ', h:undefined},
                {l:'Geroldswil', v:'Steinhaldenstrasse 22, 8954 Geroldswil', h:undefined},
              ].map(i=>(
                <div key={i.l}>
                  <div style={lbl}>{i.l}</div>
                  {i.h
                    ? <a href={i.h} style={{fontSize:17,color:'var(--accent-dark)'}} className="hover:underline">{i.v}</a>
                    : <div style={{fontSize:17,color:'rgba(0,0,0,0.55)',lineHeight:1.5}}>{i.v}</div>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: '#0a0a0b',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: '40px 36px',
            boxShadow: '0 16px 60px rgba(0,0,0,0.3)',
          }}>
            {sent ? (
              <div style={{ textAlign:'center', padding:'48px 0' }}>
                <div style={{
                  width:56, height:56, borderRadius:'50%',
                  background:'var(--accent)', margin:'0 auto 20px',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                    <path d="M4 11l5 5 9-10" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{fontSize:21,fontWeight:600,color:'#fff',letterSpacing:'-0.022em'}}>Danke!</div>
                <div style={{fontSize:17,color:'rgba(255,255,255,0.5)',marginTop:8}}>Wir melden uns innerhalb 1 Werktag.</div>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:'flex',flexDirection:'column',gap:20}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <div>
                    <label style={lbl}>Name *</label>
                    <input required style={inp} placeholder="Max Muster" value={f.name} onChange={upd('name')}/>
                  </div>
                  <div>
                    <label style={lbl}>E-Mail *</label>
                    <input required type="email" style={inp} placeholder="max@example.ch" value={f.email} onChange={upd('email')}/>
                  </div>
                </div>
                <div>
                  <label style={lbl}>Telefon</label>
                  <input style={inp} placeholder="+41 ..." value={f.phone} onChange={upd('phone')}/>
                </div>
                <div>
                  <label style={lbl}>Interesse</label>
                  <select style={{...inp,color:f.interest?'#fff':'rgba(255,255,255,0.4)'}} value={f.interest} onChange={upd('interest')}>
                    {['Markise','Rollladen','Plissee / Jalousie','Insektenschutz','Reparatur','Anderes'].map(o=>(
                      <option key={o} style={{background:'#1a1a1d'}}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Nachricht</label>
                  <textarea rows={4} style={{...inp,resize:'none'}} placeholder="Ihr Projekt in wenigen Worten…" value={f.message} onChange={upd('message')}/>
                </div>
                <button type="submit" style={{
                  background:'var(--accent)', color:'#000',
                  fontSize:17, fontWeight:500,
                  padding:'14px', borderRadius:10,
                  border:'none', cursor:'pointer',
                  fontFamily:'var(--f)', letterSpacing:'-0.022em',
                  transition:'background 0.2s',
                }}
                onMouseEnter={e=>(e.currentTarget.style.background='var(--accent-dark)')}
                onMouseLeave={e=>(e.currentTarget.style.background='var(--accent)')}
                >Anfrage senden</button>
                <p style={{textAlign:'center',fontSize:12,color:'rgba(255,255,255,0.22)'}}>
                  Kostenlos & unverbindlich — Antwort innerhalb 1 Werktag
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
