const ROUTES = {
    // Auth
    LOGIN: '/login',
    SIGNUP: '/signup',
  
    // App (protected)
    DASHBOARD: '/dashboard',
    PLANS: '/plans',
    DIARY : '/journal',
    SETTINGS: '/settings',
    PROFILE: '/profile',
  
    // Public pages (optional)
    HOME: '/',
    ABOUT: '/about',
  
    // Fallback
    NOT_FOUND: '*',
  };
  
  export default ROUTES;