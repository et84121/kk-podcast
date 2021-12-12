import { createRouter, createWebHistory } from 'vue-router';

type Routes = Parameters<typeof createRouter>['0']['routes'];

export const routes: Routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/Home/Index.vue'),
  },
  {
    name: 'episode',
    path: '/episode/:guid',
    component: () => import('/@/pages/Episode/Episode.vue'),
    props: true,
  },
];

export const Router = createRouter({
  history: createWebHistory(),
  routes,
});
