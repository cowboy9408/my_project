<template>
  <div id="details">
    <div class="no_drag noMap" v-if="cabinetdetails.aed == null"> No data was retrieved.</div>
    <span v-if="cabinetdetails.aed != null">

      <GMapMap :center="{
        lat: parseFloat(cabinetdetails.instLatitude),
        lng: parseFloat(cabinetdetails.instLongitude),
      }" :zoom="17" map-type-id="terrain" style="width: 458px; margin-top: 5px; height: 180px; margin-left: 20px"
        :options="options">
        <GMapMarker :key="index" :animation="ani" v-for="(m, index) in locationMarkers" :position="{
          lat: parseFloat(cabinetdetails.instLatitude),
          lng: parseFloat(cabinetdetails.instLongitude),
        }" :clickable="true" :draggable="false" @click="center = m.position" />
      </GMapMap>
    </span>
    <div style="margin-top: 5px;">
      <span style="font-size: 18px;margin-left:20px; color:#565656; font-weight: bold; ">{{ cabinetdetails.title }}</span>
      <va-button id="morebutton" color="#677798" @click="more(cabinetdetails.deviceSno)">More</va-button>
    </div>
    <div class="information">
      <div class="infolist">
        <h3 class="name">Location</h3>
        <p class="info">{{ cabinetdetails.primaryAddr }} &nbsp;{{ cabinetdetails.secondaryAddr }}</p>
      </div>
      <div class="infolist">
        <h3 class="name" style="margin-top:22px;">AED</h3>
        <p class="info"><span v-if="cabinetdetails.aed != null">{{ cabinetdetails.aed.title }}</span></p>
      </div>
      <div class="infolist">
        <h3 class="name">Cabinet SeriaNo</h3>
        <p class="info">{{ cabinetdetails.serialNo }}</p>
      </div>  
      <div class="infolist">
      <h3 class="name">Last Event</h3>
      <p class="info">{{ cabinetdetails.lastStatusUpdateDatetime }}</p>
      </div>
    </div>
    <div>
      <va-button v-on:click="opens(cabinetdetails.deviceSno)" id="cabinetopen" color="#677798" style="margin-left: 20px; margin-top: 2px; height: 25px; width: 458px; size: 90px">
        <img style="flex: 0 0 20px; margin-right: 10px; height: 25px" src="../../assets/images/open-padlock.png" /><span style="font-size: 30px; color:white;">OPEN</span></va-button>
    </div>
    <div class="status">
      <h3 style="text-align: center">STATUS</h3>
      <div class="row">
        <div class="card">
          <va-card v-if="cabinetdetails.cabinetNormalYn == 'Y'" color="#82D83A" >
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/dashboard-check-white.png" />
              <span class="cardtitle">Normal</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.cabinetNormalYn == 'N'" color="primary">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/tt.png" />
              <span style=" padding-left: 8px; font-size: 12px; margin-top: 9px; color: white;">Cabinet Check</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.cabinetNormalYn == null" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/tt.png" />
              <span style=" padding-left: 30px; font-size: 18px; margin-top: 7px; color: white;">NaN</span>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card v-if="cabinetdetails.openedYn == 'Y'" color="primary" >
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/open-padlock.png" />
              <span style=" padding-left: 23px; font-size: 14px; margin-top: 7px; color: white;">Opened</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.openedYn == 'N'" color="#82D83A" >
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/padlock.png" />
              <span style=" padding-left: 28px; font-size: 14px; margin-top: 7px; color: white;">Closed</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.openedYn == null" color="#82D83A" >
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/open-padlock.png" />
              <span style=" padding-left: 30px; font-size: 18px; margin-top: 7px; color: white;">NaN</span>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card v-if="cabinetdetails.aedPresentYn == 'Y'" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/dashboard-AED-present-white.png" />
              <span style=" padding-left: 10px; font-size: 14px; margin-top: 7px; color: white;">AED present</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.aedPresentYn == 'N'" color="primary">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/dashboard-AED-present-white.png" />
              <span style=" padding-left: 10px; font-size: 14px; margin-top: 7px; color: white;">AED Absent</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.aedPresentYn == null" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/dashboard-AED-present-white.png" />
              <span style=" padding-left: 30px; font-size: 18px; margin-top: 7px; color: white;">NaN</span>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card v-if="cabinetdetails.tempNormalYn == 'Y'" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/hot.png" />
              <span style=" padding-left: 19px; font-size: 14px; margin-top: 7px; color: white;">Temp OK</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.tempNormalYn == 'N'" color="primary">
            <va-card-block class="flex-nowrap" vertical>

              <img class="statusimg" src="../../assets/images/high-temperature.png" />
              <span style=" padding-left: 6px; font-size: 12px; margin-top: 7px; color: white;">Temp AbNormal</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.tempNormalYn == null" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/hot.png" />
              <span style=" padding-left: 30px; font-size: 18px; margin-top: 7px; color: white;">NaN</span>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card v-if="cabinetdetails.networkNormalYn == 'Y'" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <!-- <img class="statusimg" src="../../assets/images/globe.png" /> -->
              <img class="statusimg" src="../../assets/images/dashboard-network.png" />
              <span style=" padding-left: 10px; font-size: 14px; margin-top: 7px;color: white;">Network OK</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.networkNormalYn == 'N'" color="primary">
            <va-card-block class="flex-nowrap" vertical>
              <!-- <img class="statusimg" src="../../assets/images/network.png" /> -->
              <img class="statusimg" src="../../assets/images/dashboard-network.png" />
              <span style=" padding-left: 2px; font-size: 12px; margin-top: 7px;color: white;">Network Check</span>
            </va-card-block>
          </va-card>
          <va-card v-if="cabinetdetails.networkNormalYn == null" color="#82D83A"
            style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <!-- <img class="statusimg" src="../../assets/images/globe.png" /> -->
              <img class="statusimg" src="../../assets/images/dashboard-network.png" />
              <span style=" padding-left: 30px; font-size: 18px; margin-top: 7px;color: white;">NaN</span>
            </va-card-block>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: "CabinetDetail",
  data() {
    return {
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        gestureHandling: "greedy",

        styles: [
          {
            featureType: "administrative",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "landscape",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },

        ]
      },
      ani: 1,
      center: { lat: '', lng: '' },
      locationMarkers: [
        {
          position: { lat: '', lng: '' },
        },
      ],
      deviceno: '',
      cabinetdetails: {

        aed: {
          title: ''
        }
      }
    }
  },
  props: {
    cabinetdetails: {
      type: Object,



    },

  },


  methods: {
    more(no) {
      // this.$router.push('/more')
      this.deviceno = no;
      this.$router.push({ name: 'more', query: { deviceSno: this.deviceno } });
    },
    opens(no) {
      this.deviceno = no;

      this.$axios.post('/device/cabinet/open/' + this.deviceno
      )
        .then(res => { })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  float: left;
}

#details {
  margin-top: 20px;
  margin-left: 30px;
  background-color: white;
  height: 620px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #bdbebd;
  width: 495px;
  padding-top: 10px
}

#title {
  margin: 30px 0 0 20px;
}
#morebutton{
  width: 65px;
  margin-left: 10px ; 
  margin-top:2px;
  height: 35px;
  color:white;
}

.name {
  margin: 12px 0 3px 20px;
  font-size:16px;
  color:#565656;

}

.info {
  margin-left: 22px;
  font-size: 13.6px;
  line-height: 1.2;
  color:#767c88;
}

.infolist{
  margin-top: 5px;
  height: 43px;
}

.status {

  margin-top:8px;
}

.statusimg {
  width: 30px;
  height: 30px;
  display: block;

  margin-left: 30px;
  margin-top: 7px;
}

#statusimg {
  width: 40px;
  height: 40px;
  display: block;

  margin-left: 25px;
  margin-top: 2px;
}

.va-card {
  margin-left: 6px;
  margin-top: 15px;
  width: 91px;
  height: 65px;
  box-shadow: 3px 3px 4px #adb5bd ;
}

.cardtitle {
  font-size: 14px;
  margin-top: 7px;
  color: white;

  padding-left: 24px;
}

.information {
  position: relative;
  margin-top: 5px;
}


.no_drag {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

.noMap {
  width: 458px;
  height: 180px;
  margin-left: 20px;
  margin-top: 5px;
  background-color: lightgray;
  text-align: center;
  line-height: 180px;
}
</style>
<style lang="scss">
.va-button__content {
  color:white;
}
</style>