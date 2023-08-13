type Pathnames = Record<string, string>;

export const pagePathnames: Pathnames = {
  main: '/',
  about: '/about',
  catalog: '/catalog',
  registration: '/registration',
  login: '/login',
  user: '/user/:id',
  basket: '/basket',
  error: '/error',
};
