import { BrainCircuit, Megaphone, CodeXml, Boxes, Users, Compass, type LucideIcon } from 'lucide-react'

// One line icon per service, keyed by ServiceData.id
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  'ai-solutions': BrainCircuit,
  'digital-marketing': Megaphone,
  'product-building': CodeXml,
  'erp-systems': Boxes,
  'crm-systems': Users,
  'strategic-consulting': Compass,
}
