import { createRouter, createWebHistory } from 'vue-router';

type Routes = Parameters<typeof createRouter>['0']['routes'];

const routes: Routes = [
  {
    path: '/',
    component: () => import('../pages/Home/Index.vue'),
  },
  {
    path: '/episode',
    component: () => import('/@/pages/Episode/Episode.vue'),
  },
];

export const Router = createRouter({
  history: createWebHistory(),
  routes,
});
