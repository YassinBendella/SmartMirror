<template>
  <div class="page" id="home">
    <div class="square" id="upper-left">
      <Clock/>
    </div>
    <div class="square" id="upper-right">
      <Weather/>
    </div>
    <div class="square" id="middle">
      <Directions/>
    </div>
    <div class="square" id="bottom">
      <Schedule/>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import Clock from '../components/Clock.vue';
import Schedule from '../components/Schedule.vue';
import Weather from '../components/Weather.vue';
import Directions from '../components/Directions.vue';
export default {
  name: 'Home',
  components: {
    Clock, Schedule, Weather, Directions
  }
}
</script>

<style scoped>
#home{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

#upper-left{
  grid-area: 1 / 1 / 2 / 2;
}

#upper-right{
  grid-area: 1 / 2 / 2 / 3;
}
#middle{
  grid-area: 2 / 1 / 3 / -1;
}
#bottom{
  grid-area: 3 / 1 / -1 / -1
}

.square{
  margin:auto;
}
</style>