import { defineStore } from "pinia";

export const locationStore = defineStore('locationStore', {
    state: () => ({school: [], work: []}),
    actions: {
        setSchool(lat,lng){
            this.school = [lat,lng]
        },
        setWork(lat,lng){
            this.work = [lat,lng]
        },
    }
})