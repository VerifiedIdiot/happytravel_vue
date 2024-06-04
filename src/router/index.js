import { createRouter, createWebHashHistory } from "vue-router";
// import store from '../store';

// 컴포넌트 임포트
import LoginMain from "../views/login/LoginMain.vue";
import Home from "../views/Home.vue";
import HRMain from "../views/hr/HRMain.vue";
import SalesMain from "../views/sales/SalesMain.vue";
import SalesPartner from "../views/sales/SalesPartner.vue";
import SalesPackage from "../views/sales/SalesPackage.vue";

const routes = [
  {
    path: "/",
    name: "Root",
    // beforeEnter 가드 주석 처리
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isAuthenticated) {
    //     next({ name: 'Home' });
    //   } else {
    //     next({ name: 'Login' });
    //   }
    // },
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginMain,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    // meta: { requiresAuth: true }
  },
  {
    path: "/hr",
    name: "HRMain",
    component: HRMain,
    // meta: { requiresAuth: true }
  },
  {
    path: "/sales",
    name: "SalesMain",
    component: SalesMain,
    // meta: { requiresAuth: true }

    children: [
      {
        path: "partner",
        name: "SalesPartner",
        component: SalesPartner,
        // meta: { requiresAuth: true }
      },
      {
        path: "package",
        name: "SalesPackage",
        component: SalesPackage,
        // meta: { requiresAuth: true }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
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
