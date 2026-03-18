/**
 * Nika Design System – Tokens
 * Tema: "Concreto Zen / industrial-stencil"
 *
 * Filosofia:
 * - Paleta baseada em concreto, grafite e acento amarelo-obra
 * - Tipografia legível, sem serif nos headers
 * - Espaçamento generoso, grid honesto
 * - Sem simulação de materiais físicos além do necessário
 */

export const colors = {
  // Superfícies
  surface: {
    base: '#0f0f0f',      // fundo principal – quase preto
    raised: '#1a1a1a',    // cards, painéis elevados
    overlay: '#252525',   // modais, dropdowns
    border: '#333333',    // bordas
  },

  // Concreto
  concrete: {
    50: '#f5f5f4',
    100: '#e8e7e5',
    200: '#d2d0cc',
    400: '#9e9b96',
    600: '#6b6860',
    800: '#3a3834',
    900: '#1e1d1a',
  },

  // Acento – amarelo-obra / stencil
  accent: {
    primary: '#e8c84a',   // amarelo concreto
    dim: '#b89f2e',       // hover/active
    muted: '#3d3210',     // backgrounds de destaque
  },

  // Texto
  text: {
    primary: '#f0efeb',   // texto principal
    secondary: '#a09d97', // texto secundário
    muted: '#6b6860',     // placeholders, labels desativados
    inverse: '#0f0f0f',   // texto sobre accents
  },

  // Semântica
  semantic: {
    success: '#5a9a6a',
    warning: '#c87d2a',
    danger: '#c85a4a',
    info: '#4a7abc',
  },
} as const

export const typography = {
  fontFamily: {
    sans: '"Inter", "IBM Plex Sans", system-ui, sans-serif',
    mono: '"IBM Plex Mono", "JetBrains Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
  24: '6rem',
} as const

export const radii = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  full: '9999px',
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  breakpoints,
} as const

export type Tokens = typeof tokens
