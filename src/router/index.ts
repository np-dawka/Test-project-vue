import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import YearCalendar from '../views/YearCalendar.vue'
import MonthView from '../views/MonthView.vue'
import WeekView from '../views/WeekView.vue'
import DayView from '../views/DayView.vue'
import Performance from '../views/Perfomance.vue'
import Help from '../views/Help.vue'

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
      component: YearCalendar
    },
    {
      path: '/month',
      name: 'month',
      component: MonthView
    },
    {
      path: '/week',
      name: 'week',
      component: WeekView
    },
    {
      path: '/day',
      name: 'day',
      component: DayView
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },

  ]
})

export default router
