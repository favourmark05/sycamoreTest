import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
// import AboutView from '../views/AboutView.vue';

const routes = [
  { path: '/', name: 'Home', component: () => import ('@/views/Home.vue'),
    children: [
        {
            path: 'addCustomer',
            name: 'CustomerForm',
            component: () => import ('@/components/CustomerForm.vue')
        },
        {
            path: 'usersPage',
            name: 'UsersPage',
            component: () => import ('@/components/UsersPage.vue')
        }
    ]

  },
//   { path: '/about', name: 'About', component: AboutView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
