import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/'
import Index from '../views/index/'

Vue.use(VueRouter)

const routes = [

  {
    path:'/',
    name:'index',
    component:Index,
  }
 ,
  {
      path: '/login',
      name: 'login',
      component: Login
    },
    
]

let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history", // 去掉url中的#
  routes
})

export default router
