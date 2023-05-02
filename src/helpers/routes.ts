export interface Route {
  readonly path: string;
  readonly name: string;
}

export const Routes = Object.freeze({
  HOME: Object.freeze<Route>({ path: '/', name: 'Home' }),
  ABOUT: Object.freeze<Route>({ path: '/about', name: 'About' }),
  PROJECTS: Object.freeze<Route>({ path: '/projects', name: 'Projects' }),
});
