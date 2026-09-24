import { useState, useEffect, useRef } from "react"

/* ─── Data ──────────────────────────────────────────────────────────────── */

const services = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Performance Marketing",
    desc: "Precision-targeted paid campaigns across Google, Meta, and LinkedIn that convert at industry-beating CPAs.",
    tag: "↑ 4.2× avg. ROAS",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "SEO & Content Strategy",
    desc: "Authority-building content programs and technical SEO that compound organic traffic month over month.",
    tag: "↑ 280% avg. traffic",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
        />
      </svg>
    ),
    title: "Brand & Creative",
    desc: "Visual identity, brand voice, and creative systems that make your business impossible to forget.",
    tag: "Full brand suite",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
    title: "Social Media Management",
    desc: "Strategy, content creation, and community management that builds audiences who actually buy.",
    tag: "12K+ followers avg.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Web Design & CRO",
    desc: "High-converting landing pages and website redesigns backed by A/B testing and behavioral analytics.",
    tag: "↑ 67% avg. CVR",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Analytics & Reporting",
    desc: "Custom dashboards and monthly strategy calls that make every decision data-informed, not gut-driven.",
    tag: "Real-time data",
  },
]

const caseStudies = [
  {
    client: "Luminary Coffee",
    category: "E-commerce · SEO + Paid Social",
    headline: "From $22K to $180K monthly revenue in 8 months",
    image: "photo-1501339847302-ac426a4a7cbb",
    results: [
      { label: "Revenue growth", value: "718%" },
      { label: "ROAS", value: "5.4×" },
      { label: "Organic traffic", value: "+340%" },
    ],
    accent: "#00DFC0",
  },
  {
    client: "Vela Legal",
    category: "B2B Services · Google Ads + SEO",
    headline: "Booked 3× more client consultations in 90 days",
    image: "photo-1589829545856-d10d557cf95f",
    results: [
      { label: "Consultations", value: "3.1×" },
      { label: "Cost per lead", value: "−58%" },
      { label: "Domain authority", value: "+24pt" },
    ],
    accent: "#4DD9F7",
  },
  {
    client: "Drift Fitness",
    category: "Personal Brand · Social + Ads",
    headline: "Scaled Instagram to 84K followers and $60K in course sales",
    image: "photo-1571019613454-1cb2f99b2d8b",
    results: [
      { label: "Followers gained", value: "84K" },
      { label: "Course revenue", value: "$60K" },
      { label: "Engagement rate", value: "6.8%" },
    ],
    accent: "#00DFC0",
  },
]

const stats = [
  { value: "340+", label: "Clients served" },
  { value: "$48M", label: "Client revenue generated" },
  { value: "4.7×", label: "Average ROAS" },
  { value: "98%", label: "Client retention rate" },
]

const testimonials = [
  {
    quote:
      "Nexa didn't just run our ads — they rebuilt how we think about customer acquisition. We crossed $1M ARR six months after onboarding.",
    name: "Sara Chen",
    role: "Founder, Luminary Coffee",
    avatar: "photo-1494790108377-be9c29b29330",
  },
  {
    quote:
      "Our organic traffic tripled and we actually understand why now. The monthly strategy sessions alone are worth the retainer fee.",
    name: "Marcus Webb",
    role: "CEO, Vela Legal",
    avatar: "photo-1500648767791-00dcc994a43e",
  },
  {
    quote:
      "I've worked with three agencies before Nexa. The difference is that these people think like owners. They care about actual results.",
    name: "Jordan Ellis",
    role: "Creator, Drift Fitness",
    avatar: "photo-1438761681033-6461ffad8d80",
  },
]

const navLinks = ["Services", "Work", "Results", "About", "Contact"]

const clientLogos = [
  "Luminary",
  "Vela Legal",
  "Drift",
  "Arkive",
  "Fable Co.",
  "Solara",
  "Kova Studio",
  "Harrow",
]

/* ─── Components ────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8, 13, 26, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span
            className="w-7 h-7 rounded-sm flex items-center justify-center"
            style={{ background: "var(--primary)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4"
              style={{ color: "var(--primary-foreground)" }}
            >
              <path
                d="M4 20L12 4L20 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 14H17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            className="font-display text-xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Nexa<span style={{ color: "var(--primary)" }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="link-hover text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--secondary-foreground)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--secondary-foreground)")
              }
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="px-5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-200"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00f5d3"
              e.currentTarget.style.boxShadow = "0 0 24px rgba(0,223,192,0.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--primary)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            Free Consultation
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--foreground)" }}
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-6 flex flex-col gap-4"
          style={{
            background: "rgba(8,13,26,0.98)",
            borderColor: "var(--border)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium py-1"
              style={{ color: "var(--secondary-foreground)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 px-5 py-2.5 text-sm font-semibold text-center rounded-sm"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Free Consultation
          </a>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,223,192,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,223,192,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,223,192,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(77,217,247,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="section-ornament" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                Digital Growth Agency
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8">
              <span style={{ color: "var(--foreground)" }}>We make </span>
              <span className="text-gradient italic">small brands</span>
              <br />
              <span style={{ color: "var(--foreground)" }}>into market</span>
              <br />
              <span style={{ color: "var(--foreground)" }}>leaders.</span>
            </h1>

            <p
              className="text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: "var(--secondary-foreground)" }}
            >
              Nexa Digital is a full-service marketing agency that combines
              data-driven strategy with bold creative to accelerate growth for
              startups, small businesses, and personal brands.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold rounded-sm transition-all duration-200"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#00f5d3"
                  e.currentTarget.style.boxShadow =
                    "0 0 32px rgba(0,223,192,0.4)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--primary)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                Get a Free Consultation
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold rounded-sm border transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,223,192,0.4)"
                  e.currentTarget.style.background = "rgba(0,223,192,0.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)"
                  e.currentTarget.style.background = "transparent"
                }}
              >
                View Our Work
              </a>
            </div>

            {/* Social proof mini strip */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex -space-x-2">
                {[
                  "photo-1494790108377-be9c29b29330",
                  "photo-1500648767791-00dcc994a43e",
                  "photo-1438761681033-6461ffad8d80",
                ].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&auto=format`}
                    alt="Client"
                    className="w-9 h-9 rounded-full border-2 object-cover"
                    style={{ borderColor: "var(--background)" }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      className="w-3 h-3"
                      style={{ color: "var(--primary)" }}
                    >
                      <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8l-2.78 1.46.53-3.09L1.5 4.27l3.11-.45z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    4.9 / 5
                  </span>{" "}
                  from 340+ clients
                </p>
              </div>
            </div>
          </div>

          {/* Right: visual card stack */}
          <div className="lg:col-span-5 relative h-[480px] hidden lg:block">
            {/* Main image */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=640&fit=crop&auto=format"
                alt="Digital marketing analytics dashboard"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.8) brightness(0.9)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,223,192,0.08) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating metric card 1 */}
            <div
              className="absolute bottom-16 left-0 px-5 py-4 rounded-sm glow-accent-sm"
              style={{
                background: "var(--card)",
                border: "1px solid rgba(0,223,192,0.2)",
                minWidth: "180px",
              }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Monthly Revenue
              </p>
              <p
                className="font-display text-2xl font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                $148,400
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--primary)" }}
                >
                  ↑ 34.2%
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  vs last month
                </span>
              </div>
            </div>

            {/* Floating metric card 2 */}
            <div
              className="absolute top-52 left-8 px-5 py-4 rounded-sm"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                minWidth: "160px",
              }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Conversion Rate
              </p>
              <p
                className="font-display text-2xl font-semibold"
                style={{ color: "var(--primary)" }}
              >
                6.8%
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Industry avg. 2.4%
              </p>
            </div>

            {/* Decorative line */}
            <div
              className="absolute top-40 right-4 w-px h-32 opacity-30"
              style={{
                background:
                  "linear-gradient(to bottom, var(--primary), transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </section>
  )
}

function ClientLogos() {
  return (
    <section
      className="py-16 border-t border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p
          className="text-center text-xs font-semibold tracking-widest uppercase mb-10"
          style={{ color: "var(--muted-foreground)" }}
        >
          Trusted by 340+ growing businesses
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {clientLogos.map((logo) => (
            <span
              key={logo}
              className="font-display text-lg font-medium tracking-tight transition-colors duration-200 cursor-default"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-ornament" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                What We Do
              </span>
            </div>
            <h2
              className="font-display text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              Everything you need
              <br />
              to grow online.
            </h2>
          </div>
          <div className="flex items-end">
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--secondary-foreground)" }}
            >
              We don't believe in siloed tactics. Every service we offer
              connects to a unified growth strategy built around your specific
              goals, audience, and budget.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "var(--border)" }}
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="group p-8 card-lift cursor-default"
              style={{ background: "var(--background)" }}
            >
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(0,223,192,0.1)",
                  color: "var(--primary)",
                }}
              >
                {s.icon}
              </div>
              <h3
                className="font-display text-xl font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--secondary-foreground)" }}
              >
                {s.desc}
              </p>
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-sm"
                style={{
                  background: "rgba(0,223,192,0.1)",
                  color: "var(--primary)",
                }}
              >
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  const [active, setActive] = useState(0)
  const cs = caseStudies[active]

  return (
    <section
      id="work"
      className="py-28"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-ornament" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                Case Studies
              </span>
            </div>
            <h2
              className="font-display text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              Results, not promises.
            </h2>
          </div>
          {/* Tabs */}
          <div className="flex gap-2">
            {caseStudies.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-200"
                style={{
                  background: active === i ? "var(--primary)" : "var(--muted)",
                  color:
                    active === i
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                }}
              >
                {c.client}
              </button>
            ))}
          </div>
        </div>

        {/* Active case */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Image */}
          <div
            className="lg:col-span-7 relative overflow-hidden rounded-sm"
            style={{ minHeight: "400px" }}
          >
            <img
              key={active}
              src={`https://images.unsplash.com/${cs.image}?w=900&h=600&fit=crop&auto=format`}
              alt={cs.client}
              className="w-full h-full object-cover absolute inset-0"
              style={{ filter: "saturate(0.75) brightness(0.7)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(8,13,26,0.8) 0%, rgba(8,13,26,0.1) 100%)",
              }}
            />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 p-8">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--primary)" }}
              >
                {cs.category}
              </p>
              <h3
                className="font-display text-2xl lg:text-3xl font-semibold leading-tight max-w-sm"
                style={{ color: "var(--foreground)" }}
              >
                {cs.headline}
              </h3>
            </div>
          </div>

          {/* Metrics panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {cs.results.map((r, i) => (
                <div
                  key={i}
                  className="p-6 rounded-sm flex items-center justify-between"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--secondary-foreground)" }}
                  >
                    {r.label}
                  </span>
                  <span className="font-display text-3xl font-semibold text-gradient">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 w-full py-4 text-sm font-semibold rounded-sm border transition-all duration-200"
              style={{
                borderColor: "rgba(0,223,192,0.3)",
                color: "var(--primary)",
                background: "rgba(0,223,192,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,223,192,0.1)"
                e.currentTarget.style.borderColor = "rgba(0,223,192,0.5)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,223,192,0.04)"
                e.currentTarget.style.borderColor = "rgba(0,223,192,0.3)"
              }}
            >
              Want results like these?
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountUp({ target, suffix = "" }: { target: number suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const step = target / steps
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + step, target)
            setCount(Math.round(current))
            if (current >= target) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function Results() {
  return (
    <section id="results" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="section-ornament" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--primary)" }}
            >
              The Numbers
            </span>
            <span
              className="section-ornament"
              style={{ marginRight: 0, marginLeft: 0 }}
            />
          </div>
          <h2
            className="font-display text-4xl lg:text-5xl font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            We measure success
            <br />
            in your growth.
          </h2>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--border)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="py-12 px-8 text-center"
              style={{ background: "var(--background)" }}
            >
              <p className="font-display text-5xl lg:text-6xl font-semibold mb-3 text-gradient">
                {s.value}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--secondary-foreground)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-20 grid lg:grid-cols-4 gap-8">
          {[
            "Discovery & Audit",
            "Strategy Sprint",
            "Launch & Optimize",
            "Scale & Report",
          ].map((step, i) => (
            <div key={i} className="relative">
              {i < 3 && (
                <div
                  className="hidden lg:block absolute top-5 left-full w-full h-px z-10"
                  style={{
                    background:
                      "linear-gradient(to right, var(--primary), transparent)",
                    opacity: 0.3,
                  }}
                />
              )}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold font-display shrink-0"
                  style={{
                    background: "rgba(0,223,192,0.1)",
                    color: "var(--primary)",
                    border: "1px solid rgba(0,223,192,0.2)",
                  }}
                >
                  0{i + 1}
                </span>
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {step}
                </h4>
              </div>
              <p
                className="text-xs leading-relaxed pl-13"
                style={{
                  color: "var(--muted-foreground)",
                  paddingLeft: "52px",
                }}
              >
                {
                  [
                    "We audit your existing digital presence, competitors, and market opportunity.",
                    "We build a custom 90-day roadmap with channels, budget allocation, and KPIs.",
                    "We execute, test, and iterate — rapidly improving performance week over week.",
                    "Monthly strategy calls and transparent reporting keep you in full control.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % testimonials.length),
      5000,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-28" style={{ background: "var(--secondary)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-ornament" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                Clients Say
              </span>
            </div>
            <h2
              className="font-display text-3xl lg:text-4xl font-semibold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              Don't take
              <br />
              our word
              <br />
              for it.
            </h2>
            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "32px" : "8px",
                    background:
                      active === i ? "var(--primary)" : "var(--muted)",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="lg:col-span-9 grid sm:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-7 rounded-xl transition-all duration-300 card-lift h-fullopacity: 1,
transform: 'scale(1)',opacity: 1,
transform: 'scale(1)',opacity: 1,
transform: 'scale(1)',"
                style={{
                  background: "var(--card)",
                  border: `1px solid ${
                    active === i ? "rgba(0,223,192,0.25)" : "var(--border)"
                  }`,
                  opacity: 1,
                  transform: "scale()",
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      className="w-3 h-3"
                      style={{ color: "var(--primary)" }}
                    >
                      <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8l-2.78 1.46.53-3.09L1.5 4.27l3.11-.45z" />
                    </svg>
                  ))}
                </div>
                <blockquote
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--secondary-foreground)" }}
                >
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/${t.avatar}?w=48&h=48&fit=crop&auto=format`}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const team = [
  {
    name: "Priya Nair",
    role: "Founder & CEO",
    img: "photo-1487412720507-e7ab37603c6f",
    bio: "12 years building growth engines for VC-backed startups and Fortune 500s.",
  },
  {
    name: "Daniel Osei",
    role: "Head of Performance",
    img: "photo-1531746020798-e6953c6e8e04",
    bio: "Former Google Ads lead. Managed $40M+ in annual ad spend across 6 verticals.",
  },
  {
    name: "Clara Voss",
    role: "Creative Director",
    img: "photo-1614644147798-f8c0fc9da7f6",
    bio: "Brand strategist and designer whose work has been featured in Awwwards and HOW.",
  },
  {
    name: "James Tran",
    role: "SEO & Content Lead",
    img: "photo-1500648767791-00dcc994a43e",
    bio: "Built organic programs that generate 2M+ monthly visits for B2B and e-commerce brands.",
  },
]

function About() {
  return (
    <section
      id="about"
      className="py-28"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-ornament" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                About Nexa
              </span>
            </div>
            <h2
              className="font-display text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              Built by marketers
              <br />
              <span className="italic text-gradient">
                obsessed with growth.
              </span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--secondary-foreground)" }}
            >
              Founded in 2018, Nexa Digital started with a simple belief: small
              businesses deserve the same caliber of marketing strategy that
              enterprise companies take for granted. We built a team of
              ex-agency, ex-brand, and ex-platform specialists and put them
              entirely in service of founders and growing teams.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--secondary-foreground)" }}
            >
              Today we work with 340+ clients across e-commerce, professional
              services, SaaS, and personal brands — and we measure our success
              exclusively by theirs.
            </p>
          </div>
        </div>

        {/* Values row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-20"
          style={{ background: "var(--border)" }}
        >
          {[
            {
              label: "Transparency first",
              desc: "Every invoice, every metric, every decision — explained in plain language, always.",
            },
            {
              label: "Owners' mindset",
              desc: "We spend your budget like it's ours. That means no vanity metrics, no wasted impressions.",
            },
            {
              label: "Results or nothing",
              desc: "We don't retain clients on contracts. We retain them by being too valuable to leave.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="p-8"
              style={{ background: "var(--background)" }}
            >
              <div
                className="w-8 h-0.5 mb-5"
                style={{ background: "var(--primary)" }}
              />
              <h4
                className="font-display text-lg font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {v.label}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--secondary-foreground)" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-10"
            style={{ color: "var(--muted-foreground)" }}
          >
            The Team
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="group card-lift"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    height: "220px",
                    borderRadius: "var(--radius) var(--radius) 0 0",
                  }}
                >
                  <img
                    src={`https://images.unsplash.com/${member.img}?w=400&h=440&fit=crop&auto=format`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "saturate(0.8) brightness(0.85)" }}
                  />
                </div>
                <div className="p-5">
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "var(--foreground)" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-xs font-medium mb-3"
                    style={{ color: "var(--primary)" }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,223,192,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-ornament" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                Get Started
              </span>
            </div>
            <h2
              className="font-display text-4xl lg:text-5xl font-semibold leading-tight mb-6"
              style={{ color: "var(--foreground)" }}
            >
              Ready to grow?
              <br />
              <span className="italic text-gradient">Let's talk.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--secondary-foreground)" }}
            >
              Book a free 30-minute consultation. We'll audit your current
              marketing, identify your biggest growth levers, and show you
              exactly how we'd approach your business.
            </p>

            {/* Guarantees */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "✓",
                  text: "No commitment required — the consultation is 100% free",
                },
                {
                  icon: "✓",
                  text: "Custom growth audit delivered within 48 hours",
                },
                {
                  icon: "✓",
                  text: "We only take on clients we know we can help",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="text-sm font-bold shrink-0 mt-0.5"
                    style={{ color: "var(--primary)" }}
                  >
                    {item.icon}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--secondary-foreground)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className="p-8 rounded-sm"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "rgba(0,223,192,0.1)",
                    color: "var(--primary)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3
                  className="font-display text-2xl font-semibold mb-3"
                  style={{ color: "var(--foreground)" }}
                >
                  You're on the list.
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--secondary-foreground)" }}
                >
                  Expect a calendar invite from us within 24 hours. We look
                  forward to learning about your business.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3
                  className="font-display text-xl font-semibold mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  Book your free consultation
                </h3>
                <p
                  className="text-xs mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Usually responds within 4 business hours.
                </p>

                {[
                  {
                    key: "name",
                    label: "Your Name",
                    placeholder: "Jane Smith",
                    type: "text",
                  },
                  {
                    key: "email",
                    label: "Business Email",
                    placeholder: "jane@yourbrand.com",
                    type: "email",
                  },
                  {
                    key: "business",
                    label: "Business / Brand",
                    placeholder: "What do you do?",
                    type: "text",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={formData[(field.key as keyof typeof formData)]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-all duration-200"
                      style={{
                        background: "var(--secondary)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(0,223,192,0.4)"
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(0,223,192,0.07)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    What's your biggest marketing challenge? (optional)
                  </label>
                  <textarea
                    placeholder="Tell us what's not working, or where you want to grow..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 text-sm rounded-sm outline-none resize-none transition-all duration-200"
                    style={{
                      background: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,223,192,0.4)"
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(0,223,192,0.07)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)"
                      e.target.style.boxShadow = "none"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold rounded-sm transition-all duration-200 mt-1"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#00f5d3"
                    e.currentTarget.style.boxShadow =
                      "0 0 28px rgba(0,223,192,0.35)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--primary)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  Book My Free Consultation →
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  No spam. No commitment. Just strategy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-7 h-7 rounded-sm flex items-center justify-center"
                style={{ background: "var(--primary)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  style={{ color: "var(--primary-foreground)" }}
                >
                  <path
                    d="M4 20L12 4L20 20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 14H17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span
                className="font-display text-xl font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Nexa<span style={{ color: "var(--primary)" }}>.</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              A full-service digital marketing agency helping small businesses
              and personal brands scale faster than they thought possible.
            </p>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Performance Marketing",
                "SEO & Content",
                "Brand & Creative",
                "Social Media",
                "Web Design & CRO",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm link-hover transition-colors duration-200"
                    style={{ color: "var(--secondary-foreground)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--foreground)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--secondary-foreground)")
                    }
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {["About Us", "Case Studies", "Blog", "Careers", "Contact"].map(
                (s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="text-sm link-hover transition-colors duration-200"
                      style={{ color: "var(--secondary-foreground)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--secondary-foreground)")
                      }
                    >
                      {s}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © 2026 Nexa Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs link-hover"
                style={{ color: "var(--muted-foreground)" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ───────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <CaseStudies />
        <Results />
        <Testimonials />
        <About />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}
