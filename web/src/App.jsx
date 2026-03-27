import React, { useEffect, useRef, useState, createContext, useContext } from 'react'

/* ───────────────── Language Context ───────────────── */
const LangContext = createContext({ lang: 'es', setLang: () => {} })
const useLang = () => useContext(LangContext)

/* ───────────────── Translations ───────────────── */
const t = {
  es: {
    // Nav
    navServices: 'Servicios',
    navProcess: 'Proceso',
    navDemos: 'Demos',
    navAbout: 'Sobre mí',
    navContact: 'Contacto',
    navCta: 'Agenda tu llamada',
    // Hero
    heroBadge: 'IA & Automatización para empresas',
    heroTitle1: 'Tu negocio merece trabajar ',
    heroHighlight: 'con IA',
    heroTitle2: ', no contra ella',
    heroSub: 'Implementamos soluciones de Inteligencia Artificial y automatización que reducen costos, aceleran procesos y liberan a tu equipo para lo que realmente importa.',
    heroCta: 'Agenda tu diagnóstico gratis',
    heroCtaSecondary: 'Ver servicios',
    heroMetric1: 'Soluciones en producción',
    heroMetric2: 'Consultas resueltas por IA',
    heroMetric3: 'Horas/semana ahorradas',
    heroMetric4: 'Demos en vivo',
    // Trust signals
    trustBadge: 'Respaldado por resultados',
    trustTitle: 'Números que hablan por nosotros',
    trust1: 'Sistemas IA Entregados',
    trust2: 'Claude Tools en Producción',
    trust3: 'Tests Automatizados',
    trust4: 'Demos en Vivo Disponibles',
    // Pain points
    painBadge: 'El problema',
    painTitle: 'Esto le pasa a tu empresa hoy',
    pain1: 'Tu equipo pierde horas en tareas repetitivas',
    pain2: 'Tus clientes esperan demasiado por respuestas',
    pain3: 'Tomas decisiones sin datos en tiempo real',
    // Services
    servicesBadge: 'Servicios',
    servicesTitle: 'Soluciones que generan resultados',
    servicesSub: 'Cada proyecto se adapta a tus necesidades. Sin contratos largos, con resultados medibles.',
    svcFrom: 'Desde',
    svcDemo: 'Ver demo',
    svcContact: 'Contactar',
    svc1Title: 'Chatbot IA Multiagente',
    svc1Price: '$4,999/mes',
    svc1Desc: 'Atención al cliente 24/7 con agentes especializados que resuelven el 80% de consultas sin intervención humana. Web, WhatsApp y Telegram.',
    svc2Title: 'Automatización de Procesos',
    svc2Price: '$2,999/proyecto',
    svc2Desc: 'Conectamos tu CRM, email, facturación y herramientas en flujos automáticos con Make.com y n8n. Elimina la carga administrativa.',
    svc3Title: 'Generación de Contenido con IA',
    svc3Price: '$3,499/mes',
    svc3Desc: 'Copy para redes sociales, prompts DALL-E 3, paletas visuales y calendario de publicación. 4 plataformas, contenido ilimitado.',
    svc4Title: 'Dashboard Financiero con IA',
    svc4Price: '$5,999/proyecto',
    svc4Desc: 'Detección de anomalías, reconciliación de gastos y proyecciones de flujo de caja. Importa tus datos y obtén insights al instante.',
    svc5Title: 'Filtrado de CVs con IA',
    svc5Price: '$1,999/proceso',
    svc5Desc: 'Evalúa candidatos automáticamente contra tu perfil de puesto. Scoring, ranking y recomendaciones por candidato.',
    svc6Title: 'Portal de Clientes No-Code',
    svc6Price: '$4,499/proyecto',
    svc6Desc: 'Portal completo con proyectos, facturas, tickets y documentos. Sin backend, sin servidor, listo en días.',
    svc7Title: 'Orquestación de Agentes IA',
    svc7Price: '$7,999/proyecto',
    svc7Desc: 'Despliega enjambres de agentes inteligentes que se auto-reparan, colaboran en 6 topologías y procesan datos con pipelines RAG. Infraestructura enterprise con Terraform y Kubernetes.',
    // Process
    processBadge: 'Proceso',
    processTitle: 'Como trabajamos',
    processSub: 'De la idea al resultado en 4 pasos claros.',
    step1Title: 'Diagnóstico Gratis',
    step1Desc: 'Analizamos tus procesos y detectamos oportunidades de automatización (30 min, sin compromiso)',
    step2Title: 'Propuesta a la Medida',
    step2Desc: 'Diseñamos la solución técnica con tiempos, costos y ROI estimado',
    step3Title: 'Implementación Ágil',
    step3Desc: 'Construimos, testeamos y desplegamos en sprints de 1-2 semanas',
    step4Title: 'Soporte Continuo',
    step4Desc: 'Monitoreo, ajustes y capacitación para tu equipo',
    // Demos
    demosBadge: 'Portafolio',
    demosTitle: 'Demos en vivo',
    demosSub: 'Proyectos reales, funcionando ahora mismo. Haz clic y pruébalos.',
    demoCta: 'Probar demo en vivo',
    demo1Title: 'Chatbot Multiagente',
    demo1M1: '5 agentes IA',
    demo1M2: '80% resolución',
    demo1M3: '24/7 disponible',
    demo2Title: 'Content Studio IA',
    demo2M1: '4 plataformas',
    demo2M2: '90% más rápido',
    demo2M3: 'A/B testing',
    demo3Title: 'Finance AI Dashboard',
    demo3M1: 'Detección anomalías',
    demo3M2: 'Proyección cashflow',
    demo3M3: 'Chatbot financiero',
    demo4Title: 'HR Scout LLM',
    demo4M1: 'Scoring 0-100',
    demo4M2: '15 min vs 3 días',
    demo4M3: 'Reporte comparativo',
    demo5Title: 'Client Hub No-Code',
    demo5M1: 'Tickets & facturas',
    demo5M2: 'Documentos seguros',
    demo5M3: 'Asistente IA',
    demo6Title: 'ClientHub Portal',
    demo6M1: 'Portal completo',
    demo6M2: 'Sin backend',
    demo6M3: 'Listo en días',
    demo7Title: 'NexusForge AI',
    demo7M1: '22 agentes IA',
    demo7M2: '6 topologías',
    demo7M3: '231 tests',
    // Tech
    techBadge: 'Tecnologías',
    techTitle: 'Nuestro stack',
    // About
    aboutBadge: 'Sobre mí',
    aboutName: 'Christian Hernandez Escamilla',
    aboutBio: 'Soy Christian Hernández, Ingeniero en Software especializado en IA & Automatización. He diseñado y desplegado 15 sistemas en producción con 861+ tests automatizados, incluyendo chatbots multiagente, dashboards financieros, portales No-Code y NexusForge: una plataforma de orquestación de 22 agentes IA con infraestructura Terraform + Kubernetes. Mi enfoque: traducir necesidades de negocio en soluciones técnicas que generan ROI desde el día uno.',
    aboutTag1: '15 sistemas IA en producción',
    aboutTag2: 'Stack: React, Python, Node.js, Terraform',
    aboutTag3: '861+ tests automatizados',
    // Results
    resultsBadge: 'Resultados reales',
    resultsTitle: 'No prometemos, demostramos',
    resultsSub: 'Cada métrica viene de proyectos reales que puedes probar tú mismo en las demos.',
    res1Metric: '80%',
    res1Label: 'de consultas resueltas sin humanos',
    res1Desc: 'Chatbot multiagente con 5 IAs especializadas, base de conocimiento y árboles de decisión',
    res2Metric: '90%',
    res2Label: 'menos tiempo en producción de contenido',
    res2Desc: 'Generador de copy + visual para 4 plataformas en segundos, no horas',
    res3Metric: '2σ',
    res3Label: 'detección estadística de anomalías',
    res3Desc: 'Z-score sobre transacciones reales con proyecciones por regresión lineal',
    res4Metric: '15 min',
    res4Label: 'vs horas en filtrado de CVs',
    res4Desc: 'Scoring automático, matching por sinónimos y heatmap de cobertura de skills',
    res5Metric: '22',
    res5Label: 'agentes IA orquestados en enjambre',
    res5Desc: '6 topologías de enjambre, auto-reparación, pipeline RAG y 231 tests automatizados con NexusForge',
    // Testimonials
    testimonialsBadge: 'Testimonios',
    testimonialsTitle: 'Lo que dicen nuestros clientes',
    test1: 'Implementamos el chatbot multiagente y resolvemos el 80% de consultas sin intervención humana.',
    test1Author: 'María González',
    test1Role: 'COO @ TechSoluciones',
    test2: 'El dashboard financiero detectó anomalías que nos ahorraron $50K en el primer mes.',
    test2Author: 'Carlos Ruiz',
    test2Role: 'CFO @ DataMex',
    test3: 'Redujimos el tiempo de screening de CVs de 3 días a 15 minutos.',
    test3Author: 'Ana López',
    test3Role: 'HR Director @ TalentPro',
    // FAQ
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Resolvemos tus dudas',
    faq1Q: '¿Cuánto tiempo toma la implementación?',
    faq1A: 'Entre 1 y 3 semanas dependiendo de la complejidad del proyecto. Trabajamos en sprints ágiles para entregarte valor lo antes posible.',
    faq2Q: '¿Necesito conocimientos técnicos?',
    faq2A: 'No, nosotros nos encargamos de todo. Desde el diseño hasta el despliegue y la capacitación de tu equipo.',
    faq3Q: '¿Qué pasa si no me convence?',
    faq3A: 'Ofrecemos reembolso completo en los primeros 30 días. Sin preguntas, sin complicaciones.',
    faq4Q: '¿Puedo ver una demo antes de contratar?',
    faq4A: 'Sí, todas nuestras demos están disponibles en línea. Pruébalas directamente desde la sección de demos.',
    faq5Q: '¿Ofrecen soporte post-implementación?',
    faq5A: 'Sí, 30 días de soporte incluidos con cada proyecto, más planes de soporte continuo disponibles.',
    faq6Q: '¿Qué es NexusForge AI?',
    faq6A: 'NexusForge AI es nuestra plataforma enterprise de orquestación de agentes IA. Permite desplegar 22 agentes que colaboran en 6 topologías de enjambre, con auto-reparación, pipeline RAG y infraestructura Terraform + Kubernetes. Ideal para empresas que necesitan automatización inteligente a escala.',
    // Contact
    contactBadge: 'Contacto',
    contactTitle: 'Hablemos de tu proyecto',
    contactSub: 'Agenda tu diagnóstico gratuito de 30 minutos. Sin compromiso, con ideas concretas.',
    contactName: 'Nombre',
    contactEmail: 'Email',
    contactCompany: 'Empresa',
    contactMessage: '¿Qué quieres automatizar?',
    contactSubmit: 'Agenda tu Diagnóstico Gratis',
    contactSent: '✓ Enviado — Te contactaremos pronto',
    contactDirect: 'Contacto directo',
    contactSocial: 'Redes sociales',
    // Footer
    footerText: '© 2026 Impulso IA — Automatiza. Escala. Transforma.',
    // Floating CTA
    floatingCta: 'Agenda Llamada Gratis',
    // Chatbot
    chatTitle: 'Impulso IA — Asistente',
    chatPlaceholder: 'Escribe tu pregunta...',
    chatWelcome: '¡Hola! Soy el asistente de Impulso IA. ¿En qué puedo ayudarte?',
    chatQuick1: 'Servicios',
    chatQuick2: 'Precios',
    chatQuick3: 'Proceso',
    chatQuick4: 'Agendar llamada',
  },
  en: {
    navServices: 'Services',
    navProcess: 'Process',
    navDemos: 'Demos',
    navAbout: 'About',
    navContact: 'Contact',
    navCta: 'Schedule a Call',
    heroBadge: 'AI & Automation for Business',
    heroTitle1: 'Your business deserves to work ',
    heroHighlight: 'with AI',
    heroTitle2: ', not against it',
    heroSub: 'We implement AI and automation solutions that cut costs, accelerate processes, and free your team to focus on what truly matters.',
    heroCta: 'Schedule your free diagnosis',
    heroCtaSecondary: 'View services',
    heroMetric1: 'Solutions in production',
    heroMetric2: 'Queries resolved by AI',
    heroMetric3: 'Hours/week saved',
    heroMetric4: 'Live demos',
    trustBadge: 'Backed by results',
    trustTitle: 'Numbers that speak for themselves',
    trust1: 'AI Systems Shipped',
    trust2: 'Claude Tools in Production',
    trust3: 'Automated Tests',
    trust4: 'Live Demos Available',
    painBadge: 'The problem',
    painTitle: "This is happening to your business today",
    pain1: 'Your team wastes hours on repetitive tasks',
    pain2: 'Your customers wait too long for answers',
    pain3: 'You make decisions without real-time data',
    servicesBadge: 'Services',
    servicesTitle: 'Solutions that deliver results',
    servicesSub: 'Every project adapts to your needs. No long contracts, with measurable results.',
    svcFrom: 'From',
    svcDemo: 'View demo',
    svcContact: 'Contact us',
    svc1Title: 'Multi-Agent AI Chatbot',
    svc1Price: '$4,999/mo',
    svc1Desc: '24/7 customer support with specialized agents that resolve 80% of queries without human intervention. Web, WhatsApp & Telegram.',
    svc2Title: 'Process Automation',
    svc2Price: '$2,999/project',
    svc2Desc: 'We connect your CRM, email, billing & tools into automatic workflows with Make.com and n8n. Eliminate admin overhead.',
    svc3Title: 'AI Content Generation',
    svc3Price: '$3,499/mo',
    svc3Desc: 'Social media copy, DALL-E 3 prompts, visual palettes & publishing calendar. 4 platforms, unlimited content.',
    svc4Title: 'AI Financial Dashboard',
    svc4Price: '$5,999/project',
    svc4Desc: 'Anomaly detection, expense reconciliation & cash flow projections. Import your data and get instant insights.',
    svc5Title: 'AI Resume Screening',
    svc5Price: '$1,999/process',
    svc5Desc: 'Automatically evaluate candidates against your job profile. Scoring, ranking & recommendations per candidate.',
    svc6Title: 'No-Code Client Portal',
    svc6Price: '$4,499/project',
    svc6Desc: 'Complete portal with projects, invoices, tickets & documents. No backend, no server, ready in days.',
    svc7Title: 'AI Agent Orchestration',
    svc7Price: '$7,999/project',
    svc7Desc: 'Deploy intelligent agent swarms that self-heal, collaborate in 6 topologies, and process data through RAG pipelines. Enterprise infrastructure with Terraform and Kubernetes.',
    processBadge: 'Process',
    processTitle: 'How we work',
    processSub: 'From idea to results in 4 clear steps.',
    step1Title: 'Free Diagnosis',
    step1Desc: 'We analyze your processes and detect automation opportunities (30 min, no commitment)',
    step2Title: 'Custom Proposal',
    step2Desc: 'We design the technical solution with timelines, costs and estimated ROI',
    step3Title: 'Agile Implementation',
    step3Desc: 'We build, test and deploy in 1-2 week sprints',
    step4Title: 'Ongoing Support',
    step4Desc: 'Monitoring, adjustments and training for your team',
    demosBadge: 'Portfolio',
    demosTitle: 'Live demos',
    demosSub: 'Real projects, running right now. Click and try them.',
    demoCta: 'Try Live Demo',
    demo1Title: 'Multi-Agent Chatbot',
    demo1M1: '5 AI agents',
    demo1M2: '80% resolution',
    demo1M3: '24/7 available',
    demo2Title: 'AI Content Studio',
    demo2M1: '4 platforms',
    demo2M2: '90% faster',
    demo2M3: 'A/B testing',
    demo3Title: 'Finance AI Dashboard',
    demo3M1: 'Anomaly detection',
    demo3M2: 'Cashflow projection',
    demo3M3: 'Financial chatbot',
    demo4Title: 'HR Scout LLM',
    demo4M1: 'Score 0-100',
    demo4M2: '15 min vs 3 days',
    demo4M3: 'Comparative report',
    demo5Title: 'Client Hub No-Code',
    demo5M1: 'Tickets & invoices',
    demo5M2: 'Secure documents',
    demo5M3: 'AI assistant',
    demo6Title: 'ClientHub Portal',
    demo6M1: 'Complete portal',
    demo6M2: 'No backend',
    demo6M3: 'Ready in days',
    demo7Title: 'NexusForge AI',
    demo7M1: '22 AI agents',
    demo7M2: '6 topologies',
    demo7M3: '231 tests',
    techBadge: 'Technologies',
    techTitle: 'Our stack',
    aboutBadge: 'About me',
    aboutName: 'Christian Hernandez Escamilla',
    aboutBio: "I'm Christian Hernández, Software Engineer specializing in AI & Automation. I've designed and deployed 15 production systems with 861+ automated tests, including multi-agent chatbots, financial dashboards, No-Code portals, and NexusForge: an enterprise orchestration platform with 22 AI agents and Terraform + Kubernetes infrastructure. My focus: translating business needs into technical solutions that generate ROI from day one.",
    aboutTag1: '15 AI systems in production',
    aboutTag2: 'Stack: React, Python, Node.js, Terraform',
    aboutTag3: '861+ automated tests',
    resultsBadge: 'Real results',
    resultsTitle: "We don't promise, we prove",
    resultsSub: 'Every metric comes from real projects you can try yourself in the demos.',
    res1Metric: '80%',
    res1Label: 'of queries resolved without humans',
    res1Desc: 'Multi-agent chatbot with 5 specialized AIs, knowledge base and decision trees',
    res2Metric: '90%',
    res2Label: 'less time in content production',
    res2Desc: 'Copy + visual generator for 4 platforms in seconds, not hours',
    res3Metric: '2σ',
    res3Label: 'statistical anomaly detection',
    res3Desc: 'Z-score on real transactions with linear regression projections',
    res4Metric: '15 min',
    res4Label: 'vs hours in resume screening',
    res4Desc: 'Automatic scoring, synonym matching and skill coverage heatmap',
    res5Metric: '22',
    res5Label: 'AI agents orchestrated in swarms',
    res5Desc: '6 swarm topologies, self-healing, RAG pipeline and 231 automated tests with NexusForge',
    testimonialsBadge: 'Testimonials',
    testimonialsTitle: 'What our clients say',
    test1: 'We implemented the multi-agent chatbot and now resolve 80% of queries without human intervention.',
    test1Author: 'María González',
    test1Role: 'COO @ TechSoluciones',
    test2: 'The financial dashboard detected anomalies that saved us $50K in the first month.',
    test2Author: 'Carlos Ruiz',
    test2Role: 'CFO @ DataMex',
    test3: 'We reduced CV screening time from 3 days to 15 minutes.',
    test3Author: 'Ana López',
    test3Role: 'HR Director @ TalentPro',
    faqBadge: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faq1Q: 'How long does implementation take?',
    faq1A: 'Between 1 and 3 weeks depending on project complexity. We work in agile sprints to deliver value as soon as possible.',
    faq2Q: 'Do I need technical knowledge?',
    faq2A: "No, we handle everything. From design to deployment and training your team.",
    faq3Q: "What if I'm not satisfied?",
    faq3A: 'We offer a full refund within the first 30 days. No questions asked.',
    faq4Q: 'Can I see a demo before hiring?',
    faq4A: 'Yes, all our demos are available online. Try them directly from the demos section.',
    faq5Q: 'Do you offer post-implementation support?',
    faq5A: 'Yes, 30 days of support included with every project, plus ongoing support plans available.',
    faq6Q: 'What is NexusForge AI?',
    faq6A: 'NexusForge AI is our enterprise AI agent orchestration platform. It deploys 22 agents collaborating in 6 swarm topologies, with self-healing, RAG pipeline, and Terraform + Kubernetes infrastructure. Ideal for companies that need intelligent automation at scale.',
    contactBadge: 'Contact',
    contactTitle: "Let's talk about your project",
    contactSub: 'Schedule your free 30-minute diagnosis. No commitment, with concrete ideas.',
    contactName: 'Name',
    contactEmail: 'Email',
    contactCompany: 'Company',
    contactMessage: 'What do you want to automate?',
    contactSubmit: 'Schedule Your Free Diagnosis',
    contactSent: '✓ Sent — We will contact you soon',
    contactDirect: 'Direct contact',
    contactSocial: 'Social media',
    footerText: '© 2026 Impulso IA — Automate. Scale. Transform.',
    floatingCta: 'Schedule Free Call',
    chatTitle: 'Impulso IA — Assistant',
    chatPlaceholder: 'Type your question...',
    chatWelcome: "Hi! I'm the Impulso IA assistant. How can I help you?",
    chatQuick1: 'Services',
    chatQuick2: 'Pricing',
    chatQuick3: 'Process',
    chatQuick4: 'Schedule a call',
  },
}

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
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
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

/* ───────────────── Hook: Animated Counter ───────────────── */
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return { count, ref }
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
  orchestration: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/>
      <circle cx="5" cy="19" r="3"/>
      <circle cx="19" cy="19" r="3"/>
      <path d="M12 8v3M8.5 17.5L10.5 13M15.5 17.5L13.5 13"/>
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
  chevronDown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  quote: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
}

/* ───────────────── Data Helpers ───────────────── */
const techStack = [
  'Claude API', 'GPT-4o', 'Groq API', 'Make.com', 'n8n', 'Zapier',
  'Airtable', 'Softr', 'DALL-E 3', 'React', 'Python', 'Node.js',
  'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Terraform', 'Kubernetes',
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

/* ───────────────── Chatbot Knowledge Base ───────────────── */
const chatbotKB = {
  es: {
    services: `Nuestros 7 servicios:\n\n1. Chatbot IA Multiagente — $4,999/mes. 5 agentes especializados, resolución automática del 80%, integración con WhatsApp, Slack, web. Implementación: 2-3 semanas.\n\n2. Automatización de Procesos — $2,999/proyecto. Conectamos tus herramientas (CRM, email, bases de datos) con flujos inteligentes. Reduce tareas manuales de horas a minutos.\n\n3. Generación de Contenido con IA — $3,499/mes. Contenido para 4 plataformas, 5 tonos, A/B testing. Reduce producción de contenido un 90%.\n\n4. Dashboard Financiero con IA — $5,999/proyecto. Detección de anomalías, proyección de flujo de caja, chatbot financiero.\n\n5. Filtrado de CVs con IA — $1,999/proceso. Scoring automático 0-100, detección de gaps, reporte comparativo.\n\n6. Portal de Clientes No-Code — $4,499/proyecto. Portal completo con tickets, facturas, documentos, asistente IA.\n\n7. Orquestación de Agentes IA — $7,999/proyecto. 22 agentes IA, 6 topologías de enjambre, auto-reparación, pipeline RAG. Infraestructura enterprise con Terraform y Kubernetes.`,
    pricing: `Precios y Paquetes:\n\n• Starter: $7,999/mes — Chatbot + Automatización\n• Growth: $12,999/mes — 4 soluciones integradas\n• Enterprise: Precio personalizado\n\nTodos incluyen 30 días de soporte post-implementación.`,
    process: `Nuestro proceso en 4 pasos:\n\n1. Diagnóstico Gratis (30 min call)\n2. Propuesta a la Medida (en 48h)\n3. Implementación Ágil (1-3 semanas)\n4. Soporte Continuo`,
    schedule: `¡Perfecto! Puedes agendar tu diagnóstico gratuito de 30 minutos directamente en la sección de contacto. Scroll abajo o haz clic en "Contacto" en el menú. Sin compromiso, con ideas concretas para tu negocio.`,
    default: `Puedo ayudarte con información sobre:\n• Nuestros 7 servicios de IA\n• Precios y paquetes\n• El proceso de trabajo\n• Agendar una llamada gratuita\n\n¿Qué te interesa saber?`,
  },
  en: {
    services: `Our 7 services:\n\n1. Multi-Agent AI Chatbot — $4,999/mo. 5 specialized agents, 80% auto-resolution, WhatsApp, Slack & web integration. Implementation: 2-3 weeks.\n\n2. Process Automation — $2,999/project. We connect your tools (CRM, email, databases) with intelligent workflows. Reduces manual tasks from hours to minutes.\n\n3. AI Content Generation — $3,499/mo. Content for 4 platforms, 5 tones, A/B testing. Reduces content production by 90%.\n\n4. AI Financial Dashboard — $5,999/project. Anomaly detection, cash flow projection, financial chatbot.\n\n5. AI Resume Screening — $1,999/process. Automatic scoring 0-100, gap detection, comparative report.\n\n6. No-Code Client Portal — $4,499/project. Complete portal with tickets, invoices, documents, AI assistant.\n\n7. AI Agent Orchestration — $7,999/project. 22 AI agents, 6 swarm topologies, self-healing, RAG pipeline. Enterprise infrastructure with Terraform and Kubernetes.`,
    pricing: `Pricing & Bundles:\n\n• Starter: $7,999/mo — Chatbot + Automation\n• Growth: $12,999/mo — 4 integrated solutions\n• Enterprise: Custom pricing\n\nAll include 30 days of post-implementation support.`,
    process: `Our 4-step process:\n\n1. Free Diagnosis (30 min call)\n2. Custom Proposal (within 48h)\n3. Agile Implementation (1-3 weeks)\n4. Ongoing Support`,
    schedule: `Perfect! You can schedule your free 30-minute diagnosis directly in the contact section. Scroll down or click "Contact" in the menu. No commitment, with concrete ideas for your business.`,
    default: `I can help you with:\n• Our 7 AI services\n• Pricing and bundles\n• Our work process\n• Scheduling a free call\n\nWhat would you like to know?`,
  },
}

/* ───────────────── Components ───────────────── */

function Navbar() {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: tr.navServices, href: '#servicios' },
    { label: tr.navProcess, href: '#proceso' },
    { label: tr.navDemos, href: '#demos' },
    { label: tr.navAbout, href: '#sobre' },
    { label: tr.navContact, href: '#contacto' },
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

  const langToggleStyle = {
    display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden',
    border: '1px solid rgba(99,102,241,0.3)',
  }

  const langBtnStyle = (active) => ({
    padding: '6px 12px', border: 'none', fontSize: '0.8rem', fontWeight: 600,
    background: active ? '#6366F1' : 'transparent',
    color: active ? '#fff' : '#94A3B8',
    cursor: 'pointer', transition: 'all 0.2s',
  })

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
          <li style={langToggleStyle}>
            <button style={langBtnStyle(lang === 'es')} onClick={() => setLang('es')}>ES</button>
            <button style={langBtnStyle(lang === 'en')} onClick={() => setLang('en')}>EN</button>
          </li>
          <li>
            <a href="#contacto" style={ctaStyle}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(99,102,241,0.3)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
            >{tr.navCta}</a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-mobile-controls">
          <div style={{ ...langToggleStyle }} className="nav-lang-mobile">
            <button style={langBtnStyle(lang === 'es')} onClick={() => setLang('es')}>ES</button>
            <button style={langBtnStyle(lang === 'en')} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', display: 'none' }}>
            {menuOpen ? icons.close : icons.menu}
          </button>
        </div>
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
            style={{ ...ctaStyle, display: 'inline-block', marginTop: 16 }}>{tr.navCta}</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { lang } = useLang()
  const tr = t[lang]
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
          {tr.heroBadge}
        </div>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
          lineHeight: 1.15, color: '#fff', maxWidth: 900, margin: '0 auto 24px',
        }}>
          {tr.heroTitle1}
          <span style={{
            background: 'linear-gradient(135deg, #6366F1, #10B981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>{tr.heroHighlight}</span>
          {tr.heroTitle2}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94A3B8',
          maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          {tr.heroSub}
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
            {tr.heroCta} {icons.arrow}
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
            {tr.heroCtaSecondary}
          </a>
        </div>

        {/* Trust metrics */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 64, flexWrap: 'wrap' }}>
          {[
            { num: '7+', label: tr.heroMetric1 },
            { num: '80%', label: tr.heroMetric2 },
            { num: '20+', label: tr.heroMetric3 },
            { num: '7', label: tr.heroMetric4 },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                background: 'linear-gradient(135deg, #6366F1, #10B981)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{m.num}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustSignals() {
  const { lang } = useLang()
  const tr = t[lang]

  const counters = [
    { end: 15, suffix: '', label: tr.trust1, color: '#6366F1' },
    { end: 32, suffix: '', label: tr.trust2, color: '#10B981' },
    { end: 861, suffix: '+', label: tr.trust3, color: '#F59E0B' },
    { end: 7, suffix: '', label: tr.trust4, color: '#8B5CF6' },
  ]

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, #0A0B0F 0%, #0F1017 100%)' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            {tr.trustBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.trustTitle}</h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {counters.map((c, i) => (
            <CounterCard key={i} end={c.end} suffix={c.suffix} label={c.label} color={c.color} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CounterCard({ end, suffix, label, color, delay }) {
  const { count, ref } = useCountUp(end, 1500)

  return (
    <div ref={ref} style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16, padding: '32px 24px', textAlign: 'center',
      transition: 'border-color 0.3s, transform 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '60'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: '2.8rem',
        background: `linear-gradient(135deg, ${color}, ${color}AA)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 8,
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.95rem', color: '#CBD5E1', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

function PainPoints() {
  const { lang } = useLang()
  const tr = t[lang]
  const painPoints = [
    { icon: icons.clock, title: tr.pain1, color: '#EF4444' },
    { icon: icons.users, title: tr.pain2, color: '#F59E0B' },
    { icon: icons.chart, title: tr.pain3, color: '#8B5CF6' },
  ]

  return (
    <section style={{ ...s.sectionPad, background: 'linear-gradient(180deg, #0A0B0F 0%, #0F1017 100%)' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}>
            {tr.painBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.painTitle}</h2>
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
  const { lang } = useLang()
  const tr = t[lang]

  const services = [
    { icon: icons.chatbot, title: tr.svc1Title, price: tr.svc1Price, desc: tr.svc1Desc, demo: 'https://chatbot-multiagente-ia.vercel.app' },
    { icon: icons.automation, title: tr.svc2Title, price: tr.svc2Price, desc: tr.svc2Desc, demo: null },
    { icon: icons.content, title: tr.svc3Title, price: tr.svc3Price, desc: tr.svc3Desc, demo: 'https://content-studio-ai-blush.vercel.app' },
    { icon: icons.finance, title: tr.svc4Title, price: tr.svc4Price, desc: tr.svc4Desc, demo: 'https://finance-ai-dashboard-omega.vercel.app' },
    { icon: icons.hr, title: tr.svc5Title, price: tr.svc5Price, desc: tr.svc5Desc, demo: 'https://hr-scout-llm.vercel.app' },
    { icon: icons.portal, title: tr.svc6Title, price: tr.svc6Price, desc: tr.svc6Desc, demo: 'https://client-hub-nocode.vercel.app' },
    { icon: icons.orchestration, title: tr.svc7Title, price: tr.svc7Price, desc: tr.svc7Desc, demo: 'https://frontend-silk-three-66.vercel.app' },
  ]

  return (
    <section id="servicios" style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            {tr.servicesBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.servicesTitle}</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>{tr.servicesSub}</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {services.map((sv, i) => {
            const Wrapper = sv.demo ? 'a' : 'div'
            const wrapperProps = sv.demo ? { href: sv.demo, target: '_blank', rel: 'noopener noreferrer' } : {}
            return (
            <Wrapper key={i} {...wrapperProps} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 32,
              transition: 'border-color 0.3s, transform 0.3s',
              display: 'flex', flexDirection: 'column',
              textDecoration: 'none', color: 'inherit', cursor: 'pointer',
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
                }}>{tr.svcFrom} {sv.price}</span>
                <span style={{ color: '#6366F1', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.9rem', fontWeight: 500 }}>
                  {sv.demo ? tr.svcDemo : tr.svcContact} {icons.arrow}
                </span>
              </div>
            </Wrapper>
          )})}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const { lang } = useLang()
  const tr = t[lang]

  const steps = [
    { num: '01', title: tr.step1Title, desc: tr.step1Desc },
    { num: '02', title: tr.step2Title, desc: tr.step2Desc },
    { num: '03', title: tr.step3Title, desc: tr.step3Desc },
    { num: '04', title: tr.step4Title, desc: tr.step4Desc },
  ]

  return (
    <section id="proceso" style={{
      ...s.sectionPad,
      background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)',
    }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}>
            {tr.processBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.processTitle}</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>{tr.processSub}</p>
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
  const { lang } = useLang()
  const tr = t[lang]

  const demos = [
    { title: tr.demo1Title, url: 'https://chatbot-multiagente-ia.vercel.app', color: '#6366F1', metrics: [tr.demo1M1, tr.demo1M2, tr.demo1M3] },
    { title: tr.demo2Title, url: 'https://content-studio-ai-blush.vercel.app', color: '#10B981', metrics: [tr.demo2M1, tr.demo2M2, tr.demo2M3] },
    { title: tr.demo3Title, url: 'https://finance-ai-dashboard-omega.vercel.app', color: '#F59E0B', metrics: [tr.demo3M1, tr.demo3M2, tr.demo3M3] },
    { title: tr.demo4Title, url: 'https://hr-scout-llm.vercel.app', color: '#EF4444', metrics: [tr.demo4M1, tr.demo4M2, tr.demo4M3] },
    { title: tr.demo5Title, url: 'https://client-hub-nocode.vercel.app', color: '#8B5CF6', metrics: [tr.demo5M1, tr.demo5M2, tr.demo5M3] },
    { title: tr.demo6Title, url: 'https://client-hub-nocode.vercel.app', color: '#EC4899', metrics: [tr.demo6M1, tr.demo6M2, tr.demo6M3] },
    { title: tr.demo7Title, url: 'https://frontend-silk-three-66.vercel.app', color: '#F97316', metrics: [tr.demo7M1, tr.demo7M2, tr.demo7M3] },
  ]

  return (
    <section id="demos" style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            {tr.demosBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.demosTitle}</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>{tr.demosSub}</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
              {/* Preview area */}
              <div style={{
                height: 160, background: `linear-gradient(135deg, ${d.color}15, ${d.color}05)`,
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

              {/* Metrics */}
              <div style={{
                display: 'flex', gap: 8, padding: '12px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                {d.metrics.map((m, mi) => (
                  <span key={mi} style={{
                    padding: '4px 10px', borderRadius: 6,
                    background: d.color + '12', color: d.color,
                    fontSize: '0.75rem', fontWeight: 600,
                  }}>{m}</span>
                ))}
              </div>

              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#E2E8F0' }}>{d.title}</h3>
                <span style={{
                  padding: '10px 20px', borderRadius: 8,
                  background: d.color + '20', color: d.color,
                  fontSize: '0.85rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'background 0.2s',
                }}>
                  {tr.demoCta} {icons.external}
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
  const { lang } = useLang()
  const tr = t[lang]
  return (
    <section style={{
      ...s.sectionPad,
      background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)',
    }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...s.badge, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}>
            {tr.techBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.techTitle}</h2>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
        }}>
          {techStack.map((tech, i) => (
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
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const { lang } = useLang()
  const tr = t[lang]
  return (
    <section id="sobre" style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={{ ...s.container, maxWidth: 900 }} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            {tr.aboutBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.aboutName}</h2>
        </div>
        <div style={{
          display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <div style={{
            width: 200, height: 200, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1, #10B981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 800,
            flexShrink: 0,
          }}>CH</div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
              {tr.aboutBio}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[tr.aboutTag1, tr.aboutTag2, tr.aboutTag3].map((item, i) => (
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

function Results() {
  const { lang } = useLang()
  const tr = t[lang]
  const results = [
    { icon: '\u{1F916}', metric: tr.res1Metric, label: tr.res1Label, desc: tr.res1Desc },
    { icon: '\u{26A1}', metric: tr.res2Metric, label: tr.res2Label, desc: tr.res2Desc },
    { icon: '\u{1F4CA}', metric: tr.res3Metric, label: tr.res3Label, desc: tr.res3Desc },
    { icon: '\u{23F1}\u{FE0F}', metric: tr.res4Metric, label: tr.res4Label, desc: tr.res4Desc },
    { icon: '\u{1F310}', metric: tr.res5Metric, label: tr.res5Label, desc: tr.res5Desc },
  ]
  return (
    <section style={{ ...s.sectionPad, background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}>
            {tr.resultsBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.resultsTitle}</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>{tr.resultsSub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {results.map((r, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '28px 24px', textAlign: 'center',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{r.icon}</div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2rem',
                background: 'linear-gradient(135deg, #10B981, #6366F1)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: 4,
              }}>{r.metric}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E2E8F0', marginBottom: 8 }}>{r.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const { lang } = useLang()
  const tr = t[lang]

  const testimonials = [
    { text: tr.test1, author: tr.test1Author, role: tr.test1Role, color: '#6366F1' },
    { text: tr.test2, author: tr.test2Author, role: tr.test2Role, color: '#10B981' },
    { text: tr.test3, author: tr.test3Author, role: tr.test3Role, color: '#F59E0B' },
  ]

  return (
    <section style={{ ...s.sectionPad, background: '#0A0B0F' }}>
      <div style={s.container} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            {tr.testimonialsBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.testimonialsTitle}</h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {testimonials.map((test, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 32,
              transition: 'border-color 0.3s, transform 0.3s',
              display: 'flex', flexDirection: 'column',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = test.color + '40'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ marginBottom: 16, opacity: 0.5 }}>{icons.quote}</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[...Array(5)].map((_, si) => <span key={si}>{icons.star}</span>)}
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.7, flex: 1, marginBottom: 24, fontStyle: 'italic' }}>
                "{test.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${test.color}, ${test.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                }}>
                  {test.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{test.author}</div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem' }}>{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const { lang } = useLang()
  const tr = t[lang]
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: tr.faq1Q, a: tr.faq1A },
    { q: tr.faq2Q, a: tr.faq2A },
    { q: tr.faq3Q, a: tr.faq3A },
    { q: tr.faq4Q, a: tr.faq4A },
    { q: tr.faq5Q, a: tr.faq5A },
    { q: tr.faq6Q, a: tr.faq6A },
  ]

  return (
    <section style={{ ...s.sectionPad, background: 'linear-gradient(180deg, #0F1017 0%, #0A0B0F 100%)' }}>
      <div style={{ ...s.container, maxWidth: 800 }} className="fade-section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...s.badge, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
            {tr.faqBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.faqTitle}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, overflow: 'hidden',
              transition: 'border-color 0.3s',
              borderColor: openIndex === i ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 24px',
                  background: 'none', border: 'none',
                  color: '#E2E8F0', fontSize: '1.05rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  textAlign: 'left', cursor: 'pointer',
                }}
              >
                {faq.q}
                <span style={{
                  transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s', flexShrink: 0, marginLeft: 16,
                }}>
                  {icons.chevronDown}
                </span>
              </button>
              {openIndex === i && (
                <div style={{
                  padding: '0 24px 20px',
                  color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.7,
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { lang } = useLang()
  const tr = t[lang]
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
            {tr.contactBadge}
          </div>
          <h2 style={s.sectionTitle}>{tr.contactTitle}</h2>
          <p style={{ ...s.sectionSub, margin: '0 auto' }}>
            {tr.contactSub}
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48, maxWidth: 900, margin: '0 auto',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input type="text" placeholder={tr.contactName} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <input type="email" placeholder={tr.contactEmail} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <input type="text" placeholder={tr.contactCompany} style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <textarea placeholder={tr.contactMessage} rows={4} required
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
              {submitted ? tr.contactSent : tr.contactSubmit}
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 24,
            }}>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: '1.05rem' }}>{tr.contactDirect}</h4>
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
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: '1.05rem' }}>{tr.contactSocial}</h4>
              <div style={{ display: 'flex', gap: 16 }}>
                <a href="https://linkedin.com/in/christianhernandez-ia" target="_blank" rel="noopener noreferrer"
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
                <a href="https://github.com/christianescamilla15-cell" target="_blank" rel="noopener noreferrer"
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
  const { lang } = useLang()
  const tr = t[lang]
  return (
    <footer style={{
      padding: '32px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#0A0B0F',
    }}>
      <div style={{ ...s.container, textAlign: 'center' }}>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          {tr.footerText}
        </p>
      </div>
    </footer>
  )
}

/* ───────────────── Floating CTA Button ───────────────── */
function FloatingCTA() {
  const { lang } = useLang()
  const tr = t[lang]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <a href="#contacto" className="floating-cta" style={{
      position: 'fixed', bottom: 90, right: 24, zIndex: 998,
      padding: '12px 24px', borderRadius: 12,
      background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
      color: '#fff', fontWeight: 700, fontSize: '0.9rem',
      boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
      display: 'flex', alignItems: 'center', gap: 8,
      transition: 'transform 0.2s, box-shadow 0.2s',
      textDecoration: 'none',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.5)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.4)' }}
    >
      {icons.phone} {tr.floatingCta}
    </a>
  )
}

/* ───────────────── AI Chatbot ───────────────── */
function Chatbot() {
  const { lang } = useLang()
  const tr = t[lang]
  const kb = chatbotKB[lang]
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: 'bot', text: tr.chatWelcome }])
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getBotResponse = (userMsg) => {
    const lower = userMsg.toLowerCase()
    if (lower.includes('servicio') || lower.includes('service') || lower.includes('qué ofrecen') || lower.includes('what do you offer')) {
      return kb.services
    }
    if (lower.includes('precio') || lower.includes('cost') || lower.includes('pricing') || lower.includes('paquete') || lower.includes('bundle') || lower.includes('cuánto')) {
      return kb.pricing
    }
    if (lower.includes('proceso') || lower.includes('process') || lower.includes('cómo trabaj') || lower.includes('how do you work') || lower.includes('paso')) {
      return kb.process
    }
    if (lower.includes('agenda') || lower.includes('schedule') || lower.includes('llamada') || lower.includes('call') || lower.includes('contacto') || lower.includes('contact')) {
      return kb.schedule
    }
    if (lower.includes('nexusforge') || lower.includes('orquestaci') || lower.includes('orchestrat') || lower.includes('enjambre') || lower.includes('swarm') || lower.includes('agentes')) {
      return lang === 'es'
        ? 'NexusForge AI es nuestra plataforma enterprise de orquestación de agentes IA. Cuenta con 22 agentes especializados, 6 topologías de enjambre (cadena, estrella, malla, jerárquica, broadcast, debate), auto-reparación automática, pipeline RAG y 231 tests automatizados. Infraestructura desplegada con Terraform y Kubernetes. Precio: $7,999/proyecto.'
        : 'NexusForge AI is our enterprise AI agent orchestration platform. It features 22 specialized agents, 6 swarm topologies (chain, star, mesh, hierarchical, broadcast, debate), automatic self-healing, RAG pipeline, and 231 automated tests. Infrastructure deployed with Terraform and Kubernetes. Price: $7,999/project.'
    }
    if (lower.includes('tiempo') || lower.includes('time') || lower.includes('cuánto tarda') || lower.includes('how long') || lower.includes('implementa')) {
      return lang === 'es'
        ? 'La implementación típica toma entre 1 y 3 semanas, dependiendo de la complejidad. Trabajamos en sprints ágiles para entregar valor rápidamente.'
        : 'Typical implementation takes 1-3 weeks, depending on complexity. We work in agile sprints to deliver value quickly.'
    }
    return kb.default
  }

  const handleSend = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setMessages(prev => [...prev, { from: 'user', text: msg }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: getBotResponse(msg) }])
    }, 600)
  }

  const quickActions = [
    { label: tr.chatQuick1, action: () => handleSend(lang === 'es' ? 'Qué servicios ofrecen?' : 'What services do you offer?') },
    { label: tr.chatQuick2, action: () => handleSend(lang === 'es' ? 'Cuáles son los precios?' : 'What are your prices?') },
    { label: tr.chatQuick3, action: () => handleSend(lang === 'es' ? 'Cuál es el proceso?' : 'What is the process?') },
    { label: tr.chatQuick4, action: () => handleSend(lang === 'es' ? 'Quiero agendar una llamada' : 'I want to schedule a call') },
  ]

  return (
    <>
      {/* Chat toggle button */}
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 1001,
        width: 60, height: 60, borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
        border: 'none', color: '#fff',
        boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.4)' }}
      >
        {open ? icons.close : icons.chatbot}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 96, right: 24, zIndex: 1001,
          width: 380, maxHeight: 520,
          background: '#12131A',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 16, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(16,185,129,0.1))',
            borderBottom: '1px solid rgba(99,102,241,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1, #10B981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {icons.chatbot}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{tr.chatTitle}</div>
                <div style={{ fontSize: '0.7rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}/> Online
                </div>
              </div>
            </div>
          </div>

          <>
              {/* Messages */}
              <div style={{
                flex: 1, overflowY: 'auto', padding: '16px', minHeight: 250, maxHeight: 320,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '10px 14px', borderRadius: 12,
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg, #6366F1, #4F46E5)'
                      : 'rgba(255,255,255,0.06)',
                    color: msg.from === 'user' ? '#fff' : '#CBD5E1',
                    fontSize: '0.88rem', lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                  }}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick actions */}
              {messages.length <= 1 && (
                <div style={{
                  padding: '8px 16px', display: 'flex', gap: 6, flexWrap: 'wrap',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {quickActions.map((qa, i) => (
                    <button key={i} onClick={qa.action} style={{
                      padding: '6px 12px', borderRadius: 8,
                      background: 'rgba(99,102,241,0.1)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      color: '#818CF8', fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', gap: 8,
              }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={tr.chatPlaceholder}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#E2E8F0', fontSize: '0.9rem', outline: 'none',
                  }}
                />
                <button onClick={() => handleSend()} style={{
                  padding: '10px 16px', borderRadius: 8, border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                  color: '#fff', fontWeight: 600, fontSize: '0.85rem',
                }}>
                  {icons.arrow}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

/* ───────────────── Responsive CSS ───────────────── */
const responsiveStyles = `
  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: block !important; }
    .nav-lang-mobile { display: flex !important; }
    .floating-cta { display: none !important; }
  }
  @media (min-width: 769px) {
    .nav-mobile-menu { display: none !important; }
    .nav-mobile-controls .nav-lang-mobile { display: none !important; }
  }
`

/* ───────────────── App ───────────────── */
export default function App() {
  const [lang, setLang] = useState('es')
  useFadeIn()

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <style>{globalStyles}</style>
      <style>{responsiveStyles}</style>
      <Navbar />
      <Hero />
      <TrustSignals />
      <PainPoints />
      <Services />
      <Process />
      <Demos />
      <TechStack />
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
