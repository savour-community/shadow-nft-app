import { createRouter, createWebHistory } from 'vue-router';
import Markets from '../views/Markets/index.vue';

const routes = [
    {
      path: '/Markets',
      name: 'Markets',
      component: Markets
    }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  ],

  router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });

export default router;
