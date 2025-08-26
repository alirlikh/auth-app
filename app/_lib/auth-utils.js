// lib/auth-utils.js
export const AUTH_ROUTES = {
  PUBLIC: ['/login', '/register', '/forgot-password', '/'],
  PROTECTED: ['/dashboard', '/profile', '/settings', '/admin', '/users', '/reports'],
  ADMIN_ONLY: ['/admin', '/users']
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

// Check if user has required role for route
export function hasRequiredRole(userRole, requiredRole) {
  const roleHierarchy = {
    user: 1,
    moderator: 2,
    admin: 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}