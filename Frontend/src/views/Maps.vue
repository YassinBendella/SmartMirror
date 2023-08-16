<template>
    <div class="page" id="map">
        <h1>Traffic</h1>
        <div id="mapid">

        </div>
        <div id="buttons">
            <div class="location">
                <button @click="setLocation('school')">
                    <img src="@/assets/school-marker.png" :class="place == 'school' ? 'active' : ''"/>
                    <p>School</p>
                </button>
            </div>
            <div class="location">
                <button @click="setLocation('work')">
                    <img src="@/assets/work-marker.png" :class="place == 'work' ? 'active' : ''"/>
                    <p>Work</p>
                </button>
            </div>
        </div>
    </div>
  </template>
  
<script>
import leaflet from "leaflet";
import api from '../utils/api.js'
export default {
    data() {
        return {
            zoom: 2,
            map: undefined,
            place: '',
            workLocation: undefined,
            schoolLocation: undefined,
            markers: [],
            markerPositions: {'school': undefined, 'work': undefined}
        }
    },
    mounted(){
        this.map = leaflet.map("mapid", {
            maxBounds: [[-90,-180],   [90,180]],
            maxBoundsViscosity: 1.0,
            minZoom: 1,
            maxZoom: 19,
            bounceAtZoomLimits: true
        }).setView([50.92293629424848, 4.424802046709414], 13)

        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
        }).addTo(this.map)
        this.map.on('click', this.updateLocation)
        this.updateMarkers()
    },
    methods: {
        setLocation(place){
            if (this.place == place){
                this.place = ''
            }else{
                this.place = place
            }
        },
        async updateLocation(e){
            let latlng = e.latlng
            let lat = latlng.lat
            let lng = latlng.lng
            if (this.place != ''){
                console.log(`updating location to: ${lat}, ${lng}`)
                await api.updateLocation(this.place, {'lat': lat, 'lon': lng})
            }
            await this.updateMarkers()
        },

        async updateMarkers(){
            let schoolIcon = leaflet.icon({ 
                iconUrl: 'school-marker.png',
                iconSize: [32, 32],
            });
            let workIcon = leaflet.icon({ 
                iconUrl: 'work-marker.png',
                iconSize: [32, 32],
            });
            for (let marker of this.markers){
                this.map.removeLayer(marker)
            }

            api.getLocation("work").then(location => {
                // console.log("work location fetched")
                // console.log(`new work location ${location.lat}, ${location.lon}`)
                let marker = leaflet.marker([location.lat, location.lon], {icon: workIcon}).addTo(this.map)
                this.markers.push(marker)
            })

            api.getLocation("school").then(location => {
                // console.log("school location fetched")
                // console.log(`new school location ${location.lat}, ${location.lon}`)
                let marker = leaflet.marker([location.lat, location.lon], {icon: schoolIcon}).addTo(this.map)
                this.markers.push(marker)
            })
        }
    }
}
  
</script>

<style scoped>
.leaflet-default-icon-path {
    background-image: url(https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png);
}

#mapid{
    height: 50vh;
    width: 75vw;
}

#mapid > img{
    max-height: none;
}

#map{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

#buttons{
    display: flex;
    gap: 10vw;
}

.location > button:hover{
    transform: translateY(-10px);
    transition: transform 100ms;
}

.location > button{
    background: transparent;
    outline: none;
    border: none;
}

.location > button > img{
    width: 5vw;
    height: 5vw;
}

.active{
    filter: brightness(0.5);
}
</style>