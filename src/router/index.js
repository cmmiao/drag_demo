import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import login from '@/components/login';
import skin from '@/components/skincolor';

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path:'/skin',
      name: 'skin',
      component: skin
    }

  ]
})

router.beforeEach((to,from, next) => {
  //将所有需要登陆才显示的页面的路由都放进一个数组
    // to要跳转到的路径
    // from从哪个路径来
    // next往下执行的回调
    let  token = localStorage.getItem('userName');
    const  nextRoute = ['home','skin'];
    if(to.name === 'login'){ // 如果是登录页则跳过验证
      next();
      return;
    }
    if(nextRoute.indexOf(to.name) >= 0) { 
      if(!token){
        next({name: 'login'}); // 如果为登录跳转到登录页
      }else {
        next(); // 如果已经登录,就可以跳转
      }
    }else{
      next();
    }

})

export default router;
