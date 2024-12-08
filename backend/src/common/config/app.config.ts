export const APP_CONFIG = {
  TESTING: {
    SKIP_AUTH_AND_GET_USER_ID: process.env.NODE_ENV === 'development',
    DISABLE_AUTH_IN_DEV: process.env.NODE_ENV === 'development',
    LOGIN_AS: {
      USER_1: false,
      USER_1_NOT_ADMIN: false,
      USER_2: true,
    },
  },
};
