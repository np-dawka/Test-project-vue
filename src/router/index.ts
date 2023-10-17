import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import YearCalendar from '../views/YearCalendar.vue'
import MonthView from '../views/MonthView.vue'
import WeekView from '../views/WeekView.vue'
import DayView from '../views/DayView.vue'
import Performance from '../views/Perfomance.vue'
import Help from '../views/Help.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ChangePassword from '../views/ChangePassword.vue'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/year',
      name: 'year',
      component: YearCalendar,
    },
    {
      path: '/month',
      name: 'month',
      component: MonthView,
    },
    {
      path: '/week',
      name: 'week',
      component: WeekView,
    },
    {
      path: '/day',
      name: 'day',
      component: DayView,
      props: (route) => ({
        dateToDay: route.query.dateToDay,
      }),
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance,
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword
    },  
  ]
})

// const getCurrentUser = ()=>{
//   return new Promise((resolve, reject) =>{
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) =>{
//         removeListener()
//         resolve(user)
//       },
//       reject
//     )
//   })
// }

// router.beforeEach(async(to, from, next)=>{
//   if(to.matched.some((record=> record.meta.requiredAuth))){
//     if (await getCurrentUser){
//       next()
//     } else{
//       alert("you don't have a acces!")
//       next("/")
//     }
//   } else{
//     next()
//   }
// })

export default router
