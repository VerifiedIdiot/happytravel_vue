import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store';

// 컴포넌트 임포트
import LoginMain from '../views/login/LoginMain.vue';
import Home from '../views/Home.vue';
import HRMain from '../views/hr/HRMain.vue';
import SalesMain from '../views/sales/SalesMain.vue';
import SalesPartner from '../views/sales/SalesPartner.vue';
import SalesProduct from '../views/sales/SalesProduct.vue';

const routes = [
  {
    path: '/',
    name: 'Root',
    // beforeEnter 가드 주석 처리
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isAuthenticated) {
    //     next({ name: 'Home' });
    //   } else {
    //     next({ name: 'Login' });
    //   }
    // },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginMain
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // meta: { requiresAuth: true } 주석 처리
   
  },
  {
    path: '/hr',
    name: 'HRMain',
    component: HRMain,
    // meta: { requiresAuth: true } 주석 처리

  },
  {
    path: '/sales',
    name: 'SalesMain',
    component: SalesMain,
    // meta: { requiresAuth: true } 주석 처리
 
    children: [
      {
        path: 'partner',
        name: 'SalesPartner',
        component: SalesPartner,
        // meta: { requiresAuth: true } 주석 처리
    
      },
      {
        path: 'product',
        name: 'SalesProduct',
        component: SalesProduct,
        // meta: { requiresAuth: true } 주석 처리
    
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

// 전역 가드 주석 처리
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });

export default router;
