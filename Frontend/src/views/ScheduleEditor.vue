<template>
    <div class="page" id="schedule-editor" @click="untoggleKeyboard">
        <div id="schedule-body">

            <h1>YOUR SCHEDULE</h1>
            <div id="day-select">
                <img src="@/assets/left-arrow.png" alt="" @click="decrementDay">
                <div>
                    <p class="not-current">{{ getDay(counter - 1) }}</p>
                    <p class="not-current">{{ getMonth(counter -1) }}</p>
                </div>
                <div>
                    <p class="current">{{ currentDay }}</p>
                    <p class="current">{{ currentMonth }}</p>
                </div>
                <div>
                    <p class="not-current">{{ getDay(counter + 1)  }}</p>
                    <p class="not-current">{{ getMonth(counter + 1) }}</p>
                </div>
                <img src="@/assets/right-arrow.png" alt="" @click="incrementDay">
            </div>
            <button @click="addEvent" id="add-button">
                + ADD EVENT
            </button>
            <div id="inputs">
                <input type="text" @focus="toggleKeyboard" :value="event" id="text-input">
                <input class="number-input" type="number" v-model="hour" min="0" max="23">
                <input class="number-input" type="number" v-model="min" min="0" max="60">
            </div>
            <div id="keyboard" class="keyboard">

            </div>
            <div id="schedule">
                <div v-for="item in items" :key="item.name">
                    <p> {{ item.date.getHours().pad(2) }}:{{ item.date.getMinutes().pad(2) }} - {{ item.name }} </p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import Keyboard from 'simple-keyboard'
import "simple-keyboard/build/css/index.css";
import api from '../utils/api.js'

export default {
    data(){
        return {
            counter: 0,
            currentDay: undefined,  
            currentMonth: undefined,
            event: '',
            hour: 0,
            min: 0,
            items: [],
            keyboard: undefined,
            monthTranslation: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    },

    async created(){
        this.currentDay = this.getDay(this.counter);
        this.currentMonth = this.getMonth(this.counter);

        await this.updateEvents() 
    },  
    
    methods: {
        async updateEvents(){
            this.items = await api.getEvents(this.counter)
            for (let item of this.items){
                item.date = new Date(item.date)
            }
        },

        async incrementDay(){
            this.counter += 1;
            let [nextDay, nextMonth] = this.getDayAndMonth(this.counter)
            this.currentDay = nextDay
            this.currentMonth = nextMonth
            await this.updateEvents()
        },
        async decrementDay(){
            this.counter -= 1;
            let [previousDay, previousMonth] = this.getDayAndMonth(this.counter)
            this.currentDay = previousDay
            this.currentMonth = previousMonth
            await this.updateEvents()
        },
        getDayAndMonth(days){
            console.log(days)
            let date = new Date()
            date.setDate(date.getDate() + days);
            let currentDay = date.getDate()
            console.log(date)
            console.log(this.monthTranslation)
            let currentMonth = this.monthTranslation[date.getMonth()]
            return [currentDay, currentMonth]
        },
        getDay(days){
            let [day, ] = this.getDayAndMonth(days)
            return day
        },
        getMonth(days){
            let [, month] = this.getDayAndMonth(days)
            return month
        },
        async addEvent(){
            // store.addItem({'name': this.event, 'hour': this.hour, 'min': this.min, 'day': this.getDay(this.counter), 'month': this.getMonth(this.counter)})
            // this.items = store.getItemsForDayAndMonth(this.currentDay,this.currentMonth)

            let event = {'name': this.event, 'hour': this.hour, 'min': this.min, 'day': this.getDay(this.counter), 'month': this.getMonth(this.counter)};
            await api.addEvent(event);

            await this.updateEvents()
        },

        onChange(input){
            this.event = input
        },

        toggleKeyboard(){
            if (this.keyboard == undefined){
                this.keyboard = new Keyboard('keyboard', {
                onChange: this.onChange
                })
                
                this.keyboard.setInput(this.event)
            }
        },

        untoggleKeyboard(event){
            let target = event.target
            let board = document.getElementById('keyboard')
            if (target.id != 'text-input' && !board.contains(target)){
                if (this.keyboard != undefined){
                    this.keyboard.destroy()
                    this.keyboard = undefined
                }
            }
        }
    }
}

</script>

<style scoped>

.keyboard{
    max-width: 50vw;
}

#schedule-body{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    /* height: 50vh; */
    justify-content: center;
}

#add-button{
    padding: 10px 25px;
    border-radius: 25px;
    border: none;
    background: white;
}

#inputs{
    display: flex;
    gap: 1vw;
}

#text-input{
    border: none;
    outline: none;
    padding: 5px;
    border-radius: 5px;
}

.number-input{
    border: none;
    outline: none;
    padding: 5px;
    text-align: center;
    border-radius: 5px;
}

#day-select{
    display: flex;
    width: 50vw;
    height: 20vh;
    justify-content: space-evenly;
    align-items: center;
}
.not-current{
    color: #c5c5c538;
}
</style>