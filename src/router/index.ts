import { createRouter, createWebHistory } from 'vue-router';

type Routes = Parameters<typeof createRouter>['0']['routes'];

const routes: Routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/Home/Index.vue'),
  },
  {
    name: 'episode',
    path: '/episode',
    component: () => import('/@/pages/Episode/Episode.vue'),
  },
];

export const Router = createRouter({
  history: createWebHistory(),
  routes,
});
