import Vue from 'vue'
import Router from 'vue-router'
//import store from './store.js'




import ProductosCategoria from '@/components/Productos/ProductosCategoria.vue'
import container from '@/components/menu/Container.vue'
import home from '@/components/Home/Home.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: container ,
    meta: { 
      requireAuth: false
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: home               
       },     
       {
        path: '/ProductosCategoria',
         name: 'productosCategoria',
        component: ProductosCategoria,   
        props: true
      
       },
    ]
    },
  
    {
      path: '/.well-known/acme-challenge/:file'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})





export default router

