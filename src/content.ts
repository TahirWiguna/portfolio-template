export const profile = {
  name: 'Ari Calder',
  role: 'Senior software engineer',
  focus: 'event-driven backends and the interfaces on top of them',
  location: 'Lisbon, Portugal',
  city: 'Lisbon',
  timeZone: 'Europe/Lisbon',
  availability: 'Open to senior & staff roles',
  email: 'ari.calder@example.com',
  resumeUrl: '/resume.pdf',
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
} as const

export const hero = {
  flaps: ['DISTRIBUTED SYSTEMS', 'PRODUCT INTERFACES', 'DEVELOPER TOOLING'],
  statement:
    'Eight years building event-driven backends and the interfaces on top of them. Calm under load, clear on screen.',
} as const

export const ticker = ['Open to senior & staff roles', 'Based in Lisbon', 'Replies within two working days'] as const

export type DiagramKind = 'stream' | 'ledger' | 'trace' | 'grid'

export type Project = {
  id: string
  title: string
  company: string
  year: string
  role: string
  summary: string
  outcome: string
  stack: readonly string[]
  diagram: DiagramKind
}

export const projects: readonly Project[] = [
  {
    id: 'dispatch',
    title: 'Dispatch event backbone',
    company: 'Orbitwell Logistics',
    year: '2022',
    role: 'Tech lead, platform',
    summary:
      'Order dispatch ran on nightly batch jobs and a polling loop nobody wanted to touch. I designed the event backbone that replaced it and moved every dispatch service onto it without a release freeze.',
    outcome: 'Drivers see route changes as they happen, not the next morning.',
    stack: ['Go', 'Kafka', 'Postgres', 'gRPC'],
    diagram: 'stream',
  },
  {
    id: 'ledger',
    title: 'Ledger reconciliation engine',
    company: 'Tidewell Pay',
    year: '2024',
    role: 'Senior engineer',
    summary:
      'Payouts were reconciled by hand from three bank exports. I built an idempotent ingestion pipeline with double-entry checks, so every cent has a matching line or a named exception.',
    outcome: 'Finance closes the month from a dashboard instead of a spreadsheet.',
    stack: ['Rust', 'Postgres', 'Temporal'],
    diagram: 'ledger',
  },
  {
    id: 'traces',
    title: 'On-call trace explorer',
    company: 'Tidewell Pay',
    year: '2025',
    role: 'Senior engineer',
    summary:
      'A WebGL flame view for distributed traces that stays smooth on very large requests, built for whoever is holding the pager at 3 a.m.',
    outcome: 'Incidents open with the slow span already highlighted.',
    stack: ['TypeScript', 'React', 'WebGL', 'OpenTelemetry'],
    diagram: 'trace',
  },
  {
    id: 'fernhaus',
    title: 'Fernhaus component system',
    company: 'Fernhaus Studio',
    year: '2019',
    role: 'Frontend engineer',
    summary:
      'Design tokens and accessible React components shared by every client project, with keyboard and screen-reader checks running in CI.',
    outcome: 'New client sites start from a tested kit, not a blank repo.',
    stack: ['TypeScript', 'React', 'Storybook'],
    diagram: 'grid',
  },
]

export const experience = [
  {
    period: '2023–now',
    company: 'Tidewell Pay',
    role: 'Senior software engineer, Payments platform',
    impact: 'Own reconciliation and the on-call tooling around it.',
    stack: 'Rust · Go · Postgres',
  },
  {
    period: '2020–2023',
    company: 'Orbitwell Logistics',
    role: 'Software engineer, then tech lead',
    impact: 'Led the move from batch jobs to an event-driven dispatch backbone.',
    stack: 'Go · Kafka · gRPC',
  },
  {
    period: '2018–2020',
    company: 'Fernhaus Studio',
    role: 'Frontend engineer',
    impact: 'Built the shared component system behind every client launch.',
    stack: 'TypeScript · React',
  },
  {
    period: '2017–2018',
    company: 'Quillstack',
    role: 'Junior developer',
    impact: 'Shipped billing and admin features for a five-person SaaS team.',
    stack: 'Python · Django',
  },
] as const

export const about = {
  statement:
    'I build the quiet parts of software: the queues, ledgers and traces that keep a product honest, and the interfaces that make them legible to the people on call. Eight years in, I still care most about the boring guarantees.',
  facts: [
    { term: 'Based in', detail: 'Lisbon, Portugal' },
    { term: 'Focus', detail: 'Distributed systems, product interfaces' },
    { term: 'Now', detail: 'Learning Zig on weekends' },
  ],
  tools: [
    'Go',
    'Rust',
    'TypeScript',
    'SQL',
    'Kafka',
    'Postgres',
    'Temporal',
    'gRPC',
    'React',
    'WebGL',
    'Tailwind',
    'Kubernetes',
    'Terraform',
    'OpenTelemetry',
    'AWS',
  ],
} as const

export const quote = {
  text: 'Ari makes hard systems feel calm. The quarter Ari joined, our on-call rotation finally went quiet.',
  author: 'Mara Ilunga',
  title: 'VP Engineering, Orbitwell Logistics',
} as const

export const contact = {
  heading: 'Have a role in mind?',
  lead: 'Tell me about the team and the problem you’re hiring for. I reply within two working days.',
} as const

export const closing = 'Good software is quiet. Let’s build some.'
