<!-- https://codesandbox.io/s/vue-3-drawing-canvas-demo-ihmmz?file=/src/App.vue -->
<template>
    <div class="page" id="drawing-board">
        <div id="canvas" ref="canvasWrapper">
            <vue-drawing-canvas
            v-model="image"
            :width="width"
            :height="height"
            :stroke-type="strokeType"
            backgroundColor="#222427"
            :color="color"
            :line-cap="lineCap"        
            :line-join="lineJoin"
            :eraser="eraser"
            />
        </div>
        <div id="drawing-toolbar">
            <button class="colour pencil">
                <img v-if="eraser" src="@/assets/eraser.png" alt="" @click="changeStatus">
                <img v-if="!eraser" src="@/assets/pencil.png" alt="" @click="changeStatus">
            </button>
            <button class="colour red" @click="changeColour('#ff0000')">

            </button>
            <button class="colour blue" @click="changeColour('#0000ff')">

            </button>
            <button class="colour green" @click="changeColour('#00ff00')">

            </button>
            <button class="colour yellow" @click="changeColour('#fffb00')">

            </button>
            <button class="colour orange" @click="changeColour('#ff9100')">

            </button>
            <button class="colour purple" @click="changeColour('#9900ff')">

            </button>
            <input class="colour" type="color" v-model="color"/>
        </div>
    </div>
</template>

<script>
import VueDrawingCanvas from 'vue-drawing-canvas'

export default {
    components: {
        VueDrawingCanvas
    },
    data(){
        return {
            image: "",
            color: "#000000",
            strokeType: "dash",
            lineCap: "square",
            lineJoin: "miter",
            eraser: false,
            width: 500,
            height: 500
        }
    },
    created() {
        window.addEventListener("resize", this.resizeEvent);
        this.resizeEvent()
    },
    unmounted() {
        window.removeEventListener("resize", this.resizeEvent);
    },
    methods:{
        changeStatus(){
            this.eraser = !this.eraser
        },
        resizeEvent() {
            this.width = window.innerWidth * 0.75;
            this.height = window.innerHeight * 0.7;
        
            console.log(window.innerWidth)
            console.log(window.innerHeight)
        },
        changeColour(colour){
            this.color = colour
        }
    }
}
</script>

<style scoped>
#drawing-board{
    display: flex;
}
#canvas{
    flex-grow: 1;
}
#canvas > canvas{
    border: 1px solid black;
}
#drawing-toolbar{
    /* position:absolute; */
    /* right: 10vw; */
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1vh;
    background-color: white;
    border-radius: 50px;
    padding: 10px;
    margin: 2vw;
    justify-content: center;
    align-items: center;
}
.colour > img{
    width: 3vw;
    height: 3vw;
    margin: auto;
}
.colour{
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 50%;
    outline: none;
    border: none;
}

.pencil{
    background-color: #aaa;
    width: 5vw;
    height: 5vw;
}

.red{
    background-color: #f00;
}
.blue{
    background-color: #00f;
}
.green{
    background-color: #0f0;
}
.yellow{
    background-color: #fffb00;
}
.orange{
    background-color: #ff9100;
}
.purple{
    background-color: #9900ff;
}
</style>