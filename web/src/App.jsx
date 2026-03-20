import React, { useEffect, useRef, useState } from 'react'

/* ───────────────── Global Styles ───────────────── */
const globalStyles = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scroll-padding-top: 80px; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0A0B0F;
    color: #E2E8F0;
    line-height: 1.6;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5, h6 { font-family: 'Syne', sans-serif; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
  input, textarea { font-family: 'DM Sans', sans-serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0A0B0F; }
  ::-webkit-scrollbar-thumb { background: #6366F1; border-radius: 4px; }

  /* Fade-in animation */
  .fade-section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .fade-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Gradient bg animation */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`

/* ───────────────── Hook: Intersection Observer ───────────────── */
function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ───────────────── SVG Icons ───────────────── */
const icons = {
  chatbot: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <circle cx="9" cy="10" r="1" fill="#6366F1"/>
      <circle cx="15" cy="10" r="1" fill="#6366F1"/>
    </svg>
  ),
  automation: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  content: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  finance: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  hr: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  portal: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  github: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  external: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  ),
  check: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  clock: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  users: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  chart: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6"/>
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
}

/* ───────────────── Data ───────────────── */
const painPoints = [
  { icon: icons.clock, title: 'Tu equipo pierde horas en tareas repetitivas', color: '#EF4444' },
  { icon: icons.users, title: 'Tus clientes esperan demasiado por respuestas', color: '#F59E0B' },
  { icon: icons.chart, title: 'Tomas decisiones sin datos en tiempo real', color: '#8B5CF6' },
]

const services = [
  { icon: icons.chatbot, title: 'Chatbot IA Multiagente', price: '$4,999/mes', desc: 'Atencion al cliente 24/7 con agentes especializados que resuelven el 80% de consultas sin intervencion humana. Web, WhatsApp y Telegram.' },
  { icon: icons.automation, title: 'Automatizacion de Procesos', price: '$2,999/proyecto', desc: 'Conectamos tu CRM, email, facturacion y herramientas en flujos automaticos con Make.com y n8n. Elimina la carga administrativa.' },
  { icon: icons.content, title: 'Generacion de Contenido con IA', price: '$3,499/mes', desc: 'Copy para redes sociales, prompts DALL-E 3, paletas visuales y calendario de publicacion. 4 plataformas, contenido ilimitado.' },
  { icon: icons.finance, title: 'Dashboard Financiero con IA', price: '$5,999/proyecto', desc: 'Deteccion de anomalias, reconciliacion de gastos y proyecciones de flujo de caja. Importa tus datos y obten insights al instante.' },
  { icon: icons.hr, title: 'Filtrado de CVs con IA', price: '$1,999/proceso', desc: 'Evalua candidatos automaticamente contra tu perfil de puesto. Scoring, ranking y recomendaciones por candidato.' },
  { icon: icons.portal, title: 'Portal de Clientes No-Code', price: '$4,499/proyecto', desc: 'Portal completo con proyectos, facturas, tickets y documentos. Sin backend, sin servidor, listo en dias.' },
]

const steps = [
  { num: '01', title: 'Diagnostico Gratis', desc: 'Analizamos tus procesos y detectamos oportunidades de automatizacion (30 min, sin compromiso)' },
  { num: '02', title: 'Propuesta a la Medida', desc: 'Disenamos la solucion tecnica con tiempos, costos y ROI estimado' },
  { num: '03', title: 'Implementacion Agil', desc: 'Construimos, testeamos y desplegamos en sprints de 1-2 semanas' },
  { num: '04', title: 'Soporte Continuo', desc: 'Monitoreo, ajustes y capacitacion para tu equipo' },
]

const demos = [
  { title: 'Chatbot Multiagente', url: 'https://chatbot-multiagente-ia.vercel.app', color: '#6366F1' },
  { title: 'Content Studio IA', url: 'https://content-studio-ai-blush.vercel.app', color: '#10B981' },
  { title: 'Finance AI Dashboard', url: 'https://finance-ai-dashboard-omega.vercel.app', color: '#F59E0B' },
  { title: 'HR Scout LLM', url: 'https://hr-scout-llm.vercel.app', color: '#EF4444' },
  { title: 'Client Hub No-Code', url: 'https://client-hub-nocode.vercel.app', color: '#8B5CF6' },
]

const techStack = [
  'Claude API', 'GPT-4o', 'Make.com', 'n8n', 'Zapier',
  'Airtable', 'Softr', 'DALL-E 3', 'React', 'Python', 'Node.js',
]

/* ───────────────── Inline Style Helpers ───────────────── */
const s = {
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' },
  sectionPad: { padding: '100px 0' },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 700,
    marginBottom: 16,
    color: '#fff',
  },
  sectionSub: { color: '#94A3B8', fontSize: '1.1rem', maxWidth: 600, marginBottom: 56 },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: 999,
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
}

/* ───────────────── Components ───────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Demos', href: '#demos' },
    { label: 'Sobre mi', href: '#sobre' },
    { label: 'Contacto', href: '#contacto' },
  ]

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? 'rgba(10,11,15,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  }

  const innerStyle = {
    ...s.container,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 72,
  }

  const logoStyle = {
    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem',
    background: 'linear-gradient(135deg, #6366F1, #10B981)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  }

  const desktopLinks = {
    display: 'flex', gap: 32, alignItems: 'center', listStyle: 'none',
  }

  const linkStyle = {
    fontSize: '0.9rem', fontWeight: 500, color: '#94A3B8',
    transition: 'color 0.2s',
  }

  const ctaStyle = {
    padding: '10px 24px', borderRadius: 8, border: 'none',
    background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
    color: '#fff', fontWeight: 600, fontSize: '0.9rem',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <a href="#" style={logoStyle}>Impulso IA</a>

        {/* Desktop */}
        <ul style={{ ...desktopLinks, '@media(maxWidth:768px)': { display: 'none' } }}
          className="nav-desktop">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={linkStyle}
                onMouseEnter={e => e.target.style.color = '#6366F1'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contacto" style={ctaStyle}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(99,102,241,0.3)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
            >Agenda tu llamada</a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', display: 'none' }}>
          {menuOpen ? icons.close : icons.menu}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          background: 'rgba(10,11,15,0.98)', padding: '24px', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(99,102,241,0.2)',
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', color: '#CBD5E1', fontSize: '1.1rem', fontWeight: 500 }}
            >{l.label}</a>
          ))}
          <a href="#contacto" onClick={() => setMenuOpen(false)}
            style={{ ...ctaStyle, display: 'inline-block', marginTop: 16 }}>Agenda tu llamada</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
      overflow: 'hidden', paddingTop: 72,
    }}>
      {/* Animated gradient bg */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.05) 40%, transparent 70%)',
        animation: 'gradientShift 8s ease infinite',
        backgroundSize: '200% 200%',
      }}/>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}/>
      {/* Floating orbs */}
      <div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)',
        top: '10%', right: '5%', animation: 'float 6s ease-in-out infinite', zIndex: 0,
      }}/>
      <div style={{
        position: 'absolute', width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
        bottom: '15%', left: '8%', animation: 'float 8s ease-in-out infinite 1s', zIndex: 0,
      }}/>

      <div style={{ ...s.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          ...s.badge,
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8',
        }}>
          IA & Automatizacion para empresas
        </div>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
          lineHeight: 1.15, color: '#fff', maxWidth: 900, margin: '0 auto 24px',
        }}>
          Tu negocio merece trabajar{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366F1, #10B981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>con IA</span>
          , no contra ella
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94A3B8',
          maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Implementamos soluciones de Inteligencia Artificial y automatizacion que reducen costos, aceleran procesos y liberan a tu equipo para lo que realmente importa.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contacto" style={{
            padding: '16px 36px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            color: '#fff', fontWeight: 700, fontSize: '1.05rem',
            boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.3)' }}
          >
            Agenda tu diagnostico gratis {icons.arrow}
          </a>
          <a href="#servicios" style={{
            padding: '16px 36px', borderRadius: 12,
            border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.06)',
            color: '#C7D2FE', fontWeight: 600, fontSize: '1.05rem',
            transition: 'background 0.2s, border-color 0.2s',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)' }}
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  )
}

function PainPoints() {
  return (
    <section style={{ ...s.sectionPad, background: 'linear-gradient(180deg, #0A0B0F 0%, #0F1017 100%)' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}>
            El problema
          </div>
          <h2 style={s.sectionTitle}>Esto le pasa a tu empresa hoy</h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {painPoints.map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 32, textAlign: 'center',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + '40'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ marginBottom: 20, display: 'inline-block' }}>{p.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#E2E8F0', lineHeight: 1.4 }}>{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="servicios" style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            Servicios
          </div>
          <h2 style={s.sectionTitle}>Soluciones que generan resultados</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>Cada proyecto se adapta a tus necesidades. Sin contratos largos, con resultados medibles.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {services.map((sv, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 32,
              transition: 'border-color 0.3s, transform 0.3s',
              display: 'flex', flexDirection: 'column',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                {sv.icon}
              </div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: '1.2rem', color: '#fff', marginBottom: 8,
              }}>{sv.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{sv.desc}</p>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #6366F1, #10B981)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Desde {sv.price}</span>
                <span style={{ color: '#6366F1', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.9rem', fontWeight: 500 }}>
                  Saber mas {icons.arrow}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="proceso" style={{
      ...s.sectionPad,
      background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)',
    }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}>
            Proceso
          </div>
          <h2 style={s.sectionTitle}>Como trabajamos</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>De la idea al resultado en 4 pasos claros.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24, position: 'relative',
        }}>
          {steps.map((st, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 32,
              position: 'relative',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(16,185,129,0.2))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'block', marginBottom: 16,
              }}>{st.num}</span>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: '1.15rem', color: '#fff', marginBottom: 12,
              }}>{st.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.93rem', lineHeight: 1.6 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Demos() {
  return (
    <section id="demos" style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            Portafolio
          </div>
          <h2 style={s.sectionTitle}>Demos en vivo</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>Proyectos reales, funcionando ahora mismo. Haz clic y pruebalos.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {demos.map((d, i) => (
            <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, overflow: 'hidden',
              transition: 'border-color 0.3s, transform 0.3s',
              display: 'block', textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = d.color + '60'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {/* Preview placeholder */}
              <div style={{
                height: 180, background: `linear-gradient(135deg, ${d.color}15, ${d.color}05)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Fake browser chrome */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 28,
                  background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center',
                  padding: '0 12px', gap: 6,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }}/>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }}/>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}/>
                  <div style={{
                    flex: 1, height: 16, borderRadius: 4, background: 'rgba(255,255,255,0.08)',
                    marginLeft: 8, fontSize: '0.6rem', color: '#64748B', display: 'flex',
                    alignItems: 'center', paddingLeft: 8,
                  }}>
                    {d.url.replace('https://', '')}
                  </div>
                </div>
                <span style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.3rem',
                  color: d.color, opacity: 0.6,
                }}>{d.title.split(' ')[0]}</span>
              </div>
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#E2E8F0' }}>{d.title}</h3>
                <span style={{
                  padding: '8px 16px', borderRadius: 8,
                  background: d.color + '15', color: d.color,
                  fontSize: '0.85rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  Probar demo {icons.external}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechStack() {
  return (
    <section style={{
      ...s.sectionPad,
      background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)',
    }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...s.badge, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}>
            Tecnologias
          </div>
          <h2 style={s.sectionTitle}>Nuestro stack</h2>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
        }}>
          {techStack.map((t, i) => (
            <span key={i} style={{
              padding: '12px 24px', borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#CBD5E1', fontSize: '0.95rem', fontWeight: 500,
              transition: 'border-color 0.3s, background 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = '#6366F180'; e.target.style.background = 'rgba(99,102,241,0.08)'; e.target.style.color = '#C7D2FE' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.color = '#CBD5E1' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="sobre" style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={{ ...s.container, maxWidth: 900 }} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            Sobre mi
          </div>
          <h2 style={s.sectionTitle}>Christian Hernandez Escamilla</h2>
        </div>
        <div style={{
          display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {/* Photo placeholder */}
          <div style={{
            width: 200, height: 200, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1, #10B981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 800,
            flexShrink: 0,
          }}>CH</div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
              Soy Christian Hernandez, Ingeniero en Software especializado en IA & Automatizacion. He disenado y desplegado sistemas multiagente, chatbots inteligentes, dashboards financieros y portales No-Code para empresas. Mi enfoque: traducir necesidades de negocio en soluciones tecnicas que generan ROI desde el dia uno.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['5+ proyectos IA desplegados', 'Stack full: React, Python, Node.js', 'Resultados medibles en semanas'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: '0.9rem' }}>
                  {icons.check} {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#E2E8F0', fontSize: '1rem',
    transition: 'border-color 0.3s',
    outline: 'none',
  }

  return (
    <section id="contacto" style={{
      ...s.sectionPad,
      background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)',
    }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            Contacto
          </div>
          <h2 style={s.sectionTitle}>Hablemos de tu proyecto</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>
            Agenda tu diagnostico gratuito de 30 minutos. Sin compromiso, con ideas concretas.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48, maxWidth: 900, margin: '0 auto',
        }}>
          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input type="text" placeholder="Nombre" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <input type="email" placeholder="Email" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <input type="text" placeholder="Empresa" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <textarea placeholder="Que quieres automatizar?" rows={4} required
              style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button type="submit" style={{
              padding: '16px 36px', borderRadius: 12, border: 'none',
              background: submitted
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: '#fff', fontWeight: 700, fontSize: '1.05rem',
              boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
              transition: 'all 0.3s',
            }}>
              {submitted ? 'Enviado - Te contactaremos pronto' : 'Enviar'}
            </button>
          </form>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 24,
            }}>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: '1.05rem' }}>Contacto directo</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="tel:5579605324" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#CBD5E1', fontSize: '0.95rem' }}>
                  {icons.phone} 55 7960 5324
                </a>
                <a href="mailto:chris_231011@hotmail.com" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#CBD5E1', fontSize: '0.95rem' }}>
                  {icons.mail} chris_231011@hotmail.com
                </a>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 24,
            }}>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: '1.05rem' }}>Redes sociales</h4>
              <div style={{ display: 'flex', gap: 16 }}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(99,102,241,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#818CF8', transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
                >
                  {icons.linkedin}
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(99,102,241,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#818CF8', transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
                >
                  {icons.github}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '32px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#0A0B0F',
    }}>
      <div style={{ ...s.container, textAlign: 'center' }}>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          &copy; 2026 Impulso IA &mdash; Automatiza. Escala. Transforma.
        </p>
      </div>
    </footer>
  )
}

/* ───────────────── Responsive CSS ───────────────── */
const responsiveStyles = `
  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: block !important; }
  }
  @media (min-width: 769px) {
    .nav-mobile-menu { display: none !important; }
  }
`

/* ───────────────── App ───────────────── */
export default function App() {
  useFadeIn()

  return (
    <>
      <style>{globalStyles}</style>
      <style>{responsiveStyles}</style>
      <Navbar />
      <Hero />
      <PainPoints />
      <Services />
      <Process />
      <Demos />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
