export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const SOLUTIONS = [
  {
    title: 'Web Engineering',
    subtitle: 'React · Next.js · Node.js',
    description: 'We architect and engineer high-performance web platforms that scale with your ambitions. From serverless APIs to real-time dashboards.',
    color: '#0d7c66',
  },
  {
    title: 'Mobile Experiences',
    subtitle: 'React Native · Flutter · Swift',
    description: 'Native-quality cross-platform apps that feel alive. Buttery animations, offline-first, and built for the App Store.',
    color: '#2563eb',
  },
  {
    title: 'Design Systems',
    subtitle: 'Figma · Storybook · Tokens',
    description: 'Cohesive design languages that scale across products. We build the atoms so your teams can build molecules.',
    color: '#7c3aed',
  },
  {
    title: 'Cloud Architecture',
    subtitle: 'AWS · Azure · GCP · K8s',
    description: 'Infrastructure that breathes. Auto-scaling, fault-tolerant systems designed for 99.99% uptime and global reach.',
    color: '#dc2626',
  },
  {
    title: 'AI & Automation',
    subtitle: 'LLMs · ML Pipelines · RPA',
    description: 'Intelligent systems that learn and adapt. From chatbots to predictive analytics, we integrate AI where it matters.',
    color: '#ea580c',
  },
];

export const PORTFOLIO = [
  {
    title: 'Quantum Dashboard',
    category: 'Enterprise SaaS',
    year: '2026',
    image: 'https://picsum.photos/seed/quantum-hq/1200/800',
    description: 'Real-time analytics platform processing 2M+ events/sec.',
  },
  {
    title: 'Nexus Mobile',
    category: 'iOS & Android',
    year: '2025',
    image: 'https://picsum.photos/seed/nexus-hq/1200/800',
    description: 'Fintech super-app with biometric auth and instant payments.',
  },
  {
    title: 'Solaris Brand',
    category: 'Design System',
    year: '2025',
    image: 'https://picsum.photos/seed/solaris-hq/1200/800',
    description: 'End-to-end design system serving 40+ product teams.',
  },
  {
    title: 'Aether Platform',
    category: 'Cloud Infrastructure',
    year: '2024',
    image: 'https://picsum.photos/seed/aether-hq/1200/800',
    description: 'Multi-cloud orchestration platform with zero-downtime deploys.',
  },
  {
    title: 'Titan Commerce',
    category: 'E-Commerce',
    year: '2024',
    image: 'https://picsum.photos/seed/titan-hq/1200/800',
    description: 'Headless commerce engine handling $50M+ in annual transactions.',
  },
];

export const PRODUCT_FEATURES = [
  {
    title: 'Intelligent Routing',
    description: 'ML-powered request routing that learns traffic patterns and optimizes latency in real-time.',
    metric: '40ms',
    metricLabel: 'avg. latency',
  },
  {
    title: 'Edge Computing',
    description: 'Deploy your logic to 300+ edge nodes worldwide. Your code runs where your users are.',
    metric: '300+',
    metricLabel: 'edge nodes',
  },
  {
    title: 'Auto-Scaling',
    description: 'From zero to 10 million requests without breaking a sweat. Pay only for what you use.',
    metric: '10M',
    metricLabel: 'req/min peak',
  },
  {
    title: 'Observability',
    description: 'Full-stack tracing, metrics, and logs unified in a single pane. Debug anything in seconds.',
    metric: '99.99%',
    metricLabel: 'uptime SLA',
  },
];

export const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 2499,
    description: 'For startups ready to build their first product.',
    features: [
      'Single web application',
      'Responsive design',
      'Basic analytics',
      'Email support',
      '3-month warranty',
    ],
  },
  {
    name: 'Growth',
    price: 7999,
    description: 'For scaling companies that need serious engineering.',
    features: [
      'Up to 3 applications',
      'Custom design system',
      'Advanced analytics & dashboards',
      'Priority support (24h)',
      'CI/CD pipeline setup',
      '6-month warranty',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 19999,
    description: 'For organizations building mission-critical systems.',
    features: [
      'Unlimited applications',
      'Full design system + brand guide',
      'Real-time monitoring',
      'Dedicated team (24/7)',
      'Cloud architecture & DevOps',
      'Performance optimization',
      '12-month warranty',
    ],
  },
];

export const STATS = [
  { label: 'Projects Delivered', value: 120 },
  { label: 'Enterprise Clients', value: 45 },
  { label: 'Countries Served', value: 18 },
  { label: 'Team Specialists', value: 32 },
];

export const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    role: 'CTO, NovaGrid',
    content: 'Binary Expert Systems helped us modernize our platform without slowing down delivery. The result was faster performance, cleaner architecture, and a team that could finally move with confidence.',
  },
  {
    name: 'Sophia Bennett',
    role: 'Head of Product, Helio Labs',
    content: 'They brought strategy, design, and engineering together in a way very few partners can. Every release felt sharper, faster, and more intentional than the last.',
  },
  {
    name: 'Daniel Kim',
    role: 'Founder, Atlas Commerce',
    content: 'From design system work to cloud scalability, they handled the hard problems with clarity. Our conversion rates improved and the product finally felt enterprise-ready.',
  },
];

export const BLOG_POSTS = [
  {
    title: 'Designing Fast Products for Slow Networks',
    date: 'Mar 12, 2026',
    excerpt: 'A practical look at performance-first UI decisions that keep products usable in real-world conditions.',
    image: 'https://picsum.photos/seed/bes-blog-performance/1200/800',
  },
  {
    title: 'How Modern Design Systems Reduce Engineering Drag',
    date: 'Feb 26, 2026',
    excerpt: 'Why shared components, tokens, and documentation create leverage across product and engineering teams.',
    image: 'https://picsum.photos/seed/bes-blog-design-system/1200/800',
  },
  {
    title: 'Choosing the Right Cloud Shape for Scale',
    date: 'Jan 18, 2026',
    excerpt: 'Serverless, containers, and hybrid stacks all have tradeoffs. Here is how we evaluate them for growing teams.',
    image: 'https://picsum.photos/seed/bes-blog-cloud/1200/800',
  },
];
