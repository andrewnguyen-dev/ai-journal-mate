/**
 * An array of paths that are publicly accessible.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/auth/new-verification",
]

/**
 * An array of paths that require authentication.
 * These routes are only accessible to logged in users.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
]

/** 
 * The prefix for API authentication routes.
 * Routes start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default login redirect path.
 * This is the path that is redirected to after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"