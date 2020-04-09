export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/principal',
    component: () => import('@/views/dashboard/dashboard.vue'),
    name: 'principal',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'operarios',
        name: 'operarios',
        component: () => import('@/views/horario/operarios.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'diario',
        name: 'diario',
        component: () => import('@/views/horario/diario.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'horas',
        name: 'horas',
        component: () => import('@/views/horario/horas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'operario',
        name: 'operario',
        component: () => import('@/views/horario/operario.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'control',
        name: 'control',
        component: () => import('@/views/horario/control.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'detalle',
        name: 'detalle',
        component: () => import('@/views/horario/detalle.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'secciones',
        name: 'secciones',
        component: () => import('@/views/horario/secciones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'seccion',
        name: 'seccion',
        component: () => import('@/views/horario/seccion.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cotizaciones',
        name: 'cotizaciones',
        component: () => import('@/views/horario/cotizaciones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cotizacion',
        name: 'cotizacion',
        component: () => import('@/views/horario/cotizacion.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'resumen',
        name: 'resumen',
        component: () => import('@/views/horario/resumen.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
