export interface Route {
  readonly path: string;
  readonly name: string;
}

export const Routes = Object.freeze({
  HOME: Object.freeze<Route>({ path: '/', name: 'Inicio' }),
  PETS: Object.freeze<Route>({ path: '/pets', name: 'Mascotas' }),
});

export const AuthRoutes = Object.freeze({
  SIGN_IN: Object.freeze<Route>({ path: '/login', name: 'Iniciar sesión' }),
  SIGN_UP: Object.freeze<Route>({ path: '/signup', name: 'Registrarse' }),
});
