<template>
    <div id="schedule-module">
        <h2 class="color-white">Your schedule for today</h2>
        <div v-for="item in items" :key="item.id">
            <p>{{ item.hour.pad(2) }}:{{ item.min.pad(2) }} - {{ item.name }}</p>
        </div>
    </div>
</template>

<script setup>
import { scheduleStore } from '@/stores/ScheduleStore';
import { ref } from 'vue'
const schedule = scheduleStore()
let month_translation = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let currentDay = getDay()
let currentMonth = getMonth()
let items = ref([])
items.value = schedule.getItemsForDayAndMonth(currentDay,currentMonth)

function getDayAndMonth(){
    let date = new Date()
    date.setDate(date.getDate() );
    let currentDay = date.getDate()
    let currentMonth = month_translation[date.getMonth()]
    return [currentDay, currentMonth]
}
function getDay(){
    let [day, ] = getDayAndMonth()
    return day
}
function getMonth(){
    let [, month] = getDayAndMonth()
    return month
}
</script>

<style>
p{
    color: white;
}

.color-white{
    color: white;
}
</style>