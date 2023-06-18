import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ScheduleEditor from '../views/ScheduleEditor.vue'
import WeatherOverview from '../views/WeatherOverview.vue'
import DrawingBoard from '../views/DrawingBoard.vue'
import Maps from '../views/Maps.vue'
import Lock from '../views/Lock.vue'

const routes = [
  {
    path: '/',
    name: 'Lock',
    component: Lock
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: ScheduleEditor
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherOverview
  },
  {
    path: '/draw',
    name: 'DrawingBoard',
    component: DrawingBoard
  },
  {
    path: '/maps',
    name: 'Maps',
    component: Maps
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
