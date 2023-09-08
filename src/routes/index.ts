export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/sign-up',
  SUCCESS: '/success',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  DONATION: '/donation',
  FUNDS: '/funds',
  NOT_FOUND: '*',
} as const

type TypeOfRoutes = typeof ROUTES
export type Route = TypeOfRoutes[keyof TypeOfRoutes]
