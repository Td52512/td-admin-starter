import request from '@/utils/request'

// 登录方法
export function login(data) {
  
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function getRouters(){
	return request({
		url:"/getRouters",
		method:'get'
	})
	return {
		code:200,
		data:[
				{
				children: [
					{
							component: "system/user",
							icon: "user",
							title: "用户管理",
							name: "User",
							path:"/system/user",
							children:null
					},
					{
							component: "system/role",
							icon: "peoples",
							title: "角色管理",
							name: "Role",
							path:"/system/role",
							children:null
					},
					{
						component: "system/menu",
							icon: "tree-table",
							title: "菜单管理",
							name: "Menu",
							path:"/system/menu",
							children:null
					},
				],
				 component:"layout",
					icon: "system",
					title: "系统管理",
					name: "System",
					path:"/system"
				},
			
				]
			}
}