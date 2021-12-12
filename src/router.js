import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  //這樣每次routes更新會滾到最上面
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 };
  // },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/room/:id",
      name: "room",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/Room.vue')
      component: () => import("./views/Room.vue"),
      children: [
        {
          path: "/room/:id/reservation",
          name: "reservation",
          component: () => import("./components/Reservation.vue"),
        },
        {
          path: "/room/:id/reservation/success",
          name: "success",
          component: () => import("./components/Success.vue"),
        },
      ],
    },
    // {
    //   path: '/Reservation/:id',
    //   name: 'reservation',
    //   component: () => import('./views/Reservation.vue')
    // },
    // {
    //   path: '/Thanks/',
    //   name: 'thanks',
    //   component: () => import('./views/Thanks.vue')
    // },
  ],
});
