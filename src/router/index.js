import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import Message from '@/page/message'
import Second from '@/page/second'
import Notify from '@/page/notify'
import User from '@/page/user'
import Proxy from '@/page/proxy'
import Dingdan from '@/page/dingdan'
import Emptypay from "@/components/index/emptypay"
import Login from "@/page/login"
import Register from "@/page/register"
import Retrieve from "@/page/retrieve"
import Pay from "@/page/pay"
import users from './users'
import home from './home'
import emptypay from './emptypay'
import supportCard from './supportCard'
import Backstage from './backstage'
Vue.use(Router)
var routes = [
    {
        path: '/dingdan',
        name: 'dingdan',
        component: Dingdan,
        meta:{
            title:'我的订单',
        }
    },{
        path: '/proxy',
        name: 'proxy',
        component: Proxy,
        meta:{
            title:'代理团队',
        }
    },{
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            title:'登陆',
        }
    },{
        path:'/register',
        name:'Register',
        component:Register,
        meta:{
            title:'注册',
        }
    },{
        path:'/retrieve',
        name:'Retrieve',
        component:Retrieve,
        meta:{
            title:'找回密码',
        }
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta:{
            title:'77钱包',
        }
    }, {
        path: '/message',
        name: 'Message',
        component: Message,
        meta:{
            title:'微聊',
        }
    }, {
        path: '/second',
        name: 'Second',
        component: Second,
        
    }, {
        path: '/notify',
        name: 'Notify',
        component: Notify,
        meta:{
            title:'通知',
        }
    }, {
        path: '/user',
        name: 'User',
        component:  User,
        meta:{
            title:'个人中心',
        },
    },{
        path:'/emptypay',
        name:'Emptypay',
        component:Emptypay,
        meta:{
            title:'添加代理',
        }
    },{
        path:'/pay',
        name:'Pay',
        component:Pay,
        meta:{
            title:'花呗',
        }
    }, {
        path: '/', 
        redirect: '/login' 
    }
]
export default new Router({
    routes:[...routes,...users,...home,...emptypay,...supportCard,...Backstage]
})
