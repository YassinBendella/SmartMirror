<template>
  <div id="clock-module">
    <p> {{hours.pad(2)}}:{{minutes.pad(2)}}.{{seconds.pad(2)}} </p>
    <p> {{ day }} {{ day_number.pad(2) }} {{ month }}</p>
  </div>
</template>
<script>
export default {
  name: 'Clock',
  props: {
    msg: String
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      month: 0,
      day: 0,
      day_number: 0,
      day_translation: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      month_translation: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  created(){
    const date = new Date();
    this.hours = date.getHours()
    this.minutes = date.getMinutes()
    this.seconds = date.getSeconds()
    this.month = this.month_translation[date.getMonth()]
    this.day_number = date.getDate()
    this.day = this.day_translation[date.getDay()]
  
    setInterval(() => {
      const date = new Date();
      this.hours = date.getHours()
      this.minutes = date.getMinutes()
      this.seconds = date.getSeconds()
    }, 1000);

  }
}
</script>

<style scoped>
p{
  color: white;
  font-size: xx-large;
}
</style>
