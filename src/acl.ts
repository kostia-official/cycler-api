export const acl = [
  {
    route: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allow: { isAuthenticated: true }
  }
];
