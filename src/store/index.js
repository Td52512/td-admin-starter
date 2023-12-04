import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import actions from './action'
export default new Vuex.Store({
  //state是提供共享数据的唯一根节点，作用类似data
  state,
  //mutations是修改共享数据state的唯一节点，作用类似于methods,切记：只能通过mutations内方法来修改state内数据，且方法必须为同步操作
  mutations,
  //actions处理异步操作，通过mutations来处理state，类似于methods
  actions ,
})
