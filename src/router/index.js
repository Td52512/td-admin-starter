import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/'
import Layout from '../views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path:"/",
    name:"layout",
    component:Layout,
    children:[
      {
        path:"/index",
        component: () => import("../views/index")
      }
    ]    
  },
  {
      path: '/login',
      name: 'login',
      component: Login,
  },

  {
    path:'*',
    name:'NotFound',
    component:() => import("../views/404/index.vue")
  }

    
]

//在路由跳转时能够捕获错误并返回错误信息，而不是抛出错误
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history", // 去掉url中的#
  routes
})

export default router
