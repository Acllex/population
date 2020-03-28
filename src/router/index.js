import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {isAure: true, title: "人口管理系统"},
    children: [
      {path: 'seepeople', name:'seepeople', component: () => import('@/views/SeePeople'),meta: {isAure: true, title: "人口管理系统"}},
      {path: 'addpeople', name:'addpeople', component: () => import('@/views/AddPeople'),meta: {isAure: true, title: "人口管理系统"}},
      {path: 'addestate', name:'addestate', component: () => import('@/views/AddEstate'),meta: {isAure: true, title: "人口管理系统"}},
      {path: 'querypeople', name:'querypeople', component: () => import('@/views/QueryPeople'),meta: {isAure: true, title: "人口管理系统"}},
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {title: "登录"},
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=>{
  document.title = to.meta.title;
  //document.title;  设置网页标题
  //query:{redirect:to.name} 加查询字符串
  //this.$router 路由实例
  //this.$route 组件对应的路由信息
  if(to.meta.isAure) {
    //sessionStorage.getItem
    const s = sessionStorage.token;
    if(s) {
      next();
    }else{
      next({path:'/login',query:{redirect: to.name}});
    }
  }else {
    next();
  }
});
export default router
