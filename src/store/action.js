import {getRouters} from '@/api/user/index.js'

export default {
	async setUserRouters({commit,state}){
		const res = await getRouters()

		commit("setUserRouters",res.data)
		console.log("----设置前----");
		console.log(res.data);
		commit("setAuth",true)
	}
}