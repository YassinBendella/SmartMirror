<template>
    <div id="schedule-module">
        <h2 class="color-white">Your schedule for today</h2>
        <div v-for="item in events" :key="item.id">
            <p>{{ item.date.getHours().pad(2) }}:{{ item.date.getMinutes().pad(2) }} - {{ item.name }}</p>
        </div>
    </div>
</template>

<script>
import api from '../utils/api.js'

export default {
    data() {
        return {
            events: []
        }
    },
    async created() {
        const result = await api.getEvents(0)
        let items = []
        for (let event of result){
            items.push({'name': event.name, 'date': new Date(event.date)})
        }
        console.log(items)
        this.events = items
    }
}
// import { scheduleStore } from '@/stores/ScheduleStore';
// console.log("loading schedule")
// // const schedule = scheduleStore()
// // let month_translation = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// // let currentDay = getDay()
// // let currentMonth = getMonth()


// let items = ref([])
// items.value = await getEvents(0)


// function getDayAndMonth(){
//     let date = new Date()
//     date.setDate(date.getDate() );
//     let currentDay = date.getDate()
//     let currentMonth = month_translation[date.getMonth()]
//     return [currentDay, currentMonth]
// }
// function getDay(){
//     let [day, ] = getDayAndMonth()
//     return day
// }
// function getMonth(){
//     let [, month] = getDayAndMonth()
//     return month
// }
</script>

<style>
p{
    color: white;
}

.color-white{
    color: white;
}
</style>