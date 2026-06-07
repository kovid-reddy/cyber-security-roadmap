export const CAT_COLORS = {
  networking:         '#00d4ff',
  security:           '#ff4060',
  'operating-systems':'#7fff6a',
  cloud:              '#ff9f1c',
  programming:        '#bf5fff',
  certifications:     '#ffe033',
  ctfs:               '#00ffb3',
  fundamentals:       '#6eaaff',
}

export const CAT_LABELS = {
  networking:         'Networking',
  security:           'Security',
  'operating-systems':'Operating Systems',
  cloud:              'Cloud',
  programming:        'Programming',
  certifications:     'Certifications',
  ctfs:               'CTFs',
  fundamentals:       'Fundamentals',
}

export const STATUS_META = {
  'learned':     { label: 'Learned',      color: '#00ffb3', bg: 'rgba(0,255,179,0.1)',  border: 'rgba(0,255,179,0.25)'  },
  'in-progress': { label: 'In Progress',  color: '#ffe033', bg: 'rgba(255,224,51,0.1)', border: 'rgba(255,224,51,0.25)' },
  'not-started': { label: 'Not Started',  color: '#444d6a', bg: 'rgba(68,77,106,0.15)', border: 'rgba(68,77,106,0.25)' },
}

export const DIFF_META = {
  beginner:     { label: 'Beginner',     color: '#00ffb3' },
  intermediate: { label: 'Intermediate', color: '#ffe033' },
  advanced:     { label: 'Advanced',     color: '#ff4060' },
}

export function catColor(cat) {
  return CAT_COLORS[cat] || '#6eaaff'
}

export function statusOpacity(status) {
  if (status === 'learned')     return 1
  if (status === 'in-progress') return 0.7
  return 0.28
}
