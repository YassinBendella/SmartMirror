import { defineStore } from "pinia";

export const scheduleStore = defineStore('scheduleStore', {
    state: () => ({items: []}),
    actions: {
        addItem(item){
            this.items.push(item)
        },
        removeItem(item){
            let index = this.items.indexOf(item)
            if (index > -1){
                this.items = this.items.splice(index,1)
            }
        },
        getItemsForDayAndMonth(day,month){
            let result = []
            for (let item of this.items){
                if (item['day'] == day && item['month'] == month){
                    result.push(item)
                }
            }
            return result
        }
    }
})