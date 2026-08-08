export const CAT_COLORS = {
  networking:         '#00d4ff',
  security:           '#ff4060',
  'operating-systems':'#7fff6a',
  cloud:              '#ff9f1c',
  programming:        '#bf5fff',
  certifications:     '#ffe033',
  ctfs:               '#00ffb3',
  ctf:                '#00ffb3',
  fundamentals:       '#6eaaff',
  'computer-systems': '#6eaaff',
  'computer system':  '#6eaaff',
  backend:            '#bf5fff',
  web:                '#00d4ff',
  databases:          '#ff9f1c',
  docker:             '#00d4ff',
  kubernetes:         '#6eaaff',
}

export const CAT_LABELS = {
  networking:         'Networking',
  security:           'Security',
  'operating-systems':'Operating Systems',
  cloud:              'Cloud',
  programming:        'Programming',
  certifications:     'Certifications',
  ctfs:               'CTFs',
  ctf:                'CTF',
  fundamentals:       'Fundamentals',
  'computer-systems': 'Computer Systems',
  'computer system':  'Computer System',
  backend:            'Backend',
  web:                'Web',
  databases:          'Databases',
  docker:             'Docker',
  kubernetes:         'Kubernetes',
}

export const STATUS_META = {
  'learned':     { label: 'Learned',      color: '#00ffb3', bg: 'rgba(0,255,179,0.1)',  border: 'rgba(0,255,179,0.25)'  },
  'in-progress': { label: 'In Progress',  color: '#ffe033', bg: 'rgba(255,224,51,0.1)', border: 'rgba(255,224,51,0.25)' },
  'not-started': { label: 'Not Started',  color: '#444d6a', bg: 'rgba(68,77,106,0.15)', border: 'rgba(68,77,106,0.25)' },
  'completed':   { label: 'Completed',    color: '#00ffb3', bg: 'rgba(0,255,179,0.1)',  border: 'rgba(0,255,179,0.25)'  },
  'reviewing':   { label: 'Reviewing',    color: '#bf5fff', bg: 'rgba(191,95,255,0.1)', border: 'rgba(191,95,255,0.25)' },
  'mastered':    { label: 'Mastered',     color: '#00d4ff', bg: 'rgba(0,212,255,0.1)',  border: 'rgba(0,212,255,0.25)' },
}

export const DIFF_META = {
  1:            { label: 'Level 1',      color: '#00ffb3' },
  2:            { label: 'Level 2',      color: '#6eaaff' },
  3:            { label: 'Level 3',      color: '#ffe033' },
  4:            { label: 'Level 4',      color: '#ff9f1c' },
  5:            { label: 'Level 5',      color: '#ff4060' },
  beginner:     { label: 'Beginner',     color: '#00ffb3' },
  intermediate: { label: 'Intermediate', color: '#ffe033' },
  advanced:     { label: 'Advanced',     color: '#ff4060' },
}

export function catColor(cat) {
  return CAT_COLORS[cat] || '#6eaaff'
}

export function statusOpacity(status) {
  if (status === 'learned')     return 1
  if (status === 'completed' || status === 'mastered') return 1
  if (status === 'in-progress') return 0.7
  return 0.28
}
