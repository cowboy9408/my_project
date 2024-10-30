<template>
  <div id="more">
    <div class="row">
      <div style="width: 300px; height: 550px; margin-left: 30px">
        <va-button-dropdown :label="detailInfo.title" class="drop" size="large" :close-on-content-click="false"
          color="#ffffff">
          <div class="dropmenu">
            <div class="tower">
              <a href="#" style="font-size: 20px; color: #767474"> Cabinet Open  </a>
            </div>
            <div class="tower">
              <span style="font-size: 20px; color: #767474"> Modify Group </span>
            </div>
            <div class="tower">
              <a href="#" style="font-size: 20px; color: #767474"> Modify Cabinet </a>
            </div>
            <div class="tower">
              <a href="#" style="font-size: 20px; color: #767474"> Modify AED </a>
            </div>
            <div class="tower">
              <a href="#" style="font-size: 20px; color: #767474"> Modify Notifications </a>
            </div>
            <div class="tower">
              <span style="font-size: 20px; color: #767474"> Remove Cabinet </span>
            </div>
          </div>
        </va-button-dropdown>
        <div class="imgcard" style="margin-top: 113px; box-shadow: 3px 3px 5px #bdbebd">
          <img class="img" src="../../assets/images/cabinet.jpg" style="width: 300px" />
          <h1 class="title">Model</h1>
          <h1 class="model">{{ detailInfo.model }}</h1>
        </div>
      </div>
      <div class="aedcard">
        <div class="row">
          <va-card stripe stripe-color="danger" class="detailcard">
            <va-card-title style="font-size: 16px">
              <strong> INFO </strong>
            </va-card-title>
            <va-card-content style="font-size: 14px">
              Serial No : {{ deviceSno }}
              <br />
              <br />
              Model : {{ detailInfo.model }}
              <br />
              <br />
              Group : Group1
              <va-button size="small" class="mr-4 mb-2" round style="width: 80px; height: 5px">
                <a>
                  <span class="font"> Modify </span>
                </a>
              </va-button>
              <br />
              Location : {{ detailInfo.primaryAddr }}
              <br />
              <br />
              {{ detailInfo.secondaryAddr }}
              <va-button size="small" class="mr-4 mb-2" round style="width: 80px; height: -10px; margin-top: 5px;">
                <a>
                  <span class="font"> Modify </span>
                </a>
              </va-button>
              <br />
              Last Event : {{ detailInfo.lastStatusUpdateDatetime }}
              <router-link :to="{ name: 'history', query: { deviceSno: detailInfo.deviceSno } }">
                <va-button size="small" class="mr-4 mb-2" round style="width: 80px; height: 5px">
                  <a>
                    <span class="font"> History </span>
                  </a>
                </va-button>
              </router-link>
            </va-card-content>
          </va-card>
          <va-card stripe stripe-color="warning" class="detailcard">
            <va-card-title style="font-size: 16px">SYSTEM
              <br />
            </va-card-title>
            <va-card-content style="font-size: 14px">
              Temp. : 25°C
              <br />
              <br />
              Min Temp : 0 °C
              <br />
              <br />
              Led : Red
              <br />
              <br />
              Firmware : v2.1.1
              <br />
              <br />
              Battery : OK (Warranty : 2024-10-11)
              <br />
              <br />
              Signal : -51dBm
            </va-card-content>
          </va-card>
        </div>
        <div class="row">
          <va-card stripe stripe-color="primary" class="detailcard">
            <va-card-title style="font-size: 16px">
              <strong> AED </strong>
            </va-card-title>
            <va-card-content style="font-size: 14px">
              AED Status : OK (Warranty : 2024-10-11)
              <br />
              <br />
              AED presence : OK
              <br />
              <br />
              AED Manufacturer : CU Medical
              <br />
              <br />
              AED Model : CU-SPR
              <va-button size="small" class="mr-4 mb-2" round style="width: 80px; height: 20%;">
                <a>
                  <span class="font"> Modify </span>
                </a>
              </va-button>
              <br />
              Battery : OK (Warranty : 2024-10-11)
              <br />
              <br />
              PADS : OK (Warranty : 2024-10-11)
            </va-card-content>
          </va-card>
          <va-card stripe stripe-color="success" class="detailcard">
            <va-card-title style="font-size: 16px; position:relative; top:-10px;">
              <strong> STATUS </strong>
              <br>
              <br>
            </va-card-title>
            <div class="row">
        <div>
          <va-card class="card" v-if="detailInfo.cabinetNormalYn == 'Y'" color="#82D83A">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/dashboard-check-white.png" />
              <span class="cardtitle">Normal</span>
            </va-card-block>
          </va-card>
          <va-card class="card" v-if="detailInfo.cabinetNormalYn == 'N'" color="primary">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/tt.png" />
              <span style=" padding-left: 10px; font-size: 12px; margin-top: 9px; color: white;">Cabinet Check</span>
            </va-card-block>
          </va-card>
          
        </div>
        <div>
          <va-card class="card" v-if="detailInfo.openedYn == 'Y'" color="primary" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/open-padlock.png" />
              <span style=" padding-left: 23px; font-size: 14px; margin-top: 7px; color: white;">
                Opened</span>
            </va-card-block>
          </va-card>
          <va-card class="card" v-if="detailInfo.openedYn == 'N'" color="#82D83A" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/padlock.png" />
              <span style=" padding-left: 28px; font-size: 14px; margin-top: 7px; color: white;">
                Closed</span>
            </va-card-block>
          </va-card>
          

        </div>
        <div>
          <va-card class="card" v-if="detailInfo.aedPresentYn == 'Y'" color="#82D83A" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <img id="statusimg" src="../../assets/images/user.png" />
              <span style=" padding-left: 10px; font-size: 14px; margin-top: 5px; color: white;">AED present</span>
            </va-card-block>
          </va-card>
          <va-card class="card" v-if="detailInfo.aedPresentYn == 'N'" color="primary" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <img id="statusimg" src="../../assets/images/absent.png" />
              <span style=" padding-left: 13px; font-size: 14px; margin-top: 2px; color: white;">AED Absent</span>
            </va-card-block>
          </va-card>
          
        </div>
        <div>
          <va-card class="card" v-if="detailInfo.tempNormalYn == 'Y'" color="#82D83A" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>

              <img class="statusimg" src="../../assets/images/hot.png" />
              <span style=" padding-left: 23px; font-size: 15px; margin-top: 7px; color: white;">Temp
                OK</span>
            </va-card-block>
          </va-card>
          <va-card class="card" v-if="detailInfo.tempNormalYn == 'N'" color="primary" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>

              <img class="statusimg" src="../../assets/images/high-temperature.png" />
              <span style=" padding-left: 6px; font-size: 12px; margin-top: 7px; color: white;">Temp
                AbNormal</span>
            </va-card-block>
          </va-card>
          
        </div>
        <div>
          <va-card class="card" v-if="detailInfo.networkNormalYn == 'Y'" color="#82D83A" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/globe.png" />
              <span style=" padding-left: 10px; font-size: 14px; margin-top: 7px;color: white;">Network
                OK</span>

            </va-card-block>
          </va-card>
          <va-card class="card" v-if="detailInfo.networkNormalYn == 'N'" color="primary" style="box-shadow: 3px 3px 4px #adb5bd">
            <va-card-block class="flex-nowrap" vertical>
              <img class="statusimg" src="../../assets/images/network.png" />
              <span style=" padding-left: 7px; font-size: 13px; margin-top: 7px;color: white;">Network Check</span>

            </va-card-block>
          </va-card>
          
        </div>
      </div>
            
          </va-card>
        </div>
      </div>
    </div>
    <div class="row">
      <div style="width: 1580px; height: 280px; margin-left: 30px; margin-top: 4px">
        <div class="row">
          <div style="width: 760px; height: 290px">
            <GMapMap :center="{ lat: parseFloat(detailInfo.instLatitude), lng: parseFloat(detailInfo.instLongitude) }"
              :zoom="17" map-type-id="terrain" style="width: 100%; height: 265px" :options="options" class="map">
              <GMapMarker :key="index" :animation=ani v-for="(m, index) in locationMarkers"
                :position="{ lat: parseFloat(detailInfo.instLatitude), lng: parseFloat(detailInfo.instLongitude) }"
                :clickable="true" :draggable="false" @click="center = m.position" />

            </GMapMap>
          </div>
          <div style="width: 800px; height: 280px; margin-left: 18px">
            <va-carousel :items="items1" v-model="value" indicators indicatorTrigger="hover" style="width: 100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";

</script>
<script>


export default {
  data() {
    return {

      deviceSno: '',
      detailInfo: '',
      title: '',






      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        disableDefaultUi: false,
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
      items: [
        { title: "Dashboard", icon: "dvr" },
        { title: "Statistic", icon: "assessment" },
        { title: "Form", icon: "settings" },
      ],
      value: 0,
      items1: [
        "https://i.ibb.co/nrqy07V/1.jpg",
        "https://i.ibb.co/SNh9MRY/2.jpg",
        "https://i.ibb.co/McjB0sq/3.jpg",
      ],
      ani: 1,
      center: { lat: 37.396062, lng: 126.965527 },
      locationMarkers: [
        {
          position: { lat: 37.396062, lng: 126.965527 },

        }, // Along list of clusters
      ],
      locPlace: [],
      existingPlace: null
    };
  },
  methods: {
    getdetails() {
      this.$axios.get('/device/cabinet/' + this.deviceSno, {})
        .then(res => {
          this.detailInfo = res.data.data;


          // console.log(res.data);
          // this.data = res.data.data; //데이터 조회
          // this.primaryAddr = res.data.data.primaryAddr;
          // this.deviceSno = res.data.data.deviceSno;
          // this.model = res.data.data.model;
          // this.lastStatusUpdateDatetime = res.data.data.lastStatusUpdateDatetime;
          // this.secondaryAddr = res.data.data.secondaryAddr;

        })
        .catch(function (error) {
          console.log(error);
        });
    }

  },

  created() {
    this.deviceSno = this.$route.query.deviceSno;
    this.getdetails();
  }
};
</script>





<style scoped>
#more {

  background-color: white;
  height: 870px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #bdbebd;
  margin-left: 20px;
  width: 1630px;
  padding-top: 10px;
}

.drop {
  width: 210px;
  height: 95px;
}

.dropmenu {
  margin-left: 10px;
  width: 200px;
  height: 250px;
  background: transparent;
}

.aedcard {
  margin-left: 5px;
  width: 1280px;
  height: 550px;
}

.detailcard {
  margin-left: 17px;
  margin-top: 15px;
  width: 617px;
  height: 250px;
}

.imga {
  margin-top: 180px;
}

.font {
  font-size: 12px;
  color:white;
}







.tower {
  padding-bottom: 5px;
  margin-bottom: 20px;
}

.model {
  position: relative;
  color: #ffffff;
  top: -160px;
  left: 120px;
}

.title {
  color: black;
  position: relative;
  top: -295px;
  left: 120px;
  font-size: 25px;
}

.imgcard {
  margin-top: 150px;
  box-shadow: 3px 3px 5px #bdbebd;
  position: relative;
  top: -33px;
  border-top: 5px solid purple;

}

.img {
  position: relative;
  top: 25px;
}

a {
  color: #ffffff;
}

.map {
  border: 5px solid;
  border-color: #E6E6E6;
}


#statusimg {
  width: 60px;
  height: 60px;
  display: block;

  margin-left:23px ;
  margin-top: 5px;
}
.cardtitle {
  font-size: 15px;
  margin-top: 7px;
  padding-left: 24px;
}
.card{
  width:105px;
  height: 100px;
  margin-left: 15px;
  margin-top:5px;
}
.statusimg {
  width: 45px;
  
  display: block;

  margin-left: 30px;
  margin-top: 15px;
}
.cardtitle {
  font-size: 14px;
  margin-top: 7px;
  color: white;

  padding-left: 24px;
}

</style>

<style lang="scss">
.drop .va-dropdown__content{
  margin-left: 160px;
}
</style>