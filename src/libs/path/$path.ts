import type { OptionalQuery as OptionalQuery0 } from '../../../pages'
import type { OptionalQuery as OptionalQuery1 } from '../../../pages/approve'

export const pagesPath = {
  "approve": {
    $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ pathname: '/approve' as const, query: url?.query, hash: url?.hash })
  },
  $url: (url?: { query?: OptionalQuery0, hash?: string }) => ({ pathname: '/' as const, query: url?.query, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
