import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import * as auth from '../services/AuthService'

Vue.use(VueRouter)

const isLoggedIn = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: () => import('../views/tasks/TasksAll.vue'),
    beforeEnter(to, from, next) {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: () => import('../views/tasks/TasksCreate.vue'),
    beforeEnter(to, from, next) {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: () => import('../views/tasks/TasksEdit.vue'),
    beforeEnter(to, from, next) {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/authentication/Register.vue'),
    beforeEnter(to, from, next) {
      if (!auth.isLoggedIn()) {
        next()
      } else {
        next({name: 'Home'})
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/authentication/Login.vue'),
    beforeEnter(to, from, next) {
      if (!auth.isLoggedIn()) {
        next()
      } else {
        next({name: 'Home'})
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

export default router
