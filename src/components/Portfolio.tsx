import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectDetail from './ProjectDetail'

gsap.registerPlugin(ScrollTrigger)

export const PROJECTS = [
  {
    id: 'villa-kuesnacht',
    title: 'Villa Küsnacht',
    location: 'Küsnacht ZH',
    category: 'Markisen & Pergola',
    year: '2024',
    client: 'Privat',
    service: 'Planung & Montage',
    heroImg: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/a1/ab/a1ab6d94-9158-4b05-a511-c5aa424ff277/smr_web_was_markisen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    description: 'Eine grosszügige Villa am Zürichsee erhielt eine komplette Terrassenbeschattung mit motorisierter Pergola-Markise. Der Fokus lag auf der nahtlosen Integration in die bestehende Architektur bei maximaler Flexibilität.',
    descriptionExtra: 'Unser Ansatz verbindet ästhetische Eleganz mit modernster Technik. Jedes Detail — von der Stoffwahl bis zur Windautomatik — wurde auf die individuellen Bedürfnisse der Bewohner abgestimmt.',
    images: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/cc/d0/ccd083de-1241-4bcf-b49d-e35d8008fd1f/smr_web_was_markisen_2.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/bc/0b/bc0bc12e-767d-48ca-ba90-7813d3de1012/smr_web_was_markisen_4.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
    quote: 'Von der Beratung bis zur Montage absolut professionell. Die Markise übertrifft unsere Erwartungen bei Weitem.',
    quoteAuthor: 'Der Bauherr',
  },
  {
    id: 'restaurant-seegarten',
    title: 'Restaurant Seegarten',
    location: 'Horgen ZH',
    category: 'Gastronomie-Beschattung',
    year: '2023',
    client: 'Seegarten GmbH',
    service: 'Beratung & Installation',
    heroImg: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/08/3d/083ddbef-2658-48b2-a987-ac40b499f424/smr_web_wo_gastronomie1.jpg__738x612_q85_subject_location-840%2C700_subsampling-2_upscale.jpg',
    description: 'Eine umfassende Terrassenbeschattung für das Restaurant Seegarten ermöglicht den Ganzjahresbetrieb der beliebten Aussenterrasse. Wind- und Wetterschutz sorgen für Komfort auch bei wechselhaftem Wetter.',
    descriptionExtra: 'Die Lösung wurde speziell für den Gastronomiebetrieb konzipiert: robuste Materialien, schnelle Bedienung und ein elegantes Erscheinungsbild, das die Architektur des historischen Gebäudes respektiert.',
    images: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/fb/d5/fbd5b3b1-0e7e-4331-8915-f67b5e336469/smr_web_wo_wohn.jpg__738x612_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/da/2c/da2c7ead-d622-47e1-ac3f-f159fbe7775c/smr_web_wo_gewerbe.jpg__738x612_q85_subsampling-2_upscale.jpg',
    ],
    quote: 'Unsere Gäste lieben die neue Terrassenbeschattung. Die Saison hat sich spürbar verlängert.',
    quoteAuthor: 'Geschäftsführung',
  },
  {
    id: 'wohnanlage-winterthur',
    title: 'Wohnanlage Lindberg',
    location: 'Winterthur',
    category: 'Rollladen & Lamellenstoren',
    year: '2024',
    client: 'Immobilien AG',
    service: 'Komplettsanierung',
    heroImg: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/02/e3/02e313ba-2d75-4ec7-b42b-8ef8485ab143/smr_web_was_rolladen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    description: 'Über 60 Wohneinheiten erhielten neue Lamellenstoren mit vollautomatischer Steuerung. Das Projekt wurde bei laufendem Betrieb umgesetzt — ohne Lärm- oder Staubbelastung für die Mieter.',
    descriptionExtra: 'Moderne Smart-Home-Integration ermöglicht es den Bewohnern, ihre Storen per App zu steuern. Die automatische Wetterstation sorgt zusätzlich für optimalen Schutz bei Sturm und Hagel.',
    images: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/63/fd/63fd9ea8-bb7f-4170-976d-1794591baa6f/smr_web_was_rolladen_2.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/d6/78/d6783d86-2909-4c2a-adc7-e3f07f8e27bd/smr_web_was_rolladen_3.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
    quote: 'Zuverlässiger Partner für unser gesamtes Portfolio. Einheitliche Qualität über alle Objekte.',
    quoteAuthor: 'Portfoliomanager',
  },
  {
    id: 'penthouse-zuerich',
    title: 'Penthouse Seefeld',
    location: 'Zürich',
    category: 'Plissees & Innenjalousien',
    year: '2023',
    client: 'Privat',
    service: 'Beratung & Massanfertigung',
    heroImg: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/c3/69/c369d35d-2487-4696-a02d-ee01bf774eee/smr_web_was_jalousien_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    description: 'Raumhohe Fensterfronten im Penthouse verlangten nach einem Blendschutz, der Aussicht und Lichtführung perfekt vereint. Massgeschneiderte Plissees in dezenter Farbgebung schaffen eine ruhige Atmosphäre.',
    descriptionExtra: 'Die Plissees wurden in enger Abstimmung mit dem Innenarchitekten ausgewählt. Jedes Fenster erhielt eine individuelle Lösung — vom Dachfenster bis zum Panorama-Schiebeelement.',
    images: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/41/b1/41b145ac-85e9-4e73-8678-2a3223af1fce/smr_web_was_jalousien_3.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/df/de/dfde0baa-7450-44bb-a585-cec503ba5ae0/smr_web_was_plissees5.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
    quote: 'Kompetente Beratung ohne Verkaufsdruck. Man merkt sofort, dass hier echte Fachleute am Werk sind.',
    quoteAuthor: 'Die Eigentümerin',
  },
  {
    id: 'schulhaus-bern',
    title: 'Schulhaus Matte',
    location: 'Bern',
    category: 'Sonnenschutz-Sanierung',
    year: '2022',
    client: 'Gemeinde Bern',
    service: 'Sanierung & Montage',
    heroImg: 'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/ef/f4/eff4f397-17ef-40ad-8bda-e0b4bccce8bc/smr_web_wo_oeffentlicheeinrichtungen.jpg__738x612_q85_subsampling-2_upscale.jpg',
    description: 'Komplette Sonnenschutz-Erneuerung eines denkmalgeschützten Schulhauses. Die Lösung verbindet modernen Komfort mit den strengen Auflagen des Denkmalschutzes.',
    descriptionExtra: 'Wartungsarme Systeme und lange Garantiezeiten machen das Projekt zu einer nachhaltigen Investition. Die automatische Steuerung reduziert den Energieverbrauch im Sommer um bis zu 30%.',
    images: [
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/61/b3/61b3c456-7ae6-4d42-9d72-36bb5025774b/smr_web_wo_mietwohnungen.jpg__738x612_q85_subsampling-2_upscale.jpg',
      'https://schattenmeister.ch/media/filer_public_thumbnails/filer_public/e8/2f/e82f726d-c392-4df2-8a50-2f352818027b/smr_web_was_reparaturen_1.jpg__1876.0x1444.0_q85_subsampling-2_upscale.jpg',
    ],
    quote: 'Schnelle Reaktion, fairer Preis, tadelloses Ergebnis.',
    quoteAuthor: 'Projektleitung Gemeinde',
  },
]

const STATS = [
  { value: '200+', label: 'Realisierte Projekte' },
  { value: '20+', label: 'Jahre Erfahrung' },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openProject, setOpenProject] = useState<string | null>(null)
  const [hovIdx, setHovIdx] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-header', {
        scrollTrigger: { trigger: '.port-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.port-card', {
        scrollTrigger: { trigger: '.port-grid', start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        stagger: 0.12,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const project = openProject ? PROJECTS.find(p => p.id === openProject) : null

  return (
    <>
      <section ref={sectionRef} id="referenzen" style={{
        background: '#fff',
        padding: 'clamp(80px,10vw,140px) 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>
          {/* Header */}
          <div className="port-header" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: 56, flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <p style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 14,
              }}>Referenzen</p>
              <h2 style={{
                fontFamily: 'var(--f)',
                fontSize: 'clamp(32px,4.5vw,56px)',
                fontWeight: 600, lineHeight: 1.07,
                letterSpacing: '-0.025em', color: '#1d1d1f',
              }}>Ausgewählte<br/><span style={{ color: 'rgba(0,0,0,0.3)' }}>Projekte</span></h2>
            </div>

            <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700,
                    letterSpacing: '-0.03em', color: '#1d1d1f', lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginTop: 6,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid — row 1: large left + stacked right */}
          <div className="port-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gridTemplateRows: '280px 280px',
            gap: 12,
          }}>
            <PortfolioCard
              project={PROJECTS[0]}
              idx={0}
              hovIdx={hovIdx}
              setHovIdx={setHovIdx}
              onClick={() => setOpenProject(PROJECTS[0].id)}
              style={{ gridRow: '1 / 3' }}
              large
            />
            <PortfolioCard
              project={PROJECTS[1]}
              idx={1}
              hovIdx={hovIdx}
              setHovIdx={setHovIdx}
              onClick={() => setOpenProject(PROJECTS[1].id)}
            />
            <PortfolioCard
              project={PROJECTS[2]}
              idx={2}
              hovIdx={hovIdx}
              setHovIdx={setHovIdx}
              onClick={() => setOpenProject(PROJECTS[2].id)}
            />
          </div>

          {/* Grid — row 2: equal halves */}
          <div className="port-grid-row2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '340px',
            gap: 12, marginTop: 12,
          }}>
            <PortfolioCard
              project={PROJECTS[3]}
              idx={3}
              hovIdx={hovIdx}
              setHovIdx={setHovIdx}
              onClick={() => setOpenProject(PROJECTS[3].id)}
            />
            <PortfolioCard
              project={PROJECTS[4]}
              idx={4}
              hovIdx={hovIdx}
              setHovIdx={setHovIdx}
              onClick={() => setOpenProject(PROJECTS[4].id)}
            />
          </div>
        </div>
      </section>

      {/* Project Detail Overlay */}
      {project && (
        <ProjectDetail
          project={project}
          onClose={() => setOpenProject(null)}
          onNext={() => {
            const idx = PROJECTS.findIndex(p => p.id === openProject)
            setOpenProject(PROJECTS[(idx + 1) % PROJECTS.length].id)
          }}
          nextProject={PROJECTS[(PROJECTS.findIndex(p => p.id === openProject) + 1) % PROJECTS.length]}
        />
      )}
    </>
  )
}

function PortfolioCard({ project, idx, hovIdx, setHovIdx, onClick, style, large }: {
  project: typeof PROJECTS[0]
  idx: number
  hovIdx: number | null
  setHovIdx: (i: number | null) => void
  onClick: () => void
  style?: React.CSSProperties
  large?: boolean
}) {
  const isHov = hovIdx === idx

  return (
    <div
      className="port-card"
      onClick={onClick}
      onMouseEnter={() => setHovIdx(idx)}
      onMouseLeave={() => setHovIdx(null)}
      style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
    >
      <img
        src={project.heroImg}
        alt={project.title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
          transform: isHov ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isHov
          ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)',
        transition: 'background 0.5s',
      }}/>

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: large ? '40px 36px' : '28px 28px',
        zIndex: 1,
      }}>
        <p style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--accent)',
          marginBottom: 8, opacity: 0.9,
        }}>{project.location}</p>

        <h3 style={{
          fontFamily: 'var(--f)',
          fontSize: large ? 'clamp(24px,3vw,36px)' : 'clamp(20px,2.5vw,28px)',
          fontWeight: 600, lineHeight: 1.15,
          letterSpacing: '-0.02em', color: '#fff',
          marginBottom: 14,
        }}>{project.title}</h3>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
          transform: isHov ? 'translateY(0)' : 'translateY(6px)',
          opacity: isHov ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}>
          Projekt ansehen
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
