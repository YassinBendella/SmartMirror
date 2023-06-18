<template>
    <div class="page" id="lock-screen">
        <Clock class="p-10"/>
    </div>
</template>

<script>
import Clock from '../components/Clock.vue';

export default{
    components: {Clock}  
}
</script>

<style scoped>
.p-10{
    padding: 10vh;
}


#lock-screen{
    display: flex;
}
</style>