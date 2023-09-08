const RESPONSE_TYPES = {
  LEADERBOARD: 'Leaderboard',
  DONATE_SUCCESS: 'DonateResultSuccess',
  PROFILE: 'Profile',
  AUTH: 'Auth',
  VALIDATION_ERRORS: 'ValidationErrors',
  AUTH_ERROR: 'AuthError',
} as const

export type ResponseTypes = typeof RESPONSE_TYPES
