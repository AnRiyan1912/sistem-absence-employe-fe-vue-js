import { idText } from 'typescript'
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const LoginView = () => import('../views/LoginView.vue')
const NotFountView = () => import('../views/NotFoundView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const ForgotPasswordView = () => import('../views/ForgotPasswordView.vue')
const ChangePasswordView = () => import('../views/ChangePasswordView.vue')
const AbsenceView = () => import('../views/AbsenceView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/absence',
      name: 'absence',
      component: AbsenceView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forgot_password',
      name: 'forgot password',
      component: ForgotPasswordView
    },
    {
      path: '/change_password',
      name: 'change_password',
      component: ChangePasswordView,
      meta: {
        requiresVerificationCode: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      component: NotFountView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = await sessionStorage.getItem('auth')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else if (to.meta.requiresVerificationCode) {
    const verifyStatis = await sessionStorage.getItem('verification')
    if (verifyStatis) {
      next()
    } else {
      next('/forgot_password')
    }
  } else {
    next()
  }
})

export default router
