import { createRouter, createWebHashHistory } from "vue-router";
// import store from '../store';

// 컴포넌트 임포트
import LoginMain from "../views/login/LoginMain.vue";
import Home from "../views/Home.vue";
import HRMain from "../views/hr/HRMain.vue";
import HREmp from "../views/hr/HREmp.vue";
import SalesMain from "../views/sales/SalesMain.vue";
import SalesPartner from "../views/sales/SalesPartner.vue";
import SalesPackage from "../views/sales/SalesPackage.vue";
import SalaryData from "@/views/salary/SalaryData.vue";
import SalaryPayment from "@/views/salary/SalaryPayment.vue";

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
    children: [
      {
        path: "emp",
        name: "HREmp",
        component: HREmp,
        // meta: { requiresAuth: true } 주석 처리
      },
    ],
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
  {
    path: "/salary/data",
    name: "SalaryData",
    component: SalaryData,
  },
  {
    path: "/salary/payment",
    name: "SalaryPayment",
    component: SalaryPayment,
  },
  {
    path: "/attendance",
    name: "AttendanceMain",
    component: () => import("../views/attendances/AttendanceMain.vue"),
    // meta: { requiresAuth: true }
    children: [
      {
        path: "myAttendance",
        name: "MyAttendance",
        component: () => import("../views/attendances/MyAttendance.vue"),
        // meta: { requiresAuth: true }
      },
      {
        path: "teamAttendance",
        name: "TeamAttendance",
        component: () => import("../views/attendances/TeamAttendance.vue"),
        // meta: { requiresAuth: true }
      },
      {
        path: "adminAttendance",
        name: "AdminAttendance",
        component: () => import("../views/attendances/AdminAttendance.vue"),
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
