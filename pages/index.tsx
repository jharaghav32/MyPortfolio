import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/legacy/image'
import { Syne, Sora, JetBrains_Mono } from '@next/font/google'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import { FiGithub, FiExternalLink, FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import { GrLinkedinOption } from 'react-icons/gr'
import {
  SiLeetcode, SiGmail, SiCodechef, SiReact, SiNodedotjs, SiMongodb,
  SiJavascript, SiCplusplus, SiC, SiGit, SiTailwindcss, SiTypescript,
  SiNextdotjs, SiNestjs, SiExpress, SiDocker, SiPostgresql,
} from 'react-icons/si'

const display = Syne({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-syne' })
const sans = Sora({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-sora' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono' })

/* ---------- Data ---------- */
const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

// cl = color on light theme · cd = color on dark theme (kept readable per background)
const SOCIALS = [
  { Icon: AiFillLinkedin, href: 'https://www.linkedin.com/in/jharaghav/', label: 'LinkedIn', cl: '#0A66C2', cd: '#4493E0' },
  { Icon: AiFillGithub, href: 'https://github.com/jharaghav32', label: 'GitHub', cl: '#24292F', cd: '#E6EDF3' },
  { Icon: SiLeetcode, href: 'https://leetcode.com/raghav32/', label: 'LeetCode', cl: '#EA8A00', cd: '#FFA116' },
  { Icon: SiCodechef, href: 'https://www.codechef.com/users/jharaghav_3209', label: 'CodeChef', cl: '#5B4638', cd: '#BC8A63' },
]

const STATS = [
  { k: '2+ yrs', v: 'Experience' },
  { k: '1000+', v: 'Problems Solved' },
  { k: '9.1', v: 'CGPA' },
  { k: 'Top 30', v: 'HackRX 3.0' },
]

// color = vivid brand (dark-theme glow) · light = paper-safe shade (light-theme at rest)
const STACK = [
  { Icon: SiCplusplus, name: 'C++', color: '#00599C', light: '#00599C' },
  { Icon: SiC, name: 'C', color: '#5C6BC0', light: '#4F5BB3' },
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', light: '#CA8A04' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6', light: '#2F6CB0' },
  { Icon: SiReact, name: 'React', color: '#61DAFB', light: '#0891B2' },
  { Icon: SiNextdotjs, name: 'Next.js', color: '#FFFFFF', light: '#111827' },
  { Icon: SiNodedotjs, name: 'Node.js', color: '#5FA04E', light: '#4D8A3E' },
  { Icon: SiNestjs, name: 'NestJS', color: '#E0234E', light: '#D11E45' },
  { Icon: SiExpress, name: 'Express', color: '#FFFFFF', light: '#374151' },
  { Icon: SiMongodb, name: 'MongoDB', color: '#47A248', light: '#3F8C3F' },
  { Icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1', light: '#36569E' },
  { Icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4', light: '#0E8AA6' },
  { Icon: SiDocker, name: 'Docker', color: '#2496ED', light: '#1D7FCB' },
  { Icon: SiGit, name: 'Git', color: '#F05032', light: '#E1421F' },
]

const EXPERIENCE = [
  {
    role: 'Software Developer',
    company: 'BitQit Private Limited',
    location: 'New Delhi, India',
    period: 'Feb 2024 — Present',
    points: [
      'Replaced Azure Service Bus with BullMQ, cutting queue-processing time by 40% and lowering cloud costs by removing external message-queue dependencies — with persistent retries for stronger fault tolerance.',
      'Built CI/CD pipelines with GitHub Actions — pre-merge PR builds and automated tests for early bug detection and consistent code quality.',
      'Decoupled API services and background jobs into separate containers, enabling faster deployments, better fault isolation and improved scalability.',
      'Migrated legacy Node.js services to NestJS for a modular, maintainable and scalable architecture.',
      'Developed a prefix-search feature with Apache Lucene, improving product-search efficiency by 25%.',
    ],
    stack: ['NestJS', 'Node.js', 'BullMQ', 'Docker', 'GitHub Actions', 'Apache Lucene'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Iconic Pages',
    location: 'Nagpur, Maharashtra',
    period: 'Jun 2023 — Aug 2023',
    points: [
      'Designed and built responsive, accessible interfaces with Next.js, React.js and Material UI.',
      'Integrated Firebase Authentication with Google Sign-In to streamline user onboarding.',
      'Collaborated in an agile team to ship scalable features, optimising APIs and cutting response times by 20%.',
    ],
    stack: ['Next.js', 'React', 'Material UI', 'Firebase'],
  },
]

const PROJECTS = [
  {
    n: '01', title: 'AI Chatbot',
    desc: 'An interactive chatbot powered by OpenAI for natural, seamless conversations — with secure auth and data integrity via Firebase Admin SDK, wrapped in a responsive UI.',
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/jharaghav32',
  },
  {
    n: '02', title: 'Memories',
    desc: 'A full-stack CRUD app for personal memories with private, per-user access. Secure authentication with JWT and sensitive data encrypted using Bcrypt.js.',
    stack: ['React', 'Node.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/jharaghav32/CloudMemories',
  },
  {
    n: '03', title: 'MyVideo App',
    desc: 'A YouTube-style video app — explore videos by category, views, comments and channels, with fast search powered by RapidAPI and a clean Material UI.',
    stack: ['React', 'Material UI', 'RapidAPI'],
    github: 'https://github.com/jharaghav32/MyVideoApp',
  },
  {
    n: '04', title: 'CoinWorld',
    desc: 'A crypto dashboard surfacing live prices, market caps and daily changes, with trending charts and curated crypto news from across the market.',
    stack: ['React', 'RapidAPI', 'Ant Design'],
    live: 'https://coinworld25.netlify.app/',
  },
  {
    n: '05', title: 'YourNews',
    desc: 'A category-wise news reader showing publish dates and detailed article views, powered by RapidAPI for fresh, real-time headlines.',
    stack: ['React', 'RapidAPI'],
    github: 'https://github.com/jharaghav32/YourNews',
  },
  {
    n: '06', title: 'Loop',
    desc: 'Real-time tracking of student learning outcomes and academic progress, spanning both academic and co-curricular performance. Built for SIH.',
    stack: ['HTML', 'CSS', 'Bootstrap', 'JS'],
    github: 'https://github.com/jharaghav32/MAIT_SIH',
  },
]

const SKILLS = [
  { group: 'Languages', items: [
    { name: 'JavaScript', lvl: 90 }, { name: 'TypeScript', lvl: 88 },
    { name: 'C++', lvl: 85 }, { name: 'C', lvl: 80 }, { name: 'SQL', lvl: 78 },
  ] },
  { group: 'Backend & Databases', items: [
    { name: 'Node.js', lvl: 88 }, { name: 'NestJS', lvl: 85 }, { name: 'Express.js', lvl: 82 },
    { name: 'MongoDB', lvl: 80 }, { name: 'PostgreSQL', lvl: 75 },
  ] },
  { group: 'Frontend', items: [
    { name: 'React.js', lvl: 85 }, { name: 'Next.js', lvl: 82 },
    { name: 'Tailwind CSS', lvl: 85 }, { name: 'Vue.js', lvl: 65 },
  ] },
  { group: 'Tools & Practices', items: [
    { name: 'Git / GitHub', lvl: 88 }, { name: 'Docker', lvl: 78 },
    { name: 'CI/CD', lvl: 80 }, { name: 'REST APIs', lvl: 85 },
  ] },
]

const ACHIEVEMENTS = [
  { t: 'Top-30 Finalist · 2500+ teams — HackRX 3.0', d: 'National hackathon organised by Bajaj Finserv Markets.' },
  { t: '8th of Top 10 — HackNSUT-22', d: 'Hackathon powered by Agora and Filecoin.' },
  { t: 'Global Rank 67 — CodeChef Starters', d: '3★ rated competitive programmer on CodeChef.' },
  { t: '1000+ DSA problems solved', d: 'Across LeetCode and CodeChef.' },
]

/* ---------- Reveal-on-scroll ---------- */
function Reveal({
  children, className = '', delay = 0, as,
}: { children: ReactNode; className?: string; delay?: number; as?: any }) {
  const Tag: any = as || 'div'
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ---------- Cursor-following glow ---------- */
function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const SIZE = 224 // half of the 448px glow
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let started = false
    let raf = 0
    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!started) {
        started = true
        el.style.opacity = '1'
      }
    }
    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      el.style.transform = `translate3d(${cx - SIZE}px, ${cy - SIZE}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[448px] w-[448px] rounded-full opacity-0 transition-opacity duration-500 md:block"
      style={{
        background:
          'radial-gradient(circle, rgb(var(--c-accent) / 0.13) 0%, rgb(var(--c-accent) / 0.05) 38%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

/* ---------- Section heading ---------- */
function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <Reveal className="mb-12 flex items-end gap-4">
      <span className="font-mono text-sm text-accent">{n}</span>
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <span className="mb-2 hidden h-px flex-1 bg-line/15 sm:block" />
    </Reveal>
  )
}

export default function Home() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sending, setSending] = useState(false)
  const [formStatus, setFormStatus] = useState<{ ok: boolean; msg: string } | null>(null)
  const [cooldown, setCooldown] = useState(0)

  const COOLDOWN_SECONDS = 60
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  // Restore any active cooldown after a refresh
  useEffect(() => {
    const last = Number(localStorage.getItem('contactLastSent') || 0)
    const remaining = COOLDOWN_SECONDS - Math.floor((Date.now() - last) / 1000)
    if (last && remaining > 0) setCooldown(remaining)
  }, [])

  // Tick the cooldown down to zero
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending || cooldown > 0) return
    setSending(true)
    setFormStatus(null)
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '72cc631e-deca-4ac8-992b-fd385f78dada')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setFormStatus({ ok: true, msg: "Thanks! Your message has been sent — I'll get back to you soon." })
        form.reset()
        localStorage.setItem('contactLastSent', String(Date.now()))
        setCooldown(COOLDOWN_SECONDS)
        ;(window as any).turnstile?.reset()
        setTimeout(() => setFormStatus(null), 5000)
      } else {
        setFormStatus({ ok: false, msg: json.message || 'Something went wrong. Please try again.' })
      }
    } catch {
      setFormStatus({ ok: false, msg: 'Network error. Please try again or email me directly.' })
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
      setScrolled(h.scrollTop > 16)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${display.variable} ${sans.variable} ${mono.variable} font-sans`}>
      <Head>
        <title>Raghav Kumar Jha — Software Developer</title>
        <meta
          name="description"
          content="Raghav Kumar Jha — Software Developer at BitQit building scalable backend systems and full-stack products with NestJS, Node.js & React. 1000+ DSA problems solved."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#060912" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Scroll progress bar */}
      <div
        className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-accent to-gold transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* Aurora atmosphere */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.28] dark:opacity-100">
        <div className="absolute -left-[10%] -top-[15%] h-[55vh] w-[55vh] animate-aurora rounded-full bg-accent/25 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[50vh] w-[50vh] animate-aurora rounded-full bg-accent/15 blur-[130px] [animation-delay:-7s] dark:bg-gold/15" />
        <div className="absolute bottom-[-15%] left-[30%] h-[45vh] w-[45vh] animate-aurora rounded-full bg-accent/10 blur-[120px] [animation-delay:-13s]" />
      </div>

      {/* Cursor-following glow */}
      <CursorGlow />

      <div className="relative z-10 min-h-screen text-ink">
        {/* ---------- NAV ---------- */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled ? 'glass border-b border-line/10' : ''
          }`}
        >
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
            <a href="#top" className="group flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-accent to-gold p-[1.5px] shadow-[0_0_0_0_rgb(var(--c-accent)/0)] transition-all duration-500 group-hover:-rotate-6 group-hover:shadow-[0_8px_24px_-8px_rgb(var(--c-accent)/0.6)]">
                <span className="grid h-full w-full place-items-center rounded-[6px] bg-surface font-display text-sm font-extrabold">
                  <span className="bg-gradient-to-br from-accent to-gold bg-clip-text text-transparent">R</span>
                </span>
                <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </span>
              <span className="font-mono text-sm tracking-widest text-muted">
                raghav<span className="text-accent">.jha</span>
                <span aria-hidden className="ml-px inline-block animate-pulse text-accent">_</span>
              </span>
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <a href={item.href} className="nav-link font-mono text-sm text-muted transition-colors hover:text-ink">
                    <span className="text-accent">0{i + 1}.</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                aria-label="Toggle theme"
                title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => setDark((d) => !d)}
                className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-lg border border-line/15 bg-surface transition-colors hover:border-accent/50"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/10" />
                <RiSunFill
                  className={`absolute text-lg text-gold transition-all duration-500 ${
                    dark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
                  }`}
                />
                <RiMoonFill
                  className={`absolute text-lg text-accent transition-all duration-500 ${
                    dark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                />
              </button>
              <button
                aria-label="Menu"
                onClick={() => setMenuOpen((o) => !o)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-line/15 bg-surface text-lg md:hidden"
              >
                {menuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="glass border-t border-line/10 md:hidden">
              <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
                {NAV.map((item, i) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-3 font-mono text-sm text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <span className="text-accent">0{i + 1}.</span> {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        <main id="top" className="mx-auto max-w-6xl px-6 md:px-10">
          {/* ---------- HERO ---------- */}
          <section className="grid items-center gap-12 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-28">
            <div>
              <p className="animate-fade-up font-mono text-sm tracking-wider text-accent [animation-delay:.05s]">
                {'// hi, my name is'}
              </p>
              <h1 className="mt-4 animate-fade-up font-display text-5xl font-extrabold leading-[1.05] tracking-tight [animation-delay:.15s] md:text-7xl">
                Raghav Kumar
                <br />
                <span className="text-gradient animate-gradient-x">Jha.</span>
              </h1>
              <h2 className="mt-4 animate-fade-up font-display text-2xl font-semibold text-muted [animation-delay:.25s] md:text-4xl">
                I build things for the web.
              </h2>
              <p className="mt-3 animate-fade-up font-mono text-sm text-accent [animation-delay:.3s] md:text-base">
                Software Developer @ BitQit
              </p>
              <p className="mt-6 max-w-xl animate-fade-up text-base leading-8 text-muted [animation-delay:.35s] md:text-lg">
                I build scalable backend systems and full-stack products with NestJS, Node.js and
                React — caring about clean architecture, performance and reliability. Off the clock,
                I&apos;m a competitive programmer with 1000+ problems solved.
              </p>

              <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-4 [animation-delay:.45s]">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-all hover:shadow-[0_10px_40px_-10px_rgb(var(--c-accent)/0.7)] hover:-translate-y-0.5"
                >
                  View my work
                  <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-line/20 px-6 py-3 font-mono text-sm text-ink transition-all hover:border-accent/50 hover:text-accent"
                >
                  Get in touch
                </a>
              </div>

              <div className="mt-10 flex animate-fade-up items-center gap-6 text-3xl [animation-delay:.55s]">
                {SOCIALS.map(({ Icon, href, label, cl, cd }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ ['--sl' as any]: cl, ['--sd' as any]: cd }}
                    className="text-[color:var(--sl)] transition-all duration-300 hover:-translate-y-1 dark:text-[color:var(--sd)]"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Portrait */}
            <div className="animate-fade-in [animation-delay:.4s]">
              <div className="relative mx-auto w-fit animate-float">
                {/* offset dotted frame */}
                <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border border-accent/40" />
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-transparent to-gold/20 blur-2xl" />
                <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-line/15 bg-surface shadow-2xl md:h-80 md:w-80">
                  <Image src="/img.jpg" alt="Raghav Kumar Jha" layout="fill" objectFit="cover" objectPosition="center top" />
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-bg/40 to-transparent dark:block" />
                </div>
                {/* status badge */}
                <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line/15 bg-surface px-4 py-2 font-mono text-xs shadow-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  SDE @ BitQit
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <Reveal className="elev grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.v} className="bg-surface/85 dark:bg-surface/60 px-6 py-7 text-center backdrop-blur-sm">
                <div className="font-display text-3xl font-bold text-accent md:text-4xl">{s.k}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{s.v}</div>
              </div>
            ))}
          </Reveal>

          {/* Tech marquee */}
          <div className="marquee mt-14">
            <div className="marquee-track animate-marquee">
              {[...STACK, ...STACK].map(({ Icon, name, color, light }, i) => (
                <div
                  key={i}
                  className="group mx-7 flex items-center gap-3 py-2 text-muted"
                  style={{ ['--bc' as any]: color, ['--bcl' as any]: light }}
                >
                  <Icon className="text-2xl text-[color:var(--bcl)] transition-transform duration-300 group-hover:scale-110 dark:text-[color:var(--bc)]" />
                  <span className="font-mono text-sm transition-colors duration-300 group-hover:text-ink">{name}</span>
                  <span className="ml-7 text-accent/30">/</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- ABOUT ---------- */}
          <section id="about" className="scroll-mt-24 py-24">
            <SectionHead n="01." title="About Me" />
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
              <Reveal delay={80}>
                <div className="space-y-5 text-base leading-8 text-muted md:text-lg">
                  <p>
                    Hi! I&apos;m Raghav — a{' '}
                    <span className="text-ink">Software Developer at BitQit</span>, where I
                    build scalable backend systems and full-stack products that real clients depend on.
                  </p>
                  <p>
                    I work across the stack with{' '}
                    <span className="text-accent">NestJS, Node.js, React and Next.js</span>, and I care
                    about clean architecture, performance and reliability — from cutting queue-processing
                    time by 40% to shipping CI/CD pipelines and containerised services.
                  </p>
                  <p>
                    I graduated with a B.Tech in Information Technology (9.1 CGPA) from{' '}
                    <span className="text-ink">Maharaja Agrasen Institute of Technology</span>, Delhi.
                    Off the clock, I&apos;m an avid competitive programmer with{' '}
                    <span className="text-accent">1000+ problems</span> solved.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="elev rounded-2xl border border-line/10 bg-surface/85 dark:bg-surface/60 p-7 backdrop-blur-sm">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-accent">Quick facts</h3>
                  <ul className="mt-5 space-y-4 font-mono text-sm">
                    <li className="flex items-center gap-3 text-muted">
                      <FiMapPin className="text-accent" /> Delhi, India
                    </li>
                    <li className="flex items-center gap-3 text-muted">
                      <span className="text-accent">{'>'}</span> SDE @ BitQit
                    </li>
                    <li className="flex items-center gap-3 text-muted">
                      <span className="text-accent">{'>'}</span> B.Tech IT · 9.1 CGPA · MAIT 2024
                    </li>
                    <li className="flex items-center gap-3 text-muted">
                      <span className="text-accent">{'>'}</span> 1000+ solved · 3★ CodeChef
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------- EXPERIENCE ---------- */}
          <section id="experience" className="scroll-mt-24 py-24">
            <SectionHead n="02." title="Experience" />
            <div className="relative space-y-8 border-l border-line/15 pl-8 md:pl-10">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.company} delay={i * 90} className="relative">
                  <span className="absolute -left-[41px] top-7 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-bg md:-left-[49px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <div className="elev rounded-2xl border border-line/10 bg-surface/85 p-7 backdrop-blur-sm transition-colors hover:border-accent/30 dark:bg-surface/60">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="font-display text-xl font-bold md:text-2xl">{e.role}</h3>
                        <p className="mt-1 font-mono text-sm text-accent">{e.company}</p>
                      </div>
                      <div className="font-mono text-xs text-muted sm:text-right">
                        <p>{e.period}</p>
                        <p className="mt-1">{e.location}</p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {e.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-7 text-muted">
                          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {e.stack.map((t) => (
                        <span key={t} className="rounded-md border border-line/15 px-2.5 py-1 font-mono text-[11px] text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------- PROJECTS ---------- */}
          <section id="projects" className="scroll-mt-24 py-24">
            <SectionHead n="03." title="Projects" />
            <div className="grid gap-6 md:grid-cols-2">
              {PROJECTS.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={(i % 2) * 90}
                  className="elev group relative flex flex-col overflow-hidden rounded-2xl border border-line/10 bg-surface/85 dark:bg-surface/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_70px_-30px_rgb(var(--c-accent)/0.5)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-4xl font-bold text-line/20 transition-colors group-hover:text-accent/40">
                      {p.n}
                    </span>
                    <div className="flex items-center gap-3 text-xl text-muted">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repo" className="transition-colors hover:text-accent">
                          <FiGithub />
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="transition-colors hover:text-accent">
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="relative mt-4 font-display text-2xl font-bold transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-7 text-muted">{p.desc}</p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span key={t} className="rounded-md border border-line/15 px-2.5 py-1 font-mono text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------- SKILLS ---------- */}
          <section id="skills" className="scroll-mt-24 py-24">
            <SectionHead n="04." title="Skills" />
            <div className="grid gap-6 md:grid-cols-2">
              {SKILLS.map((cat, ci) => (
                <Reveal
                  key={cat.group}
                  delay={(ci % 2) * 90}
                  className="elev rounded-2xl border border-line/10 bg-surface/85 dark:bg-surface/60 p-7 backdrop-blur-sm transition-colors hover:border-accent/30"
                >
                  <h3 className="font-display text-xl font-bold text-accent">{cat.group}</h3>
                  <ul className="mt-6 space-y-5">
                    {cat.items.map((it) => (
                      <li key={it.name}>
                        <div className="mb-2 flex items-center justify-between font-mono text-xs">
                          <span className="text-ink">{it.name}</span>
                          <span className="text-muted">{it.lvl}%</span>
                        </div>
                        <div className="bar">
                          <span className="bar-fill" style={{ ['--w' as any]: `${it.lvl}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------- ACHIEVEMENTS ---------- */}
          <section id="achievements" className="scroll-mt-24 py-24">
            <SectionHead n="05." title="Achievements" />
            <div className="relative border-l border-line/15 pl-8">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.t} delay={i * 60} className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <h3 className="font-display text-lg font-semibold md:text-xl">{a.t}</h3>
                  <p className="mt-1 text-sm text-muted">{a.d}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------- CONTACT ---------- */}
          <section id="contact" className="scroll-mt-24 py-24 text-center">
            <Reveal>
              <p className="font-mono text-sm tracking-wider text-accent">06. What&apos;s next?</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Let&apos;s build something together.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
                I&apos;m always open to connecting — whether it&apos;s about an opportunity, a
                collaboration, or just a good engineering conversation. My inbox is always open.
              </p>
              {turnstileKey && (
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                  strategy="lazyOnload"
                />
              )}
              <form
                onSubmit={onSubmit}
                className="mx-auto mt-12 max-w-xl space-y-4 text-left"
              >
                {/* Honeypot field for spam bots */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-xs text-muted">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-lg border border-line/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-xs text-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-line/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-xs text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or just say hi…"
                    className="w-full resize-y rounded-lg border border-line/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
                  />
                </div>
                {turnstileKey && (
                  <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="auto" />
                )}
                <button
                  type="submit"
                  disabled={sending || cooldown > 0}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 font-mono text-sm font-medium text-bg transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgb(var(--c-accent)/0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {cooldown > 0 ? `Please wait ${cooldown}s` : sending ? 'Sending…' : 'Send message'}
                </button>
                {formStatus && (
                  <p className={`font-mono text-sm ${formStatus.ok ? 'text-accent' : 'text-[#EA4335]'}`}>
                    {formStatus.msg}
                  </p>
                )}
              </form>

              <div className="mt-10 flex justify-center gap-7 text-3xl">
                <a href="https://www.linkedin.com/in/jharaghav/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0A66C2] transition-all duration-300 hover:-translate-y-1 dark:text-[#4493E0]">
                  <GrLinkedinOption />
                </a>
                <a href="mailto:raghavkumarjha3209@gmail.com" aria-label="Email" className="text-[#EA4335] transition-all duration-300 hover:-translate-y-1">
                  <SiGmail />
                </a>
                <a href="https://github.com/jharaghav32" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#24292F] transition-all duration-300 hover:-translate-y-1 dark:text-[#E6EDF3]">
                  <AiFillGithub />
                </a>
              </div>
            </Reveal>
          </section>
        </main>

        {/* ---------- FOOTER ---------- */}
        <footer className="border-t border-line/10 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 font-mono text-xs text-muted md:px-10">
            <p>Designed &amp; built by Raghav Kumar Jha</p>
            <p className="text-muted/60">Next.js · TypeScript · Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
