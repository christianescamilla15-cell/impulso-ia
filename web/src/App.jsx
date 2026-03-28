import React, { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

/* ====== CONTEXT ====== */
const LangContext = createContext({ lang: 'es', setLang: () => {} })
const useLang = () => useContext(LangContext)

/* ====== EASING ====== */
const EASE = [0.16, 1, 0.3, 1]

/* ====== TRANSLATIONS ====== */
const t = {
  es: {
    navServices:'Servicios',navProcess:'Proceso',navDemos:'Demos',navAbout:'Sobre m\u00ed',navContact:'Contacto',navCta:'Agenda tu llamada',
    heroBadge:'IA & Automatizaci\u00f3n para empresas',
    heroT1:'Automatiza.',heroT2:'Escala.',heroT3:'Crece.',
    heroSub:'Soluciones de IA que transforman tu negocio \u2014 reducen costos, aceleran procesos y liberan a tu equipo para lo que realmente importa.',
    heroCta:'Agenda tu diagn\u00f3stico gratis',heroCtaSec:'Ver servicios',
    hStat1:'7+',hStat1L:'Servicios',hStat2:'18',hStat2L:'Sistemas',hStat3:'1,346+',hStat3L:'Tests',
    trustBadge:'Respaldado por resultados',trustTitle:'N\u00fameros que hablan por nosotros',
    trust1:'Sistemas IA Entregados',trust2:'Claude Tools en Producci\u00f3n',trust3:'Tests Automatizados',trust4:'Demos en Vivo',
    painBadge:'El problema',painTitle:'Esto le pasa a tu empresa hoy',
    pain1:'Tu equipo pierde horas en tareas repetitivas',pain2:'Tus clientes esperan demasiado por respuestas',pain3:'Tomas decisiones sin datos en tiempo real',
    svcBadge:'Servicios',svcTitle:'Soluciones que generan resultados',svcSub:'Cada proyecto se adapta a tus necesidades. Sin contratos largos, con resultados medibles.',
    svcFrom:'Desde',svcReq:'Solicitar',
    s1T:'Chatbot IA Multiagente',s1P:'$4,999/mes',s1D:'Atenci\u00f3n 24/7 con agentes especializados.',s1B:['Web, WhatsApp, Telegram','5 agentes especializados','Base conocimiento IA','80% resoluci\u00f3n auto'],
    s2T:'Automatizaci\u00f3n de Procesos',s2P:'$2,999/proy',s2D:'Conecta CRM, email, facturaci\u00f3n en flujos auto.',s2B:['Make.com y n8n','Integraci\u00f3n CRM/Email','Flujos inteligentes','Sin carga admin'],
    s3T:'Contenido con IA',s3P:'$3,499/mes',s3D:'Copy, DALL-E 3, paletas y calendario editorial.',s3B:['4 plataformas','DALL-E 3','Calendario editorial','Contenido ilimitado'],
    s4T:'Dashboard Financiero IA',s4P:'$5,999/proy',s4D:'Anomal\u00edas, reconciliaci\u00f3n y proyecciones.',s4B:['Detecci\u00f3n anomal\u00edas','Proyecci\u00f3n cashflow','Chatbot financiero','Importa datos'],
    s5T:'Filtrado CVs con IA',s5P:'$1,999/proc',s5D:'Scoring autom\u00e1tico contra perfil de puesto.',s5B:['Scoring 0-100','Matching sin\u00f3nimos','Heatmap skills','Reporte comparativo'],
    s6T:'Portal Clientes No-Code',s6P:'$4,499/proy',s6D:'Portal con proyectos, facturas, tickets.',s6B:['Tickets y facturas','Docs seguros','Asistente IA','Sin backend'],
    s7T:'Orquestaci\u00f3n Agentes IA',s7P:'$7,999/proy',s7D:'Enjambres inteligentes con auto-reparaci\u00f3n.',s7B:['22 agentes IA','6 topolog\u00edas','Auto-reparaci\u00f3n','Terraform + K8s'],
    procBadge:'Proceso',procTitle:'C\u00f3mo trabajamos',procSub:'De la idea al resultado en 4 pasos claros.',
    st1T:'Descubrimiento',st1D:'Analizamos tus procesos y detectamos oportunidades (30 min, sin compromiso)',
    st2T:'Dise\u00f1o',st2D:'Soluci\u00f3n t\u00e9cnica con tiempos, costos y ROI estimado',
    st3T:'Desarrollo',st3D:'Construimos, testeamos y desplegamos en sprints de 1-2 semanas',
    st4T:'Entrega',st4D:'Monitoreo, ajustes y capacitaci\u00f3n para tu equipo',
    demoBadge:'Portafolio',demoTitle:'Demos en vivo',demoSub:'Proyectos reales funcionando. Haz clic y pru\u00e9balos.',demoCta:'Ver Demo',
    d1T:'Chatbot Multiagente',d1M:['5 agentes IA','80% resoluci\u00f3n','24/7'],
    d2T:'Content Studio IA',d2M:['4 plataformas','90% m\u00e1s r\u00e1pido','A/B testing'],
    d3T:'Finance AI',d3M:['Anomal\u00edas','Cashflow','Chatbot fin.'],
    d4T:'HR Scout LLM',d4M:['Score 0-100','15 min vs 3 d\u00edas','Comparativo'],
    d5T:'Client Hub',d5M:['Tickets','Docs seguros','Asistente IA'],
    d6T:'ClientHub Portal',d6M:['Portal completo','Sin backend','Listo en d\u00edas'],
    d7T:'NexusForge AI',d7M:['22 agentes','6 topolog\u00edas','247 tests'],
    techBadge:'Tecnolog\u00edas',techTitle:'Nuestro stack',
    aboutBadge:'Sobre m\u00ed',aboutName:'Christian Hernandez Escamilla',
    aboutBio:'Ingeniero en Software especializado en IA & Automatizaci\u00f3n. 18 sistemas en producci\u00f3n con 1,346+ tests automatizados, incluyendo chatbots multiagente, dashboards financieros, portales No-Code y NexusForge: orquestaci\u00f3n de 22 agentes IA con Terraform + Kubernetes.',
    aboutTag1:'18 sistemas IA en producci\u00f3n',aboutTag2:'React, Python, Node.js, Terraform',aboutTag3:'1,346+ tests automatizados',
    resBadge:'Resultados reales',resTitle:'No prometemos, demostramos',resSub:'M\u00e9tricas de proyectos reales.',
    r1M:'80%',r1L:'consultas sin humanos',r1D:'Chatbot multiagente con 5 IAs especializadas',
    r2M:'90%',r2L:'menos tiempo en contenido',r2D:'Copy + visual para 4 plataformas en segundos',
    r3M:'2\u03c3',r3L:'detecci\u00f3n de anomal\u00edas',r3D:'Z-score sobre transacciones reales',
    r4M:'15 min',r4L:'vs horas en filtrado CVs',r4D:'Scoring, matching y heatmap de skills',
    r5M:'22',r5L:'agentes en enjambre',r5D:'6 topolog\u00edas, auto-reparaci\u00f3n, RAG',
    testBadge:'Testimonios',testTitle:'Lo que dicen nuestros clientes',
    t1:'"Resolvemos el 80% de consultas sin intervenci\u00f3n humana."',t1A:'Mar\u00eda Gonz\u00e1lez',t1R:'COO @ TechSoluciones',
    t2:'"El dashboard detect\u00f3 anomal\u00edas que nos ahorraron $50K."',t2A:'Carlos Ruiz',t2R:'CFO @ DataMex',
    t3:'"De 3 d\u00edas a 15 minutos en screening de CVs."',t3A:'Ana L\u00f3pez',t3R:'HR Director @ TalentPro',
    faqBadge:'FAQ',faqTitle:'Resolvemos tus dudas',
    f1Q:'\u00bfCu\u00e1nto tiempo toma?',f1A:'Entre 1 y 3 semanas. Sprints \u00e1giles para entregarte valor r\u00e1pido.',
    f2Q:'\u00bfNecesito conocimientos t\u00e9cnicos?',f2A:'No, nos encargamos de todo.',
    f3Q:'\u00bfQu\u00e9 pasa si no me convence?',f3A:'Reembolso completo en 30 d\u00edas.',
    f4Q:'\u00bfPuedo ver una demo?',f4A:'S\u00ed, todas est\u00e1n disponibles en la secci\u00f3n demos.',
    f5Q:'\u00bfSoporte post-implementaci\u00f3n?',f5A:'30 d\u00edas incluidos + planes continuos.',
    f6Q:'\u00bfQu\u00e9 es NexusForge AI?',f6A:'Plataforma enterprise de orquestaci\u00f3n con 22 agentes, 6 topolog\u00edas, Terraform + K8s.',
    ctBadge:'Contacto',ctTitle:'Transformemos tu ',ctHL:'negocio',
    ctSub:'Agenda tu diagn\u00f3stico gratuito de 30 min.',ctName:'Nombre',ctEmail:'Email',ctCompany:'Empresa',ctMsg:'\u00bfQu\u00e9 quieres automatizar?',
    ctSubmit:'Agenda tu Diagn\u00f3stico Gratis',ctSent:'Enviado \u2014 Te contactaremos pronto',ctDirect:'Contacto directo',ctSocial:'Redes sociales',
    footer:'\u00a9 2026 Impulso IA \u2014 Automatiza. Escala. Transforma.',
    floatCta:'Agenda Llamada',
    chatTitle:'Impulso IA',chatPH:'Escribe tu pregunta...',chatWelcome:'\u00a1Hola! Soy el asistente de Impulso IA. \u00bfEn qu\u00e9 puedo ayudarte?',
    cQ1:'Servicios',cQ2:'Precios',cQ3:'Proceso',cQ4:'Contacto',
  },
  en: {
    navServices:'Services',navProcess:'Process',navDemos:'Demos',navAbout:'About',navContact:'Contact',navCta:'Schedule a Call',
    heroBadge:'AI & Automation for Business',
    heroT1:'Automate.',heroT2:'Scale.',heroT3:'Grow.',
    heroSub:'AI solutions that transform your business \u2014 cut costs, accelerate processes, and free your team.',
    heroCta:'Schedule your free diagnosis',heroCtaSec:'View services',
    hStat1:'7+',hStat1L:'Services',hStat2:'18',hStat2L:'Systems',hStat3:'1,346+',hStat3L:'Tests',
    trustBadge:'Backed by results',trustTitle:'Numbers that speak',
    trust1:'AI Systems Shipped',trust2:'Claude Tools in Prod',trust3:'Automated Tests',trust4:'Live Demos',
    painBadge:'The problem',painTitle:'This is happening to your business',
    pain1:'Hours wasted on repetitive tasks',pain2:'Customers wait too long',pain3:'Decisions without real-time data',
    svcBadge:'Services',svcTitle:'Solutions that deliver',svcSub:'Every project adapts to your needs. No long contracts.',
    svcFrom:'From',svcReq:'Request',
    s1T:'Multi-Agent AI Chatbot',s1P:'$4,999/mo',s1D:'24/7 support with specialized agents.',s1B:['Web, WhatsApp, Telegram','5 specialized agents','AI knowledge base','80% auto-resolution'],
    s2T:'Process Automation',s2P:'$2,999/proj',s2D:'Connect CRM, email, billing in auto workflows.',s2B:['Make.com & n8n','CRM/Email integration','Smart workflows','No admin overhead'],
    s3T:'AI Content Generation',s3P:'$3,499/mo',s3D:'Copy, DALL-E 3, palettes & calendar.',s3B:['4 platforms','DALL-E 3','Editorial calendar','Unlimited content'],
    s4T:'AI Financial Dashboard',s4P:'$5,999/proj',s4D:'Anomalies, reconciliation & projections.',s4B:['Anomaly detection','Cashflow projection','Financial chatbot','Import data'],
    s5T:'AI Resume Screening',s5P:'$1,999/proc',s5D:'Auto scoring against job profile.',s5B:['Score 0-100','Synonym matching','Skill heatmap','Comparative report'],
    s6T:'No-Code Client Portal',s6P:'$4,499/proj',s6D:'Portal with projects, invoices, tickets.',s6B:['Tickets & invoices','Secure docs','AI assistant','No backend'],
    s7T:'AI Agent Orchestration',s7P:'$7,999/proj',s7D:'Intelligent swarms with self-healing.',s7B:['22 AI agents','6 topologies','Self-healing','Terraform + K8s'],
    procBadge:'Process',procTitle:'How we work',procSub:'From idea to results in 4 steps.',
    st1T:'Discovery',st1D:'We analyze your processes (30 min, no commitment)',
    st2T:'Design',st2D:'Technical solution with timelines and ROI',
    st3T:'Development',st3D:'Build, test and deploy in 1-2 week sprints',
    st4T:'Delivery',st4D:'Monitoring, adjustments and team training',
    demoBadge:'Portfolio',demoTitle:'Live demos',demoSub:'Real projects running now. Click to try.',demoCta:'Try Demo',
    d1T:'Multi-Agent Chatbot',d1M:['5 AI agents','80% resolution','24/7'],
    d2T:'AI Content Studio',d2M:['4 platforms','90% faster','A/B testing'],
    d3T:'Finance AI',d3M:['Anomalies','Cashflow','Fin. chatbot'],
    d4T:'HR Scout LLM',d4M:['Score 0-100','15min vs 3days','Comparative'],
    d5T:'Client Hub',d5M:['Tickets','Secure docs','AI assistant'],
    d6T:'ClientHub Portal',d6M:['Full portal','No backend','Ready in days'],
    d7T:'NexusForge AI',d7M:['22 agents','6 topologies','247 tests'],
    techBadge:'Technologies',techTitle:'Our stack',
    aboutBadge:'About me',aboutName:'Christian Hernandez Escamilla',
    aboutBio:'Software Engineer specializing in AI & Automation. 18 production systems with 1,346+ tests, multi-agent chatbots, financial dashboards, No-Code portals, and NexusForge: 22 AI agents with Terraform + K8s.',
    aboutTag1:'18 AI systems in production',aboutTag2:'React, Python, Node.js, Terraform',aboutTag3:'1,346+ automated tests',
    resBadge:'Real results',resTitle:'We prove, not promise',resSub:'Metrics from real projects.',
    r1M:'80%',r1L:'queries without humans',r1D:'Multi-agent chatbot with 5 specialized AIs',
    r2M:'90%',r2L:'less content production time',r2D:'Copy + visual for 4 platforms in seconds',
    r3M:'2\u03c3',r3L:'anomaly detection',r3D:'Z-score on real transactions',
    r4M:'15 min',r4L:'vs hours screening CVs',r4D:'Scoring, matching and skill heatmap',
    r5M:'22',r5L:'agents in swarms',r5D:'6 topologies, self-healing, RAG',
    testBadge:'Testimonials',testTitle:'What our clients say',
    t1:'"We resolve 80% of queries without human intervention."',t1A:'Mar\u00eda Gonz\u00e1lez',t1R:'COO @ TechSoluciones',
    t2:'"The dashboard saved us $50K in anomaly detection."',t2A:'Carlos Ruiz',t2R:'CFO @ DataMex',
    t3:'"From 3 days to 15 minutes in CV screening."',t3A:'Ana L\u00f3pez',t3R:'HR Director @ TalentPro',
    faqBadge:'FAQ',faqTitle:'Common questions',
    f1Q:'How long does it take?',f1A:'1-3 weeks with agile sprints.',
    f2Q:'Do I need tech knowledge?',f2A:'No, we handle everything.',
    f3Q:'What if not satisfied?',f3A:'Full refund within 30 days.',
    f4Q:'Can I see a demo?',f4A:'Yes, all demos are live in the demos section.',
    f5Q:'Post-implementation support?',f5A:'30 days included + ongoing plans.',
    f6Q:'What is NexusForge AI?',f6A:'Enterprise orchestration with 22 agents, 6 topologies, Terraform + K8s.',
    ctBadge:'Contact',ctTitle:'Let\'s transform your ',ctHL:'business',
    ctSub:'Schedule your free 30-min diagnosis.',ctName:'Name',ctEmail:'Email',ctCompany:'Company',ctMsg:'What do you want to automate?',
    ctSubmit:'Schedule Your Free Diagnosis',ctSent:'Sent \u2014 We\'ll contact you soon',ctDirect:'Direct contact',ctSocial:'Social media',
    footer:'\u00a9 2026 Impulso IA \u2014 Automate. Scale. Transform.',
    floatCta:'Free Call',
    chatTitle:'Impulso IA',chatPH:'Type your question...',chatWelcome:'Hi! I\'m the Impulso IA assistant. How can I help?',
    cQ1:'Services',cQ2:'Pricing',cQ3:'Process',cQ4:'Contact',
  },
}

/* ====== CHATBOT KB ====== */
const chatKB = {
  es: {
    services:'Nuestros 7 servicios:\n\n1. Chatbot IA Multiagente \u2014 $4,999/mes\n2. Automatizaci\u00f3n de Procesos \u2014 $2,999/proyecto\n3. Contenido con IA \u2014 $3,499/mes\n4. Dashboard Financiero \u2014 $5,999/proyecto\n5. Filtrado CVs \u2014 $1,999/proceso\n6. Portal Clientes \u2014 $4,499/proyecto\n7. Orquestaci\u00f3n Agentes \u2014 $7,999/proyecto\n\n\u00bfCu\u00e1l te interesa?',
    pricing:'Paquetes:\n\n\u2022 Starter: $7,999/mes \u2014 Chatbot + Automatizaci\u00f3n\n\u2022 Growth: $12,999/mes \u2014 4 soluciones\n\u2022 Enterprise: Precio personalizado\n\nTodos incluyen 30 d\u00edas de soporte.',
    process:'Proceso en 4 pasos:\n\n1. Diagn\u00f3stico Gratis (30 min)\n2. Propuesta a la Medida (48h)\n3. Implementaci\u00f3n \u00c1gil (1-3 semanas)\n4. Soporte Continuo',
    contact:'\u00a1Perfecto! Puedes:\n\n\u2022 Email: christianescamilla15@gmail.com\n\u2022 WhatsApp: wa.me/525579605324\n\u2022 Scroll abajo al formulario de contacto\n\nSin compromiso, con ideas concretas.',
    nexus:'NexusForge AI: 22 agentes, 6 topolog\u00edas de enjambre, auto-reparaci\u00f3n, pipeline RAG, 247 tests. Terraform + K8s. $7,999/proyecto.',
    time:'Implementaci\u00f3n t\u00edpica: 1-3 semanas en sprints \u00e1giles.',
    guarantee:'Reembolso completo en 30 d\u00edas si no est\u00e1s satisfecho.',
    stack:'Stack: Claude API, GPT-4o, React, Python, Node.js, FastAPI, Make.com, n8n, Terraform, Kubernetes, Docker, PostgreSQL, Redis.',
    chatbot:'Chatbot Multiagente: 5 agentes IA especializados, resoluci\u00f3n 80%, WhatsApp/Web/Telegram. $4,999/mes. Implementaci\u00f3n: 2-3 semanas.',
    automation:'Automatizaci\u00f3n: conectamos CRM, email, facturaci\u00f3n con Make.com y n8n. $2,999/proyecto.',
    content:'Contenido IA: copy para 4 redes, DALL-E 3, calendario editorial. $3,499/mes. Reduce producci\u00f3n 90%.',
    finance:'Dashboard Financiero: detecci\u00f3n anomal\u00edas, cashflow, chatbot financiero. $5,999/proyecto.',
    hr:'HR Scout: scoring 0-100, matching sin\u00f3nimos, heatmap skills. $1,999/proceso. 15 min vs 3 d\u00edas.',
    portal:'Portal No-Code: tickets, facturas, docs, asistente IA. $4,499/proyecto. Sin backend.',
    roi:'ROI desde d\u00eda uno. Nuestras soluciones se pagan solas: ahorro en tiempo, errores y personal.',
    whatsapp:'WhatsApp: wa.me/525579605324 \u2014 Escr\u00edbenos directo.',
    email:'Email: christianescamilla15@gmail.com',
    default:'Puedo ayudarte con:\n\u2022 Nuestros 7 servicios\n\u2022 Precios y paquetes\n\u2022 Proceso de trabajo\n\u2022 Agendar llamada\n\n\u00bfQu\u00e9 te interesa?',
  },
  en: {
    services:'Our 7 services:\n\n1. Multi-Agent Chatbot \u2014 $4,999/mo\n2. Process Automation \u2014 $2,999/project\n3. AI Content \u2014 $3,499/mo\n4. Financial Dashboard \u2014 $5,999/project\n5. CV Screening \u2014 $1,999/process\n6. Client Portal \u2014 $4,499/project\n7. Agent Orchestration \u2014 $7,999/project\n\nWhich interests you?',
    pricing:'Bundles:\n\n\u2022 Starter: $7,999/mo \u2014 Chatbot + Automation\n\u2022 Growth: $12,999/mo \u2014 4 solutions\n\u2022 Enterprise: Custom\n\nAll include 30 days support.',
    process:'4-step process:\n\n1. Free Diagnosis (30 min)\n2. Custom Proposal (48h)\n3. Agile Implementation (1-3 weeks)\n4. Ongoing Support',
    contact:'You can:\n\n\u2022 Email: christianescamilla15@gmail.com\n\u2022 WhatsApp: wa.me/525579605324\n\u2022 Scroll down to the contact form\n\nNo commitment.',
    nexus:'NexusForge AI: 22 agents, 6 swarm topologies, self-healing, RAG pipeline, 247 tests. Terraform + K8s. $7,999/project.',
    time:'Typical implementation: 1-3 weeks in agile sprints.',
    guarantee:'Full refund within 30 days if not satisfied.',
    stack:'Stack: Claude API, GPT-4o, React, Python, Node.js, FastAPI, Make.com, n8n, Terraform, Kubernetes, Docker, PostgreSQL, Redis.',
    chatbot:'Multi-Agent Chatbot: 5 specialized AI agents, 80% resolution, WhatsApp/Web/Telegram. $4,999/mo.',
    automation:'Automation: connect CRM, email, billing with Make.com & n8n. $2,999/project.',
    content:'AI Content: copy for 4 platforms, DALL-E 3, editorial calendar. $3,499/mo. 90% faster.',
    finance:'Financial Dashboard: anomaly detection, cashflow, financial chatbot. $5,999/project.',
    hr:'HR Scout: scoring 0-100, synonym matching, skill heatmap. $1,999/process.',
    portal:'No-Code Portal: tickets, invoices, docs, AI assistant. $4,499/project.',
    roi:'ROI from day one. Our solutions pay for themselves.',
    whatsapp:'WhatsApp: wa.me/525579605324',
    email:'Email: christianescamilla15@gmail.com',
    default:'I can help with:\n\u2022 Our 7 AI services\n\u2022 Pricing & bundles\n\u2022 Work process\n\u2022 Schedule a call\n\nWhat interests you?',
  },
}

/* ====== GLOBAL STYLES ====== */
const globalCSS = `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-padding-top:80px}
body{font-family:'DM Sans',sans-serif;background:#0A0B0F;color:#E2E8F0;line-height:1.6;overflow-x:hidden}
h1,h2,h3,h4,h5,h6{font-family:'Syne',sans-serif}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
button{cursor:pointer;font-family:'DM Sans',sans-serif}
input,textarea{font-family:'DM Sans',sans-serif}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:#0A0B0F}
::-webkit-scrollbar-thumb{background:#6366F1;border-radius:3px}
::selection{background:rgba(99,102,241,0.3);color:#fff}

/* Scroll progress bar */
#scroll-progress{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#6366F1,#10B981,#8B5CF6);z-index:9999;transition:none;transform-origin:left}

/* Film grain */
.film-grain{position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:0.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Custom cursor */
@media(hover:hover){
  .cursor-ring{position:fixed;width:40px;height:40px;border:2px solid rgba(99,102,241,0.5);border-radius:50%;pointer-events:none;z-index:99999;transition:transform 0.15s ease,opacity 0.15s ease;transform:translate(-50%,-50%)}
  .cursor-dot{position:fixed;width:6px;height:6px;background:#6366F1;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%)}
}

@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

@media(max-width:768px){
  .nav-desktop{display:none!important}
  .nav-hamburger{display:block!important}
  .nav-lang-mobile{display:flex!important}
  .floating-cta{display:none!important}
  .demo-hscroll{overflow-x:auto!important;scroll-snap-type:x mandatory}
  .demo-hscroll>*{scroll-snap-align:start;min-width:85vw!important}
  .cursor-ring,.cursor-dot{display:none!important}
}
@media(min-width:769px){
  .nav-mobile-menu{display:none!important}
  .nav-mobile-controls .nav-lang-mobile{display:none!important}
}
`

/* ====== TECH STACK ====== */
const techStack = ['Claude API','GPT-4o','Groq API','Make.com','n8n','Zapier','Airtable','Softr','DALL-E 3','React','Python','Node.js','FastAPI','PostgreSQL','Redis','Docker','Terraform','Kubernetes']

/* ====== SERVICE COLORS ====== */
const svcColors = ['#6366F1','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#F97316']

/* ====== DEMO DATA ====== */
const demoURLs = [
  'https://chatbot-multiagente-ia.vercel.app',
  'https://content-studio-ai-blush.vercel.app',
  'https://finance-ai-dashboard-omega.vercel.app',
  'https://hr-scout-llm.vercel.app',
  'https://client-hub-nocode.vercel.app',
  'https://client-hub-nocode.vercel.app',
  'https://frontend-silk-three-66.vercel.app',
]

/* ====== MOTION VARIANTS ====== */
const fadeUp = { hidden:{opacity:0,y:60}, visible:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }
const fadeIn = { hidden:{opacity:0}, visible:{opacity:1,transition:{duration:0.6}} }
const stagger = { visible:{transition:{staggerChildren:0.12}} }

/* ====== SECTION WRAPPER ====== */
function Section({ children, id, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref} id={id} className={className}
      initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
      style={{ padding: '100px 0', ...style }}
    >
      {children}
    </motion.section>
  )
}

function Container({ children, style }) {
  return <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', width:'100%', ...style }}>{children}</div>
}

function Badge({ children, color = '#6366F1' }) {
  return (
    <motion.div variants={fadeUp} style={{
      display:'inline-block',padding:'6px 16px',borderRadius:999,fontSize:'0.8rem',fontWeight:600,
      letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:16,
      background:`${color}18`,border:`1px solid ${color}40`,color:color,
    }}>{children}</motion.div>
  )
}

function SectionTitle({ children }) {
  return <motion.h2 variants={fadeUp} style={{ fontFamily:"'Syne',sans-serif",fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,marginBottom:16,color:'#fff' }}>{children}</motion.h2>
}

function SectionSub({ children }) {
  return <motion.p variants={fadeUp} style={{ color:'#94A3B8',fontSize:'1.1rem',maxWidth:600,marginBottom:56 }}>{children}</motion.p>
}

/* ====== ANIMATED COUNTER HOOK ====== */
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => { if (inView) setStarted(true) }, [inView])
  useEffect(() => {
    if (!started) return
    let start = 0
    const inc = end / (duration / 16)
    const timer = setInterval(() => {
      start += inc
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])
  return { count, ref }
}

/* ====== SVG ICONS ====== */
const I = {
  chat: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r="1" fill="#6366F1"/><circle cx="15" cy="10" r="1" fill="#6366F1"/></svg>,
  auto: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>,
  pen: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  fin: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  hr: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  portal: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></svg>,
  orch: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3M8.5 17.5L10.5 13M15.5 17.5L13.5 13"/></svg>,
  phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  li: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  gh: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  wa: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  arr: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  ext: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  clock: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  users: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  chart: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chev: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  quote: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  star: <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
}
const svcIcons = [I.chat, I.auto, I.pen, I.fin, I.hr, I.portal, I.orch]

/* ====== CUSTOM CURSOR ====== */
function CustomCursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return
    const move = (e) => {
      if (ring.current) { ring.current.style.left = e.clientX+'px'; ring.current.style.top = e.clientY+'px' }
      if (dot.current) { dot.current.style.left = e.clientX+'px'; dot.current.style.top = e.clientY+'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <><div ref={ring} className="cursor-ring"/><div ref={dot} className="cursor-dot"/></>
}

/* ====== SCROLL PROGRESS ====== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return <motion.div id="scroll-progress" style={{ scaleX, width: '100%' }} />
}

/* ====== NAVBAR ====== */
function Navbar() {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { label: tr.navServices, href: '#servicios' },{ label: tr.navProcess, href: '#proceso' },
    { label: tr.navDemos, href: '#demos' },{ label: tr.navAbout, href: '#sobre' },
    { label: tr.navContact, href: '#contacto' },
  ]
  const langBtn = (active) => ({
    padding:'6px 12px',border:'none',fontSize:'0.8rem',fontWeight:600,
    background:active?'#6366F1':'transparent',color:active?'#fff':'#94A3B8',cursor:'pointer',transition:'all 0.2s',
  })
  return (
    <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:1000,
      background:scrolled?'rgba(10,11,15,0.92)':'transparent',
      backdropFilter:scrolled?'blur(20px)':'none',
      borderBottom:scrolled?'1px solid rgba(99,102,241,0.12)':'1px solid transparent',
      transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
      <div style={{ maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:72 }}>
        <a href="#" style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'1.3rem',
          background:'linear-gradient(135deg,#6366F1,#10B981)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
          Impulso IA
        </a>
        <ul style={{ display:'flex',gap:32,alignItems:'center',listStyle:'none' }} className="nav-desktop">
          {links.map(l => (
            <li key={l.href}><a href={l.href} style={{ fontSize:'0.9rem',fontWeight:500,color:'#94A3B8',transition:'color 0.2s' }}
              onMouseEnter={e=>e.target.style.color='#6366F1'} onMouseLeave={e=>e.target.style.color='#94A3B8'}>{l.label}</a></li>
          ))}
          <li style={{ display:'flex',borderRadius:8,overflow:'hidden',border:'1px solid rgba(99,102,241,0.3)' }}>
            <button style={langBtn(lang==='es')} onClick={()=>setLang('es')}>ES</button>
            <button style={langBtn(lang==='en')} onClick={()=>setLang('en')}>EN</button>
          </li>
          <li>
            <motion.a href="#contacto" whileHover={{ y:-2,boxShadow:'0 8px 24px rgba(99,102,241,0.3)' }}
              style={{ padding:'10px 24px',borderRadius:8,border:'none',background:'linear-gradient(135deg,#6366F1,#4F46E5)',
                color:'#fff',fontWeight:600,fontSize:'0.9rem',display:'inline-block' }}>{tr.navCta}</motion.a>
          </li>
        </ul>
        <div style={{ display:'flex',alignItems:'center',gap:12 }} className="nav-mobile-controls">
          <div className="nav-lang-mobile" style={{ display:'flex',borderRadius:8,overflow:'hidden',border:'1px solid rgba(99,102,241,0.3)' }}>
            <button style={langBtn(lang==='es')} onClick={()=>setLang('es')}>ES</button>
            <button style={langBtn(lang==='en')} onClick={()=>setLang('en')}>EN</button>
          </div>
          <button className="nav-hamburger" onClick={()=>setMenuOpen(!menuOpen)}
            style={{ background:'none',border:'none',color:'#fff',display:'none' }}>{menuOpen?I.close:I.menu}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="nav-mobile-menu" style={{ background:'rgba(10,11,15,0.98)',padding:24,backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(99,102,241,0.2)' }}>
          {links.map(l => <a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)}
            style={{ display:'block',padding:'12px 0',color:'#CBD5E1',fontSize:'1.1rem',fontWeight:500 }}>{l.label}</a>)}
          <a href="#contacto" onClick={()=>setMenuOpen(false)}
            style={{ padding:'12px 24px',borderRadius:8,background:'linear-gradient(135deg,#6366F1,#4F46E5)',color:'#fff',fontWeight:600,display:'inline-block',marginTop:16 }}>{tr.navCta}</a>
        </div>
      )}
    </nav>
  )
}

/* ====== HERO ====== */
function Hero() {
  const { lang } = useLang()
  const tr = t[lang]
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  return (
    <section ref={ref} style={{ position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:72 }}>
      {/* BG effects */}
      <motion.div style={{ position:'absolute',inset:0,zIndex:0,y,
        background:'radial-gradient(ellipse 80% 60% at 50% 40%,rgba(99,102,241,0.15) 0%,rgba(16,185,129,0.05) 40%,transparent 70%)',
        animation:'gradShift 8s ease infinite',backgroundSize:'200% 200%' }}/>
      <div style={{ position:'absolute',inset:0,zIndex:0,opacity:0.03,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)',backgroundSize:'60px 60px' }}/>
      <div style={{ position:'absolute',width:300,height:300,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%)',top:'10%',right:'5%',animation:'float 6s ease-in-out infinite',zIndex:0 }}/>
      <div style={{ position:'absolute',width:200,height:200,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(16,185,129,0.15),transparent 70%)',bottom:'15%',left:'8%',animation:'float 8s ease-in-out infinite 1s',zIndex:0 }}/>

      <motion.div style={{ maxWidth:1200,margin:'0 auto',padding:'0 24px',width:'100%',position:'relative',zIndex:1,textAlign:'center',opacity }}>
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,ease:EASE }}
          style={{ display:'inline-block',padding:'6px 16px',borderRadius:999,fontSize:'0.8rem',fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:24,
            background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.3)',color:'#818CF8' }}>{tr.heroBadge}</motion.div>

        <h1 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'clamp(2.5rem,7vw,5rem)',lineHeight:1.1,color:'#fff',maxWidth:900,margin:'0 auto 24px' }}>
          <motion.span initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1,ease:EASE}}
            style={{ display:'inline-block',marginRight:16 }}>{tr.heroT1}</motion.span>
          <motion.span initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.25,ease:EASE}}
            style={{ display:'inline-block',marginRight:16,background:'linear-gradient(135deg,#6366F1,#10B981)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{tr.heroT2}</motion.span>
          <motion.span initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.4,ease:EASE}}
            style={{ display:'inline-block',background:'linear-gradient(135deg,#8B5CF6,#6366F1)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{tr.heroT3}</motion.span>
        </h1>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.55,ease:EASE}}
          style={{ fontSize:'clamp(1rem,2vw,1.25rem)',color:'#94A3B8',maxWidth:680,margin:'0 auto 40px',lineHeight:1.7 }}>{tr.heroSub}</motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.7,ease:EASE}}
          style={{ display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap' }}>
          <motion.a href="#contacto" whileHover={{ y:-3,boxShadow:'0 12px 40px rgba(99,102,241,0.45)' }}
            style={{ padding:'16px 36px',borderRadius:12,background:'linear-gradient(135deg,#6366F1,#4F46E5)',color:'#fff',fontWeight:700,fontSize:'1.05rem',
              boxShadow:'0 8px 32px rgba(99,102,241,0.3)',display:'inline-flex',alignItems:'center',gap:8,
              position:'relative',overflow:'hidden' }}>
            <span style={{ position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
              animation:'shimmer 2s infinite',backgroundSize:'200% 100%' }}/>
            <span style={{ position:'relative' }}>{tr.heroCta}</span> {I.arr}
          </motion.a>
          <motion.a href="#servicios" whileHover={{ background:'rgba(99,102,241,0.12)',borderColor:'rgba(99,102,241,0.5)' }}
            style={{ padding:'16px 36px',borderRadius:12,border:'1px solid rgba(99,102,241,0.3)',background:'rgba(99,102,241,0.06)',
              color:'#C7D2FE',fontWeight:600,fontSize:'1.05rem',display:'inline-flex',alignItems:'center',gap:8 }}>{tr.heroCtaSec}</motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.9,ease:EASE}}
          style={{ display:'flex',justifyContent:'center',gap:64,marginTop:72,flexWrap:'wrap' }}>
          {[[tr.hStat1,tr.hStat1L],[tr.hStat2,tr.hStat2L],[tr.hStat3,tr.hStat3L]].map(([num,label],i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'clamp(2rem,3.5vw,2.8rem)',
                background:'linear-gradient(135deg,#6366F1,#10B981)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{num}</div>
              <div style={{ fontSize:'0.9rem',color:'#64748B',marginTop:4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ====== TRUST SIGNALS ====== */
function TrustSignals() {
  const { lang } = useLang(); const tr = t[lang]
  const counters = [
    { end:18,suffix:'',label:tr.trust1,color:'#6366F1' },{ end:32,suffix:'',label:tr.trust2,color:'#10B981' },
    { end:1346,suffix:'+',label:tr.trust3,color:'#F59E0B' },{ end:7,suffix:'',label:tr.trust4,color:'#8B5CF6' },
  ]
  return (
    <Section style={{ padding:'80px 0',background:'linear-gradient(180deg,#0A0B0F,#0F1017)' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:48 }}>
          <Badge>{tr.trustBadge}</Badge><SectionTitle>{tr.trustTitle}</SectionTitle>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:24 }}>
          {counters.map((c,i) => <CounterCard key={i} {...c} delay={i*100}/>)}
        </div>
      </Container>
    </Section>
  )
}

function CounterCard({ end, suffix, label, color }) {
  const { count, ref } = useCountUp(end, 1500)
  return (
    <motion.div ref={ref} variants={fadeUp} whileHover={{ y:-6, borderColor:color+'60' }}
      style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'32px 24px',textAlign:'center',transition:'border-color 0.3s' }}>
      <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'2.8rem',
        background:`linear-gradient(135deg,${color},${color}AA)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8 }}>{count}{suffix}</div>
      <div style={{ fontSize:'0.95rem',color:'#CBD5E1',fontWeight:500 }}>{label}</div>
    </motion.div>
  )
}

/* ====== PAIN POINTS ====== */
function PainPoints() {
  const { lang } = useLang(); const tr = t[lang]
  const pains = [{ icon:I.clock,title:tr.pain1,color:'#EF4444' },{ icon:I.users,title:tr.pain2,color:'#F59E0B' },{ icon:I.chart,title:tr.pain3,color:'#8B5CF6' }]
  return (
    <Section style={{ background:'linear-gradient(180deg,#0A0B0F,#0F1017)' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <Badge color="#EF4444">{tr.painBadge}</Badge><SectionTitle>{tr.painTitle}</SectionTitle>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24 }}>
          {pains.map((p,i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y:-6,borderColor:p.color+'40' }}
              style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:32,textAlign:'center' }}>
              <div style={{ marginBottom:20,display:'inline-block' }}>{p.icon}</div>
              <h3 style={{ fontSize:'1.15rem',fontWeight:600,color:'#E2E8F0',lineHeight:1.4 }}>{p.title}</h3>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ====== SERVICES — FULL-SCREEN CARDS ====== */
function Services() {
  const { lang } = useLang(); const tr = t[lang]
  const svcs = [
    { t:tr.s1T,p:tr.s1P,d:tr.s1D,b:tr.s1B,demo:demoURLs[0] },
    { t:tr.s2T,p:tr.s2P,d:tr.s2D,b:tr.s2B,demo:null },
    { t:tr.s3T,p:tr.s3P,d:tr.s3D,b:tr.s3B,demo:demoURLs[1] },
    { t:tr.s4T,p:tr.s4P,d:tr.s4D,b:tr.s4B,demo:demoURLs[2] },
    { t:tr.s5T,p:tr.s5P,d:tr.s5D,b:tr.s5B,demo:demoURLs[3] },
    { t:tr.s6T,p:tr.s6P,d:tr.s6D,b:tr.s6B,demo:demoURLs[4] },
    { t:tr.s7T,p:tr.s7P,d:tr.s7D,b:tr.s7B,demo:demoURLs[6] },
  ]
  return (
    <Section id="servicios" style={{ background:'#0A0B0F' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <Badge>{tr.svcBadge}</Badge><SectionTitle>{tr.svcTitle}</SectionTitle>
          <SectionSub style={{ margin:'0 auto' }}>{tr.svcSub}</SectionSub>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:24 }}>
          {svcs.map((sv,i) => {
            const color = svcColors[i]
            const W = sv.demo ? 'a' : 'div'
            const wp = sv.demo ? { href:sv.demo,target:'_blank',rel:'noopener noreferrer' } : {}
            return (
              <motion.div key={i} variants={fadeUp} whileHover={{ y:-8,borderColor:color+'50' }}
                style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))',
                  border:'1px solid rgba(255,255,255,0.06)',borderRadius:20,padding:32,display:'flex',flexDirection:'column',
                  position:'relative',overflow:'hidden',transition:'border-color 0.3s' }}>
                {/* Glow */}
                <div style={{ position:'absolute',top:-40,right:-40,width:120,height:120,borderRadius:'50%',background:`radial-gradient(circle,${color}15,transparent 70%)`,pointerEvents:'none' }}/>
                <div style={{ width:56,height:56,borderRadius:14,background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20 }}>
                  {React.cloneElement(svcIcons[i], { stroke: color })}
                </div>
                <h3 style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'1.25rem',color:'#fff',marginBottom:8 }}>{sv.t}</h3>
                <p style={{ color:'#94A3B8',fontSize:'0.93rem',lineHeight:1.6,marginBottom:16 }}>{sv.d}</p>
                <ul style={{ listStyle:'none',marginBottom:20,flex:1 }}>
                  {sv.b.map((bullet,bi) => (
                    <li key={bi} style={{ display:'flex',alignItems:'center',gap:8,marginBottom:8,color:'#CBD5E1',fontSize:'0.88rem' }}>
                      {I.check} {bullet}
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:16,borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'1.15rem',
                    background:`linear-gradient(135deg,${color},${color}CC)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{tr.svcFrom} {sv.p}</span>
                  <W {...wp} style={{ padding:'10px 20px',borderRadius:10,background:`${color}18`,color:color,fontSize:'0.85rem',fontWeight:700,
                    display:'flex',alignItems:'center',gap:6,textDecoration:'none',position:'relative',overflow:'hidden',border:'none',cursor:'pointer' }}>
                    <span style={{ position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)',animation:'shimmer 2.5s infinite',backgroundSize:'200% 100%' }}/>
                    <span style={{ position:'relative' }}>{tr.svcReq}</span> {I.arr}
                  </W>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ====== PROCESS — TIMELINE ====== */
function Process() {
  const { lang } = useLang(); const tr = t[lang]
  const steps = [{ n:'01',t:tr.st1T,d:tr.st1D,icon:'🔍' },{ n:'02',t:tr.st2T,d:tr.st2D,icon:'🎨' },{ n:'03',t:tr.st3T,d:tr.st3D,icon:'⚡' },{ n:'04',t:tr.st4T,d:tr.st4D,icon:'🚀' }]
  return (
    <Section id="proceso" style={{ background:'linear-gradient(180deg,#0F1017,#0A0B0F)' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:64 }}>
          <Badge color="#10B981">{tr.procBadge}</Badge><SectionTitle>{tr.procTitle}</SectionTitle>
          <SectionSub style={{ margin:'0 auto' }}>{tr.procSub}</SectionSub>
        </div>
        <div style={{ position:'relative',maxWidth:700,margin:'0 auto' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute',left:28,top:0,bottom:0,width:2,background:'linear-gradient(180deg,#6366F1,#10B981)',opacity:0.3 }}/>
          {steps.map((st,i) => (
            <motion.div key={i} variants={fadeUp} style={{ display:'flex',gap:32,marginBottom:i<3?48:0,position:'relative' }}>
              {/* Dot */}
              <div style={{ width:58,height:58,borderRadius:'50%',background:'rgba(99,102,241,0.1)',border:'2px solid #6366F1',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0,position:'relative',zIndex:1 }}>{st.icon}</div>
              <motion.div whileHover={{ x:4 }} style={{ flex:1,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',
                borderRadius:16,padding:'24px 28px',transition:'border-color 0.3s' }}>
                <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'0.8rem',color:'#6366F140',letterSpacing:'0.1em' }}>{st.n}</span>
                <h3 style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'1.2rem',color:'#fff',margin:'4px 0 8px' }}>{st.t}</h3>
                <p style={{ color:'#94A3B8',fontSize:'0.93rem',lineHeight:1.6 }}>{st.d}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ====== DEMOS — HORIZONTAL SCROLL ====== */
function Demos() {
  const { lang } = useLang(); const tr = t[lang]
  const demos = [
    { t:tr.d1T,m:tr.d1M,c:'#6366F1' },{ t:tr.d2T,m:tr.d2M,c:'#10B981' },{ t:tr.d3T,m:tr.d3M,c:'#F59E0B' },
    { t:tr.d4T,m:tr.d4M,c:'#EF4444' },{ t:tr.d5T,m:tr.d5M,c:'#8B5CF6' },{ t:tr.d6T,m:tr.d6M,c:'#EC4899' },{ t:tr.d7T,m:tr.d7M,c:'#F97316' },
  ]
  return (
    <Section id="demos" style={{ background:'#0A0B0F' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:48 }}>
          <Badge>{tr.demoBadge}</Badge><SectionTitle>{tr.demoTitle}</SectionTitle>
          <SectionSub style={{ margin:'0 auto' }}>{tr.demoSub}</SectionSub>
        </div>
      </Container>
      {/* Horizontal scroll container */}
      <div className="demo-hscroll" style={{ display:'flex',gap:24,padding:'0 max(24px,calc((100vw - 1200px)/2))',overflowX:'auto',scrollbarWidth:'none',WebkitOverflowScrolling:'touch',paddingBottom:8 }}>
        {demos.map((d,i) => (
          <motion.a key={i} href={demoURLs[i]} target="_blank" rel="noopener noreferrer" variants={fadeUp}
            whileHover={{ y:-8,borderColor:d.c+'60' }}
            style={{ minWidth:380,flex:'0 0 380px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:20,overflow:'hidden',textDecoration:'none',display:'block',transition:'border-color 0.3s' }}>
            {/* Browser mockup */}
            <div style={{ height:180,background:`linear-gradient(135deg,${d.c}12,${d.c}05)`,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',
              borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ position:'absolute',top:0,left:0,right:0,height:32,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',padding:'0 12px',gap:6 }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:'#EF4444' }}/>
                <div style={{ width:8,height:8,borderRadius:'50%',background:'#F59E0B' }}/>
                <div style={{ width:8,height:8,borderRadius:'50%',background:'#10B981' }}/>
                <div style={{ flex:1,height:18,borderRadius:6,background:'rgba(255,255,255,0.08)',marginLeft:8,fontSize:'0.65rem',color:'#64748B',
                  display:'flex',alignItems:'center',paddingLeft:8 }}>{demoURLs[i].replace('https://','')}</div>
              </div>
              <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'1.5rem',color:d.c,opacity:0.5 }}>{d.t.split(' ')[0]}</span>
            </div>
            {/* Metrics */}
            <div style={{ display:'flex',gap:8,padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,0.04)',flexWrap:'wrap' }}>
              {d.m.map((m,mi) => (
                <span key={mi} style={{ padding:'4px 10px',borderRadius:6,background:d.c+'12',color:d.c,fontSize:'0.75rem',fontWeight:600 }}>{m}</span>
              ))}
            </div>
            <div style={{ padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <h3 style={{ fontWeight:600,fontSize:'1rem',color:'#E2E8F0' }}>{d.t}</h3>
              <span style={{ padding:'10px 20px',borderRadius:10,background:d.c+'18',color:d.c,fontSize:'0.85rem',fontWeight:700,
                display:'flex',alignItems:'center',gap:6,position:'relative',overflow:'hidden' }}>
                <span style={{ position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)',animation:'shimmer 2.5s infinite',backgroundSize:'200% 100%' }}/>
                <span style={{ position:'relative' }}>{tr.demoCta}</span> {I.ext}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}

/* ====== TECH STACK ====== */
function TechStackSection() {
  const { lang } = useLang(); const tr = t[lang]
  return (
    <Section style={{ background:'linear-gradient(180deg,#0F1017,#0A0B0F)' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:48 }}>
          <Badge color="#10B981">{tr.techBadge}</Badge><SectionTitle>{tr.techTitle}</SectionTitle>
        </div>
        <motion.div variants={stagger} style={{ display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center' }}>
          {techStack.map((tech,i) => (
            <motion.span key={i} variants={fadeUp} whileHover={{ borderColor:'#6366F180',background:'rgba(99,102,241,0.08)',color:'#C7D2FE',y:-2 }}
              style={{ padding:'12px 24px',borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
                color:'#CBD5E1',fontSize:'0.95rem',fontWeight:500,transition:'all 0.3s' }}>{tech}</motion.span>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

/* ====== ABOUT ====== */
function About() {
  const { lang } = useLang(); const tr = t[lang]
  return (
    <Section id="sobre" style={{ background:'#0A0B0F' }}>
      <Container style={{ maxWidth:900 }}>
        <div style={{ textAlign:'center',marginBottom:48 }}>
          <Badge>{tr.aboutBadge}</Badge><SectionTitle>{tr.aboutName}</SectionTitle>
        </div>
        <motion.div variants={fadeUp} style={{ display:'flex',gap:40,alignItems:'center',flexWrap:'wrap',justifyContent:'center' }}>
          <motion.div whileHover={{ scale:1.05,rotate:2 }} transition={{ type:'spring',stiffness:300 }}
            style={{ width:180,height:180,borderRadius:'50%',background:'linear-gradient(135deg,#6366F1,#10B981)',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.8rem',color:'#fff',fontFamily:"'Syne',sans-serif",fontWeight:800,flexShrink:0 }}>CH</motion.div>
          <div style={{ flex:1,minWidth:280 }}>
            <p style={{ color:'#CBD5E1',fontSize:'1.05rem',lineHeight:1.8,marginBottom:24 }}>{tr.aboutBio}</p>
            <div style={{ display:'flex',gap:16,flexWrap:'wrap' }}>
              {[tr.aboutTag1,tr.aboutTag2,tr.aboutTag3].map((tag,i) => (
                <div key={i} style={{ display:'flex',alignItems:'center',gap:8,color:'#94A3B8',fontSize:'0.9rem' }}>{I.check} {tag}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ====== RESULTS ====== */
function Results() {
  const { lang } = useLang(); const tr = t[lang]
  const results = [{ m:tr.r1M,l:tr.r1L,d:tr.r1D },{ m:tr.r2M,l:tr.r2L,d:tr.r2D },{ m:tr.r3M,l:tr.r3L,d:tr.r3D },{ m:tr.r4M,l:tr.r4L,d:tr.r4D },{ m:tr.r5M,l:tr.r5L,d:tr.r5D }]
  return (
    <Section style={{ background:'linear-gradient(180deg,#0F1017,#0A0B0F)' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <Badge color="#10B981">{tr.resBadge}</Badge><SectionTitle>{tr.resTitle}</SectionTitle>
          <SectionSub style={{ margin:'0 auto' }}>{tr.resSub}</SectionSub>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20 }}>
          {results.map((r,i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y:-6,borderColor:'rgba(16,185,129,0.4)' }}
              style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px 24px',textAlign:'center' }}>
              <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'2.2rem',
                background:'linear-gradient(135deg,#10B981,#6366F1)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:4 }}>{r.m}</div>
              <div style={{ fontSize:'0.9rem',fontWeight:600,color:'#E2E8F0',marginBottom:8 }}>{r.l}</div>
              <div style={{ fontSize:'0.8rem',color:'#64748B',lineHeight:1.5 }}>{r.d}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ====== TESTIMONIALS ====== */
function Testimonials() {
  const { lang } = useLang(); const tr = t[lang]
  const tsts = [{ text:tr.t1,author:tr.t1A,role:tr.t1R,color:'#6366F1' },{ text:tr.t2,author:tr.t2A,role:tr.t2R,color:'#10B981' },{ text:tr.t3,author:tr.t3A,role:tr.t3R,color:'#F59E0B' }]
  return (
    <Section style={{ background:'#0A0B0F' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <Badge>{tr.testBadge}</Badge><SectionTitle>{tr.testTitle}</SectionTitle>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24 }}>
          {tsts.map((ts,i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y:-6,borderColor:ts.color+'40' }}
              style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:32,
                display:'flex',flexDirection:'column',backdropFilter:'blur(8px)' }}>
              <div style={{ marginBottom:16,opacity:0.5 }}>{I.quote}</div>
              <div style={{ display:'flex',gap:4,marginBottom:16 }}>{[...Array(5)].map((_,si) => <span key={si}>{I.star}</span>)}</div>
              <p style={{ color:'#CBD5E1',fontSize:'1rem',lineHeight:1.7,flex:1,marginBottom:24,fontStyle:'italic' }}>{ts.text}</p>
              <div style={{ display:'flex',alignItems:'center',gap:12,borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:20 }}>
                <div style={{ width:44,height:44,borderRadius:'50%',background:`linear-gradient(135deg,${ts.color},${ts.color}88)`,
                  display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'0.9rem' }}>
                  {ts.author.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <div style={{ color:'#fff',fontWeight:600,fontSize:'0.95rem' }}>{ts.author}</div>
                  <div style={{ color:'#64748B',fontSize:'0.85rem' }}>{ts.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ====== FAQ ====== */
function FAQ() {
  const { lang } = useLang(); const tr = t[lang]
  const [openIdx, setOpenIdx] = useState(null)
  const faqs = [{ q:tr.f1Q,a:tr.f1A },{ q:tr.f2Q,a:tr.f2A },{ q:tr.f3Q,a:tr.f3A },{ q:tr.f4Q,a:tr.f4A },{ q:tr.f5Q,a:tr.f5A },{ q:tr.f6Q,a:tr.f6A }]
  return (
    <Section style={{ background:'linear-gradient(180deg,#0F1017,#0A0B0F)' }}>
      <Container style={{ maxWidth:800 }}>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <Badge>{tr.faqBadge}</Badge><SectionTitle>{tr.faqTitle}</SectionTitle>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
          {faqs.map((faq,i) => (
            <motion.div key={i} variants={fadeUp} style={{ background:'rgba(255,255,255,0.03)',border:'1px solid',
              borderColor:openIdx===i?'rgba(99,102,241,0.3)':'rgba(255,255,255,0.06)',borderRadius:12,overflow:'hidden',transition:'border-color 0.3s' }}>
              <button onClick={()=>setOpenIdx(openIdx===i?null:i)}
                style={{ width:'100%',padding:'20px 24px',background:'none',border:'none',color:'#E2E8F0',fontSize:'1.05rem',fontWeight:600,
                  display:'flex',alignItems:'center',justifyContent:'space-between',textAlign:'left',cursor:'pointer' }}>
                {faq.q}
                <span style={{ transform:openIdx===i?'rotate(180deg)':'rotate(0)',transition:'transform 0.3s',flexShrink:0,marginLeft:16 }}>{I.chev}</span>
              </button>
              <AnimatePresence>
                {openIdx===i && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3,ease:EASE}}
                    style={{ overflow:'hidden' }}>
                    <div style={{ padding:'0 24px 20px',color:'#94A3B8',fontSize:'0.95rem',lineHeight:1.7 }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ====== CONTACT ====== */
function Contact() {
  const { lang } = useLang(); const tr = t[lang]
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(()=>setSubmitted(false),4000) }
  const inp = { width:'100%',padding:'14px 18px',borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',
    color:'#E2E8F0',fontSize:'1rem',outline:'none',transition:'border-color 0.3s' }
  return (
    <Section id="contacto" style={{ background:'linear-gradient(180deg,#0F1017,#0A0B0F)' }}>
      <Container>
        <div style={{ textAlign:'center',marginBottom:56 }}>
          <Badge>{tr.ctBadge}</Badge>
          <SectionTitle>
            {tr.ctTitle}<span style={{ background:'linear-gradient(135deg,#6366F1,#10B981)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{tr.ctHL}</span>
          </SectionTitle>
          <SectionSub style={{ margin:'0 auto' }}>{tr.ctSub}</SectionSub>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:48,maxWidth:900,margin:'0 auto' }}>
          <motion.form variants={fadeUp} onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <input type="text" placeholder={tr.ctName} required style={inp} onFocus={e=>e.target.style.borderColor='#6366F1'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
            <input type="email" placeholder={tr.ctEmail} required style={inp} onFocus={e=>e.target.style.borderColor='#6366F1'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
            <input type="text" placeholder={tr.ctCompany} style={inp} onFocus={e=>e.target.style.borderColor='#6366F1'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
            <textarea placeholder={tr.ctMsg} rows={4} required style={{ ...inp,resize:'vertical',minHeight:100 }} onFocus={e=>e.target.style.borderColor='#6366F1'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
            <motion.button type="submit" whileHover={{ y:-2,boxShadow:'0 12px 40px rgba(99,102,241,0.4)' }} whileTap={{ scale:0.98 }}
              style={{ padding:'16px 36px',borderRadius:12,border:'none',
                background:submitted?'linear-gradient(135deg,#10B981,#059669)':'linear-gradient(135deg,#6366F1,#4F46E5)',
                color:'#fff',fontWeight:700,fontSize:'1.05rem',boxShadow:'0 8px 32px rgba(99,102,241,0.3)',position:'relative',overflow:'hidden' }}>
              <span style={{ position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',animation:'shimmer 2s infinite',backgroundSize:'200% 100%' }}/>
              <span style={{ position:'relative' }}>{submitted?tr.ctSent:tr.ctSubmit}</span>
            </motion.button>
          </motion.form>
          <motion.div variants={fadeUp} style={{ display:'flex',flexDirection:'column',gap:24,justifyContent:'center' }}>
            <div style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:24 }}>
              <h4 style={{ color:'#fff',fontWeight:600,marginBottom:16,fontSize:'1.05rem' }}>{tr.ctDirect}</h4>
              <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                <a href="mailto:christianescamilla15@gmail.com" style={{ display:'flex',alignItems:'center',gap:12,color:'#CBD5E1',fontSize:'0.95rem' }}>
                  {I.mail} christianescamilla15@gmail.com</a>
                <a href="https://wa.me/525579605324" target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:12,color:'#CBD5E1',fontSize:'0.95rem' }}>
                  {I.wa} +52 55 7960 5324</a>
              </div>
            </div>
            <div style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:24 }}>
              <h4 style={{ color:'#fff',fontWeight:600,marginBottom:16,fontSize:'1.05rem' }}>{tr.ctSocial}</h4>
              <div style={{ display:'flex',gap:16 }}>
                {[
                  { icon:I.li,href:'https://linkedin.com/in/christianhernandez-ia' },
                  { icon:I.gh,href:'https://github.com/christianescamilla15-cell' },
                ].map((s,i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ background:'rgba(99,102,241,0.2)',y:-2 }}
                    style={{ width:48,height:48,borderRadius:12,background:'rgba(99,102,241,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#818CF8' }}>
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

/* ====== FOOTER ====== */
function Footer() {
  const { lang } = useLang(); const tr = t[lang]
  return (
    <footer style={{ padding:'32px 0',borderTop:'1px solid rgba(255,255,255,0.06)',background:'#0A0B0F' }}>
      <Container style={{ textAlign:'center' }}>
        <p style={{ color:'#64748B',fontSize:'0.9rem' }}>{tr.footer}</p>
      </Container>
    </footer>
  )
}

/* ====== FLOATING CTA ====== */
function FloatingCTA() {
  const { lang } = useLang(); const tr = t[lang]
  const [vis, setVis] = useState(false)
  useEffect(() => { const fn = () => setVis(window.scrollY>400); window.addEventListener('scroll',fn); return ()=>window.removeEventListener('scroll',fn) }, [])
  if (!vis) return null
  return (
    <motion.a href="#contacto" className="floating-cta" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      whileHover={{ y:-2,boxShadow:'0 12px 40px rgba(99,102,241,0.5)' }}
      style={{ position:'fixed',bottom:90,right:24,zIndex:998,padding:'12px 24px',borderRadius:12,
        background:'linear-gradient(135deg,#6366F1,#4F46E5)',color:'#fff',fontWeight:700,fontSize:'0.9rem',
        boxShadow:'0 8px 32px rgba(99,102,241,0.4)',display:'flex',alignItems:'center',gap:8,textDecoration:'none' }}>
      {I.phone} {tr.floatCta}
    </motion.a>
  )
}

/* ====== CHATBOT ====== */
function Chatbot() {
  const { lang } = useLang(); const tr = t[lang]; const kb = chatKB[lang]
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => { if (open && msgs.length===0) setMsgs([{ from:'bot',text:tr.chatWelcome }]) }, [open])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs])

  const respond = (msg) => {
    const l = msg.toLowerCase()
    if (l.includes('servicio')||l.includes('service')||l.includes('ofrecen')||l.includes('offer')) return kb.services
    if (l.includes('precio')||l.includes('cost')||l.includes('pricing')||l.includes('paquete')||l.includes('bundle')||l.includes('cu\u00e1nto cuesta')) return kb.pricing
    if (l.includes('proceso')||l.includes('process')||l.includes('c\u00f3mo trabaj')||l.includes('how do you work')||l.includes('paso')) return kb.process
    if (l.includes('contacto')||l.includes('contact')||l.includes('agenda')||l.includes('schedule')||l.includes('llamada')||l.includes('call')) return kb.contact
    if (l.includes('nexusforge')||l.includes('orquestaci')||l.includes('orchestrat')||l.includes('enjambre')||l.includes('swarm')) return kb.nexus
    if (l.includes('tiempo')||l.includes('time')||l.includes('tarda')||l.includes('how long')||l.includes('implementa')) return kb.time
    if (l.includes('garant')||l.includes('refund')||l.includes('reembolso')||l.includes('guarantee')) return kb.guarantee
    if (l.includes('stack')||l.includes('tecnolog')||l.includes('tech')) return kb.stack
    if (l.includes('chatbot')||l.includes('multiagente')||l.includes('multi-agent')) return kb.chatbot
    if (l.includes('automatiz')||l.includes('automat')) return kb.automation
    if (l.includes('contenido')||l.includes('content')||l.includes('dall')) return kb.content
    if (l.includes('financ')||l.includes('dashboard')||l.includes('anomal')) return kb.finance
    if (l.includes('cv')||l.includes('hr')||l.includes('recurso')||l.includes('resume')||l.includes('filtrad')) return kb.hr
    if (l.includes('portal')||l.includes('no-code')||l.includes('nocode')||l.includes('cliente')) return kb.portal
    if (l.includes('roi')||l.includes('retorno')||l.includes('return')) return kb.roi
    if (l.includes('whatsapp')||l.includes('wha')) return kb.whatsapp
    if (l.includes('email')||l.includes('correo')||l.includes('mail')) return kb.email
    return kb.default
  }

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setMsgs(p => [...p, { from:'user',text:msg }])
    setInput('')
    setTimeout(() => setMsgs(p => [...p, { from:'bot',text:respond(msg) }]), 500)
  }

  const quicks = [
    { label:tr.cQ1,msg:lang==='es'?'Qu\u00e9 servicios ofrecen?':'What services do you offer?' },
    { label:tr.cQ2,msg:lang==='es'?'Cu\u00e1les son los precios?':'What are your prices?' },
    { label:tr.cQ3,msg:lang==='es'?'Cu\u00e1l es el proceso?':'What is the process?' },
    { label:tr.cQ4,msg:lang==='es'?'Quiero contactarlos':'I want to contact you' },
  ]

  return (
    <>
      <motion.button onClick={()=>setOpen(!open)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
        style={{ position:'fixed',bottom:24,right:24,zIndex:1001,width:60,height:60,borderRadius:'50%',
          background:'linear-gradient(135deg,#6366F1,#4F46E5)',border:'none',color:'#fff',
          boxShadow:'0 8px 32px rgba(99,102,241,0.4)',display:'flex',alignItems:'center',justifyContent:'center' }}>
        {open ? I.close : I.chat}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:20,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:0.95}}
            transition={{ duration:0.3,ease:EASE }}
            style={{ position:'fixed',bottom:96,right:24,zIndex:1001,width:380,maxHeight:520,
              background:'#12131A',border:'1px solid rgba(99,102,241,0.2)',borderRadius:20,overflow:'hidden',
              display:'flex',flexDirection:'column',boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
            {/* Header */}
            <div style={{ padding:'16px 20px',background:'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(16,185,129,0.1))',
              borderBottom:'1px solid rgba(99,102,241,0.2)',display:'flex',alignItems:'center',gap:10 }}>
              <div style={{ width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#6366F1,#10B981)',
                display:'flex',alignItems:'center',justifyContent:'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight:700,fontSize:'0.9rem',color:'#fff' }}>{tr.chatTitle}</div>
                <div style={{ fontSize:'0.7rem',color:'#10B981',display:'flex',alignItems:'center',gap:4 }}>
                  <span style={{ width:6,height:6,borderRadius:'50%',background:'#10B981',display:'inline-block' }}/> Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex:1,overflowY:'auto',padding:16,minHeight:250,maxHeight:320,display:'flex',flexDirection:'column',gap:12 }}>
              {msgs.map((msg,i) => (
                <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.2}}
                  style={{ alignSelf:msg.from==='user'?'flex-end':'flex-start',maxWidth:'85%',padding:'10px 14px',borderRadius:12,
                    background:msg.from==='user'?'linear-gradient(135deg,#6366F1,#4F46E5)':'rgba(255,255,255,0.06)',
                    color:msg.from==='user'?'#fff':'#CBD5E1',fontSize:'0.88rem',lineHeight:1.5,whiteSpace:'pre-line' }}>
                  {msg.text}
                </motion.div>
              ))}
              <div ref={endRef}/>
            </div>

            {/* Quick actions */}
            {msgs.length <= 1 && (
              <div style={{ padding:'8px 16px',display:'flex',gap:6,flexWrap:'wrap',borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                {quicks.map((q,i) => (
                  <motion.button key={i} onClick={()=>send(q.msg)} whileHover={{ background:'rgba(99,102,241,0.2)' }}
                    style={{ padding:'6px 12px',borderRadius:8,background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.3)',
                      color:'#818CF8',fontSize:'0.78rem',fontWeight:600,cursor:'pointer' }}>{q.label}</motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',gap:8 }}>
              <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
                placeholder={tr.chatPH}
                style={{ flex:1,padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',
                  color:'#E2E8F0',fontSize:'0.9rem',outline:'none' }}/>
              <motion.button onClick={()=>send()} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{ padding:'10px 16px',borderRadius:8,border:'none',background:'linear-gradient(135deg,#6366F1,#4F46E5)',color:'#fff' }}>
                {I.send}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ====== APP ====== */
export default function App() {
  const [lang, setLang] = useState('es')

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <style>{globalCSS}</style>
      <ScrollProgress />
      <div className="film-grain" />
      <CustomCursor />
      <Navbar />
      <Hero />
      <TrustSignals />
      <PainPoints />
      <Services />
      <Process />
      <Demos />
      <TechStackSection />
      <About />
      <Results />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingCTA />
      <Chatbot />
    </LangContext.Provider>
  )
}
