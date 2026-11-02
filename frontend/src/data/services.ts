export interface ServiceOutcome {
  title: string
  description: string
  highlight: string
}

export interface ServiceDeliverable {
  title: string
  description: string
  details: string[]
}

export interface ServiceProcessStep {
  number: string
  title: string
  duration: string
  description: string
}

// A real project from the team's own portfolios that shows the skills behind this service.
// BrandPulse is pre-revenue, so these are not client case studies and must not be presented as such.
export interface ServiceTeamProof {
  project: string
  builtBy: string
  context: string
  problem: string
  approach: string
  relevance: string
  link?: { label: string; href: string }
}

export interface ServiceData {
  id: string
  slug: string
  number: string
  name: string
  headline: string
  subhead: string
  shortOutcome: string
  image: string
  floatingParts: {
    name: string
    spec: string
    dir: 'left' | 'right'
  }[]
  businessOutcomes: ServiceOutcome[]
  deliverables: ServiceDeliverable[]
  expectations: {
    value: string
    label: string
    subtext: string
  }[]
  processSteps: ServiceProcessStep[]
  teamProof: ServiceTeamProof
  ctaHeadline: string
  ctaSubhead: string
}

export const SERVICES: ServiceData[] = [
  {
    id: 'ai-solutions',
    slug: 'ai-solutions',
    number: '01',
    name: 'AI Solutions',
    headline: 'Put AI to Work on the Tasks That Eat Your Day.',
    subhead: 'We build practical AI tools for your business or idea: chat assistants that answer customer questions, automations that handle repetitive work, and tools that turn your data into clear answers.',
    shortOutcome: 'Automate repetitive work, answer customer questions instantly, and get insights from your data.',
    image: '/assets/services/service-ai.png',
    floatingParts: [
      { name: 'Smart Assistant', spec: 'Answers questions from your own documents', dir: 'left' },
      { name: 'Knowledge Base', spec: 'Your FAQs, policies and price lists in one place', dir: 'right' },
      { name: 'Workflow Automation', spec: 'Repetitive steps handled automatically', dir: 'left' },
      { name: 'Human Check', spec: 'A person reviews anything important', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Faster Replies to Customers',
        description: 'An AI assistant on your website or WhatsApp that answers common questions about your products, prices and policies at any hour.',
        highlight: 'Always-on answers'
      },
      {
        title: 'Less Copy-Paste Work',
        description: 'Automate the repetitive tasks your team does every day, such as moving data between sheets, forms and email, so they can focus on real work.',
        highlight: 'Hours back every week'
      },
      {
        title: 'Clear Answers From Your Data',
        description: 'Turn spreadsheets, sales records and feedback into plain-language summaries and charts you can act on.',
        highlight: 'Decisions backed by data'
      }
    ],
    deliverables: [
      {
        title: 'AI Chat Assistant for Your Business',
        description: 'A chatbot trained on your own documents, FAQs and product details, for your website, WhatsApp or internal team.',
        details: ['Answers from your own content', 'Hands over to a person when needed', 'Easy to update as your business changes']
      },
      {
        title: 'Workflow Automation',
        description: 'Automations that connect the tools you already use, built with Python and tools like n8n.',
        details: ['Form, email and sheet automations', 'Lead capture and follow-up', 'Daily or weekly summary reports']
      },
      {
        title: 'Data Analysis and Prediction Tools',
        description: 'Machine learning models and dashboards that spot patterns, forecast demand or score risk from your data.',
        details: ['Cleaning and organising your data', 'Prediction models in plain language', 'Simple dashboards your team can use']
      }
    ],
    expectations: [
      { value: 'FREE', label: 'FIRST CALL', subtext: 'We look at where AI can actually help before you spend anything' },
      { value: '2–4 WKS', label: 'TYPICAL FIRST VERSION', subtext: 'For a focused assistant or automation, depending on scope' },
      { value: 'PILOT', label: 'START SMALL', subtext: 'Try it on one task first, then expand what works' }
    ],
    processSteps: [
      { number: '01', title: 'Find the Right Task', duration: 'Week 1', description: 'We look at your daily work and pick the task where AI saves the most time or effort.' },
      { number: '02', title: 'Build a Pilot', duration: 'Week 2', description: 'We build a working version and test it on your real examples before going further.' },
      { number: '03', title: 'Connect Your Tools', duration: 'Weeks 3-4', description: 'We connect it to your website, WhatsApp, sheets or other tools you already use.' },
      { number: '04', title: 'Improve and Support', duration: 'Ongoing', description: 'We watch how it performs, fix gaps and improve answers as you use it.' }
    ],
    teamProof: {
      project: 'AutoEDA: LLM-Powered Data Analysis',
      builtBy: 'Varad',
      context: 'Personal project',
      problem: 'Exploring a new dataset by hand (cleaning it, finding patterns and writing up what it means) takes hours of repetitive work.',
      approach: 'A tool that cleans and encodes a raw dataset, runs the analysis automatically and uses an LLM to explain the findings in plain language, through a simple Gradio interface.',
      relevance: 'The same approach powers the AI tools we build for clients: take messy information, automate the busywork, and give people clear answers.',
      link: { label: 'View on GitHub', href: 'https://github.com/Varadpendkar/LLM-Data-Explorer' }
    },
    ctaHeadline: 'Have a Task You Wish a Computer Could Do for You?',
    ctaSubhead: 'Tell us about it on a free call and we will tell you honestly whether AI is the right fit.'
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    number: '02',
    name: 'Digital Marketing',
    headline: 'Get Found by the People Who Need What You Offer.',
    subhead: 'Social media, search, ads and content that bring real customers, not just likes. We set up the tracking so you can see what is working and where your money goes.',
    shortOutcome: 'Reach the right customers, grow your social presence, and know what your marketing spend returns.',
    image: '/assets/services/service-marketing.png',
    floatingParts: [
      { name: 'Clear Tracking', spec: 'See which channel brings customers', dir: 'left' },
      { name: 'Content Calendar', spec: 'Planned posts, reels and campaigns', dir: 'right' },
      { name: 'Landing Pages', spec: 'Pages built to turn visitors into enquiries', dir: 'left' },
      { name: 'Retargeting', spec: 'Stay in front of interested visitors', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'More of the Right Enquiries',
        description: 'Campaigns aimed at the people most likely to buy from you, whether you are a local shop, a startup or a personal brand.',
        highlight: 'Better-quality leads'
      },
      {
        title: 'Know Where Your Money Goes',
        description: 'Simple tracking and reports that show which posts, ads and channels actually bring customers, so you stop paying for what does not.',
        highlight: 'No guesswork'
      },
      {
        title: 'A Brand People Remember',
        description: 'Consistent visuals, messaging and content across Instagram, LinkedIn, Google and your website.',
        highlight: 'Consistent presence'
      }
    ],
    deliverables: [
      {
        title: 'Social Media Management',
        description: 'Content planning, posting and engagement for Instagram, LinkedIn and other platforms your customers use.',
        details: ['Monthly content calendar', 'Post and reel design', 'Scheduling and basic analytics']
      },
      {
        title: 'Search and Paid Ads',
        description: 'Google, Meta and LinkedIn campaigns set up around a clear budget and goal, plus basic SEO for your website.',
        details: ['Google Business Profile setup', 'Conversion tracking', 'Budget-aware campaign setup']
      },
      {
        title: 'Landing Pages and Email Follow-Up',
        description: 'Fast pages that explain your offer clearly, with forms that reach you instantly and follow-up emails that keep leads warm.',
        details: ['Mobile-friendly landing pages', 'Lead forms connected to email or WhatsApp', 'Automated follow-up sequences']
      }
    ],
    expectations: [
      { value: 'FREE', label: 'FIRST REVIEW', subtext: 'We look at your current online presence and suggest quick wins' },
      { value: 'MONTHLY', label: 'CLEAR REPORTS', subtext: 'What we did, what it cost and what it brought in' },
      { value: 'YOUR', label: 'BUDGET, YOUR CALL', subtext: 'Plans sized to what you can spend, from small tests upward' }
    ],
    processSteps: [
      { number: '01', title: 'Audience and Offer', duration: 'Week 1', description: 'We work out who your best customers are and how to explain your offer to them.' },
      { number: '02', title: 'Set Up the Basics', duration: 'Week 2', description: 'Profiles, tracking, landing pages and a content plan, ready before any money is spent on ads.' },
      { number: '03', title: 'Launch and Test', duration: 'Weeks 3-4', description: 'We launch small campaigns and content, then check results every week.' },
      { number: '04', title: 'Grow What Works', duration: 'Ongoing', description: 'We put more effort and budget behind what brings customers and drop what does not.' }
    ],
    teamProof: {
      project: 'Social Media Marketing Automation Tool',
      builtBy: 'Atharva',
      context: 'Personal project',
      problem: 'Posting regularly across platforms and working out which posts perform takes time most small teams do not have.',
      approach: 'A content scheduler that automates social posting, with engagement prediction and an analytics dashboard. Atharva also led PR for a 40+ member college coding club, running its social media and events.',
      relevance: 'We combine marketing know-how with automation, so your content goes out on time and you can see what is working.',
      link: { label: 'View GitHub profile', href: 'https://github.com/Atharva-Kulkarni-694' }
    },
    ctaHeadline: 'Want More People to Find Your Business?',
    ctaSubhead: 'Book a free call and we will review your current online presence with you.'
  },
  {
    id: 'product-building',
    slug: 'product-building',
    number: '03',
    name: 'Product Building',
    headline: 'Websites, Apps and Software That Bring Your Idea to Life.',
    subhead: 'From a portfolio site or a shop website to a full web app for your startup. We design, build and launch it, and explain every step in plain language.',
    shortOutcome: 'Launch websites, web apps and software products built to grow with you.',
    image: '/assets/services/service-product.png',
    floatingParts: [
      { name: 'Fast, Modern Frontend', spec: 'Works smoothly on any phone or laptop', dir: 'left' },
      { name: 'Reliable Backend', spec: 'Secure logins, data and APIs', dir: 'right' },
      { name: 'Cloud Hosting', spec: 'Deployed and ready to scale', dir: 'left' },
      { name: 'Interactive Visuals', spec: 'Animation and 3D where it adds value', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Go From Idea to Launch',
        description: 'We turn your idea into a working product you can show customers, investors or recruiters, without you needing to code.',
        highlight: 'Idea to live product'
      },
      {
        title: 'Fast on Every Device',
        description: 'Sites and apps that load quickly and work well on phones, where most of your visitors are.',
        highlight: 'Mobile-first'
      },
      {
        title: 'Easy to Grow Later',
        description: 'Clean, well-organised code, so adding features or handing it to another developer later is straightforward.',
        highlight: 'Built to extend'
      }
    ],
    deliverables: [
      {
        title: 'Websites and Portfolios',
        description: 'Business websites, landing pages and personal portfolios for founders, freelancers, students and professionals.',
        details: ['Mobile-friendly design', 'Contact forms and WhatsApp links', 'Basic SEO and analytics']
      },
      {
        title: 'Custom Web Applications',
        description: 'Web apps with logins, dashboards and databases, built with React, FastAPI, Flask and other modern tools.',
        details: ['User accounts and roles', 'Dashboards and admin panels', 'Payment and third-party integrations']
      },
      {
        title: 'MVPs for Startups',
        description: 'A focused first version of your product to test with real users before you invest more.',
        details: ['Clickable prototype first', 'Core features only', 'Feedback-driven improvements']
      }
    ],
    expectations: [
      { value: '~2 WKS', label: 'FIRST WORKING VERSION', subtext: 'For most projects we aim to show you something you can click within two weeks' },
      { value: 'WEEKLY', label: 'PROGRESS UPDATES', subtext: 'You see the product take shape, not just a final reveal' },
      { value: 'HANDOVER', label: 'CODE AND ACCESS', subtext: 'Source code, hosting and accounts handed over at the end' }
    ],
    processSteps: [
      { number: '01', title: 'Plan the Screens', duration: 'Week 1', description: 'We map what users need to do and sketch the key screens with you.' },
      { number: '02', title: 'Clickable Prototype', duration: 'Weeks 1-2', description: 'A working prototype you can try and share for feedback before the full build.' },
      { number: '03', title: 'Build It Properly', duration: 'Weeks 3-6', description: 'We build the real product, test it, and fix issues as we go.' },
      { number: '04', title: 'Launch and Support', duration: 'Ongoing', description: 'We deploy it, hand it over, and stay available for fixes and new features.' }
    ],
    teamProof: {
      project: 'Financial Health Predictor',
      builtBy: 'Abhijeet',
      context: 'Personal project',
      problem: 'Most people lack a simple, data-driven view of their finances, and generic budgeting advice ignores their situation.',
      approach: 'A full-stack web app: a React dashboard collects five monthly figures, a Flask API scores them with a machine learning model, and an LLM writes personalised recommendations. Results are charted and saved for comparison.',
      relevance: 'It shows the full path we follow for clients: understand the problem, design the screens, build the frontend and backend, and ship it.',
      link: { label: 'View on GitHub', href: 'https://github.com/abhijeet2028/Finance_health_preditor' }
    },
    ctaHeadline: 'Have an Idea You Want to Build?',
    ctaSubhead: 'Tell us about it on a free call. We will suggest the simplest way to get a first version live.'
  },
  {
    id: 'erp-systems',
    slug: 'erp-systems',
    number: '04',
    name: 'ERP Systems',
    headline: 'Run Your Whole Business From One Place.',
    subhead: 'Replace scattered spreadsheets and registers with one simple system for stock, orders, billing and staff, built around how your business actually works.',
    shortOutcome: 'Bring stock, orders, billing and staff into one simple, real-time system.',
    image: '/assets/services/service-erp.png',
    floatingParts: [
      { name: 'Live Stock Tracking', spec: 'Know what you have, where', dir: 'left' },
      { name: 'Billing and Accounts', spec: 'Invoices and GST-ready records', dir: 'right' },
      { name: 'Purchase Orders', spec: 'Reorder before you run out', dir: 'left' },
      { name: 'Owner Dashboard', spec: 'Your business at a glance', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'One Version of the Truth',
        description: 'Stock, orders, payments and staff data in one place, so everyone works from the same numbers.',
        highlight: 'No more scattered sheets'
      },
      {
        title: 'Fewer Manual Mistakes',
        description: 'Orders, stock and invoices update each other automatically instead of being copied by hand.',
        highlight: 'Less double entry'
      },
      {
        title: 'Records Ready When You Need Them',
        description: 'Clean records for your accountant, GST filing and audits, without a last-minute scramble.',
        highlight: 'Organised books'
      }
    ],
    deliverables: [
      {
        title: 'Custom ERP or Tailored Setup',
        description: 'A system built around your workflow, either custom-built or set up on an existing platform, depending on what fits your size and budget.',
        details: ['Migration from Excel or registers', 'Role-based access for staff', 'Works on desktop and mobile']
      },
      {
        title: 'Inventory and Orders',
        description: 'Stock levels, low-stock alerts, purchase orders and barcode or QR scanning.',
        details: ['Barcode / QR scanning', 'Low-stock alerts', 'Supplier and purchase tracking']
      },
      {
        title: 'Billing, Payments and Reports',
        description: 'Invoices, payment tracking and the reports you check every week, in one dashboard.',
        details: ['GST-ready invoices', 'Payment and due tracking', 'Sales and profit reports']
      }
    ],
    expectations: [
      { value: 'FREE', label: 'PROCESS REVIEW', subtext: 'We map how your business runs today before suggesting anything' },
      { value: 'STEP BY STEP', label: 'ROLLOUT', subtext: 'One department or module at a time, so work never stops' },
      { value: 'TRAINING', label: 'FOR YOUR TEAM', subtext: 'Hands-on training so your staff actually use it' }
    ],
    processSteps: [
      { number: '01', title: 'Map Your Process', duration: 'Weeks 1-2', description: 'We sit with your team to understand every sheet, register and handoff.' },
      { number: '02', title: 'Design the System', duration: 'Weeks 3-4', description: 'We design the screens, roles and data structure around your workflow.' },
      { number: '03', title: 'Pilot One Area', duration: 'Weeks 5-7', description: 'We roll out one module first, such as stock or billing, and fix issues early.' },
      { number: '04', title: 'Full Rollout', duration: 'Week 8+', description: 'We move the rest of the business over, train your staff and stay on for support.' }
    ],
    teamProof: {
      project: 'Government Workflow and System Design',
      builtBy: 'Abhijeet',
      context: 'EY internship (Government & Public Sector)',
      problem: 'Large departmental systems involve many roles, approvals and handoffs, and building them without a clear map leads to confusion and rework.',
      approach: 'As a technology consulting intern at EY, Abhijeet mapped user journeys, role-based access, process flows and system interactions for Government of Maharashtra platforms, and supported testing (UAT) of government applications and dashboards.',
      relevance: 'ERP work starts the same way: map how the organisation really works, then design a system that fits it.'
    },
    ctaHeadline: 'Outgrowing Spreadsheets and Registers?',
    ctaSubhead: 'Book a free call and walk us through how your business runs today.'
  },
  {
    id: 'crm-systems',
    slug: 'crm-systems',
    number: '05',
    name: 'CRM Systems',
    headline: 'Never Lose Track of a Customer or Lead Again.',
    subhead: 'A simple system to track every enquiry, follow-up and customer conversation, so no lead slips through the cracks and your customers keep coming back.',
    shortOutcome: 'Track every lead, automate follow-ups, and keep your customers coming back.',
    image: '/assets/services/service-crm.png',
    floatingParts: [
      { name: 'Lead Pipeline', spec: 'Every enquiry from first message to sale', dir: 'left' },
      { name: 'Unified Conversations', spec: 'WhatsApp, email and call notes together', dir: 'right' },
      { name: 'Follow-Up Reminders', spec: 'Automatic nudges so nothing is missed', dir: 'left' },
      { name: 'Customer History', spec: 'Past orders and notes in one view', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Every Lead Followed Up',
        description: 'Enquiries from your website, WhatsApp and calls land in one place and get assigned automatically.',
        highlight: 'No missed enquiries'
      },
      {
        title: 'Faster Path to a Sale',
        description: 'Reminders, templates and clear next steps keep deals moving instead of waiting in someone\'s inbox.',
        highlight: 'Clear next steps'
      },
      {
        title: 'Customers Who Come Back',
        description: 'Know your customers\' history and reach out at the right time with offers, renewals and check-ins.',
        highlight: 'Repeat business'
      }
    ],
    deliverables: [
      {
        title: 'Sales Pipeline Setup',
        description: 'A CRM set up around your own sales steps, custom-built or configured on a tool like Zoho or HubSpot.',
        details: ['Drag-and-drop pipeline board', 'Lead sources tracked automatically', 'Task and reminder automation']
      },
      {
        title: 'WhatsApp and Email in One Place',
        description: 'Customer conversations from WhatsApp, email and calls brought together in one timeline your team can see.',
        details: ['WhatsApp Business integration', 'Email sync', 'Call notes']
      },
      {
        title: 'Customer Follow-Up Automation',
        description: 'Automatic messages for follow-ups, payment reminders, renewals and feedback requests.',
        details: ['Follow-up sequences', 'Renewal and payment reminders', 'Feedback collection']
      }
    ],
    expectations: [
      { value: 'FREE', label: 'SALES PROCESS REVIEW', subtext: 'We look at how leads reach you and where they get lost' },
      { value: '3–4 WKS', label: 'TYPICAL SETUP', subtext: 'For a standard pipeline with WhatsApp and email connected' },
      { value: 'TRAINING', label: 'FOR YOUR TEAM', subtext: 'Simple training so everyone uses it every day' }
    ],
    processSteps: [
      { number: '01', title: 'Map Your Sales Steps', duration: 'Week 1', description: 'We map how a stranger becomes a customer in your business and where leads get lost.' },
      { number: '02', title: 'Set Up the Pipeline', duration: 'Week 2', description: 'We configure stages, fields and automations to match how you sell.' },
      { number: '03', title: 'Connect Your Channels', duration: 'Week 3', description: 'We connect your website forms, WhatsApp, email and calendar.' },
      { number: '04', title: 'Train and Support', duration: 'Week 4', description: 'We train your team and adjust the setup based on how they use it.' }
    ],
    teamProof: {
      project: 'AI-MedPay: Insurance Recommendation Platform',
      builtBy: 'Varad',
      context: 'Personal project',
      problem: 'Choosing a health insurance plan means comparing many options against personal needs and medical costs, which most people find confusing.',
      approach: 'A platform that takes structured user inputs, ranks personalised plans with a LightGBM model, and reads medical bills with OCR for cost analysis.',
      relevance: 'Good CRMs do the same thing for your customers: understand each one\'s needs and history, and suggest the right next step.',
      link: { label: 'View on GitHub', href: 'https://github.com/Varadpendkar/AI-Medpay' }
    },
    ctaHeadline: 'Losing Track of Leads and Follow-Ups?',
    ctaSubhead: 'Book a free call and we will show you what a simple CRM could look like for your business.'
  },
  {
    id: 'strategic-consulting',
    slug: 'strategic-consulting',
    number: '06',
    name: 'Strategic Consulting',
    headline: 'Clear Advice Before You Spend Money on Technology.',
    subhead: 'Not sure what to build, which tools to use or where to start? We help you plan your idea, choose the right technology and avoid expensive mistakes.',
    shortOutcome: 'Plan your idea, choose the right tools, and avoid costly technology mistakes.',
    image: '/assets/services/service-consulting.png',
    floatingParts: [
      { name: 'Technology Roadmap', spec: 'What to build first, and what can wait', dir: 'left' },
      { name: 'Requirements Map', spec: 'Your idea turned into clear features', dir: 'right' },
      { name: 'Tool and Cost Review', spec: 'Right-sized tools for your budget', dir: 'left' },
      { name: 'Process Mapping', spec: 'How work flows today, and how to improve it', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Avoid Building the Wrong Thing',
        description: 'Check your idea, priorities and approach before spending on development or tools.',
        highlight: 'Spend with confidence'
      },
      {
        title: 'A Clear Plan You Can Follow',
        description: 'A step-by-step roadmap with priorities, timelines and rough costs, written in plain language.',
        highlight: 'Know your next step'
      },
      {
        title: 'Better Processes, Not Just Software',
        description: 'Sometimes the fix is a better workflow, not new software. We help you see the difference.',
        highlight: 'Fix the real problem'
      }
    ],
    deliverables: [
      {
        title: 'Idea and Requirements Workshop',
        description: 'We turn your idea into clear features, user journeys and wireframes that any developer can build from.',
        details: ['User journey mapping', 'Feature priorities', 'Figma wireframes and prototypes']
      },
      {
        title: 'Technology and Tool Advice',
        description: 'Help choosing the right tools, platforms and vendors for your stage and budget.',
        details: ['Build vs. buy advice', 'Tool and cost comparison', 'Vendor proposal review']
      },
      {
        title: 'Process Improvement',
        description: 'We map how work flows through your business today and suggest practical improvements and automations.',
        details: ['Process and workflow diagrams', 'Bottleneck identification', 'Automation opportunities']
      }
    ],
    expectations: [
      { value: 'FREE', label: 'FIRST CONVERSATION', subtext: 'Talk through your idea or problem with us at no cost' },
      { value: 'PLAIN', label: 'LANGUAGE', subtext: 'Advice you can understand and act on, without jargon' },
      { value: 'WRITTEN', label: 'ROADMAP', subtext: 'A clear plan you keep, whether or not you build with us' }
    ],
    processSteps: [
      { number: '01', title: 'Understand Your Goal', duration: 'Week 1', description: 'We listen to your idea or problem and ask the questions that matter.' },
      { number: '02', title: 'Review What Exists', duration: 'Week 1-2', description: 'We review your current tools, processes and any existing product or plans.' },
      { number: '03', title: 'Build the Roadmap', duration: 'Week 2-3', description: 'We deliver a clear plan with priorities, rough costs and next steps.' },
      { number: '04', title: 'Ongoing Guidance', duration: 'As needed', description: 'Optional follow-up calls as you make decisions and start building.' }
    ],
    teamProof: {
      project: 'Agri Awards FPO Rating Tool',
      builtBy: 'Abhijeet',
      context: 'EY internship (Department of Agriculture, Government of Maharashtra)',
      problem: 'Evaluating Farmer Producer Organisations means collecting a lot of information from organisations with very different record-keeping, and unclear forms lead to incomplete applications.',
      approach: 'As business analyst and designer, Abhijeet turned the evaluation requirements into a seven-step application flow, designed the Figma wireframes and built an interactive prototype to validate it before development.',
      relevance: 'This is how we approach consulting: turn a complex requirement into a clear plan and prototype before money is spent on building.'
    },
    ctaHeadline: 'Not Sure Where to Start?',
    ctaSubhead: 'Book a free call. We will help you work out the simplest next step for your idea or business.'
  }
]

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return SERVICES.find((s) => s.slug === slug)
}
