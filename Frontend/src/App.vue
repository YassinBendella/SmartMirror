<template>
  <div id="main">
    <router-view/>
    <div id="nav">
      <router-link class="p-10" to="/"><img src="@/assets/power-button.png" alt=""></router-link>
      <img class="p-10" id="hamburger" src="@/assets/hamburger-menu.png" alt="" @click="openHamburger">
      <div id="nav-list" :class="open ? 'active-nav' : 'not-active-nav'">
        <router-link @click="openHamburger" class="nav-item" to="/home"><img src="@/assets/home.png" alt=""></router-link>
        <router-link @click="openHamburger" class="nav-item" to="/schedule"><img src="@/assets/calendar.png" alt=""></router-link>
        <router-link @click="openHamburger" class="nav-item" to="/maps"><img src="@/assets/car.png" alt=""></router-link>
        <router-link @click="openHamburger" class="nav-item" to="/weather"><img src="@/assets/weather.png" alt=""></router-link>
        <router-link @click="openHamburger" class="nav-item" to="/draw"><img src="@/assets/pencil.png" alt=""></router-link>
      </div>
    </div>
  </div>

</template>
<script>
// https://gist.github.com/fzn0x/767630f7a85c0bc3bb11fa72e8783116
Number.prototype.pad = function(n) {
    return (new Array(n).join(0)+this).slice(-n);
}

export default {
  data(){
    return {
      open: false
    }
  },
  methods: {
    openHamburger(){
      this.open = !this.open
      console.log(this.open)
    }
  }


}

</script>


<style>
.p-10{
  padding: 10px;
}


/* *{
  overflow: hidden;
} */

#hamburger:hover{
  cursor: pointer;
  filter: brightness(0.5)
}

.not-active-nav{
  position: absolute;
  left: 100%;
  transition: 500ms;
  display: flex;
  justify-content: space-around;
  background-color: white;
  /* gap: 2vw; */
  padding:10px 20px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 20px;
  width: 45%;
}

.active-nav{
  position: absolute;
  left: 55%;
  transition: 500ms ease-out;
  display: flex;
  justify-content: space-around;
  background-color: white;
  gap: 2vw;
  padding:10px 20px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 20px;
  /* margin-left: 2vw; */
  width: 45%;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background-color: #222427;
  width: 100vw;
  height: 100vh;
}

.page{
  height: 70vh;
  padding: 5vh 2vh;
}

#nav {
  position: relative;
  height: 20vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

#nav img{
  width: 52px;
  height: 52px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
</style>
