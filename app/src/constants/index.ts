export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.peerly.dev/v1';

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const QUERY_KEYS = {
  USER: 'user',
  DISCOVER: 'discover',
  CONNECTIONS: 'connections',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  TAGS: 'tags',
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const CONSTRAINTS = {
  USERNAME_MIN: 3,
  USERNAME_MAX: 30,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  BIO_MAX: 120,
  MESSAGE_MAX: 1000,
  TAGS_MAX: 3,
  LANGUAGES_MAX: 5,
  FRIEND_REQUESTS_DAILY_LIMIT: 10,
} as const;