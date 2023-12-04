import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getToken} from '@/utils/auth.js'
import { login } from './api/user';

Vue.config.productionTip = false

//component: (resolve) => require([`@/views/${item.component}`],resolve)
function generateRouter(userRouters){

  let newRouters = userRouters.map(item => {
    let routes = {
      path:item.path,
      name:item.path,
      component: (resolve) => require([`@/views/${item.component}`],resolve)
    }

    if(item.children){
      routes.children = generateRouter(item.children)
    }
    return routes
  })
	return newRouters
}


router.beforeEach(async (to,form,next) => {

  let token = getToken()

  if (!token && to.path !== "/login" ) {
    next({
      path: "/login",
    });
    return
  }

  if (token && to.path === "/login") {
    next({
      path: "/index",
    });
    return
  }

  if(token != undefined && !store.state.auth){
    await store.dispatch("setUserRouters")
    let newRouters =  generateRouter(store.state.userRouters)
    for (let index = 0; index < newRouters.length; index++) {
      const obj = newRouters[index];
      router.addRoute(obj)
    }
    next({path:to.path})
  }else{
      next()
    }
   
})

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
