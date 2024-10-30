<template>
  <div class="MyDashBoardBody">
    <div id="factboard">
      <div class="row">
        <div class="card">
          <va-card gradient @click="condition = null; this.focusDeviceSno=null;this.page = 1" :color="condition==null?'#90ACE1':'#ffffff'">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition==null ? 'cardtitlewhite':''">Total</va-card-title>
                <va-card-content class="cardcontent" :class="condition==null ? 'cardtitlewhite':''">{{ status.total }}</va-card-content>
              </div>
              <img v-if="condition == null" class="img" src="../../assets/images/dashboard-total.png"/>
              <img v-else class="img" src="../../assets/images/dashboard-total-skyblue.png"/>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card gradient @click="condition = 'NORMAL'; this.page = 1" :color="condition=='NORMAL'?'#82D83A':'#ffffff'">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition=='NORMAL' ? 'cardtitlewhite':''">Normal</va-card-title>
                <va-card-content class="cardcontent" :class="condition=='NORMAL' ? 'cardtitlewhite':''">{{ status.normal }}</va-card-content>
              </div>
              <img v-if="condition == 'NORMAL'" class="img" src="../../assets/images/dashboard-check-white.png"/>
              <img v-else class="img" src="../../assets/images/dashboard-check-green.png"/>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card  gradient @click="condition = 'DEVICE' ; this.page = 1" :color="condition=='DEVICE'?'danger':'#ffffff'">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition=='DEVICE' ? 'cardtitlewhite':''">Cabinet Check</va-card-title>
                <va-card-content class="cardcontent" :class="condition=='DEVICE' ? 'cardtitlewhite':''">{{ status.device }}</va-card-content>
              </div>
              <img v-if="condition == 'DEVICE'" class="img" src="../../assets/images/tt.png"/>
              <img v-else class="img" src="../../assets/images/maintenance.png"/>
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card gradient @click="condition = 'OPENED' ; this.page = 1" :color="condition=='OPENED'?'primary':'#ffffff'">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition=='OPENED' ? 'cardtitlewhite':''">Opened</va-card-title>
                <va-card-content class="cardcontent" :class="condition=='OPENED' ? 'cardtitlewhite':''">{{ status.opened }}</va-card-content>
              </div>
              <img v-if="condition == 'OPENED'" class="img" src="../../assets/images/open-padlock.png" />
              <img v-else class="img" src="../../assets/images/open-padlocks.png" />
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card gradient @click="condition = 'AED' ; this.page = 1" :color="condition=='AED'?'secondary':'#ffffff'">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition=='AED' ? 'cardtitlewhite':''">AED Absent</va-card-title>
                <va-card-content class="cardcontent" :class="condition=='AED' ? 'cardtitlewhite':''">{{ status.aed }}</va-card-content>
              </div>
              <img v-if="condition=='AED'" class="img" src="../../assets/images/dashboard-AED-Absent-white.png" />
              <img v-else class="img" src="../../assets/images/dashboard-AED-Absent-darkgray.png" />
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card :color="condition=='TEMPERATURE'?'secondary':'#ffffff'" gradient @click="condition = 'TEMPERATURE' ; this.page = 1">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition=='TEMPERATURE' ? 'cardtitlewhite':''">Temp AbNormal</va-card-title>
                <va-card-content  class="cardcontent" :class="condition=='TEMPERATURE' ? 'cardtitlewhite':''">{{ status.temperature }}</va-card-content>
              </div>
              <img v-if="condition == 'TEMPERATURE'" class="img" src="../../assets/images/high-temperature.png" />
              <img v-else class="img" src="../../assets/images/high-temperatures.png" />
            </va-card-block>
          </va-card>
        </div>
        <div class="card">
          <va-card :color="condition=='NETWORK'?'#ffb900':'#ffffff'" gradient @click="condition = 'NETWORK' ; this.page = 1">
            <va-card-block class="flex-nowrap" horizontal>
              <div style="flex: auto;">
                <va-card-title class="cardtitle" :class="condition=='NETWORK' ? 'cardtitlewhite':''">Network Check</va-card-title>
                <va-card-content   class="cardcontent" :class="condition=='NETWORK' ? 'cardtitlewhite':''">{{ status.network }}</va-card-content>
              </div>
              <img v-if="condition == 'NETWORK'" class="img" src="../../assets/images/dashboard-no-wifi-white.png" />
              <img v-else class="img" src="../../assets/images/dashboard-no-wifi-yellow.png" />
            </va-card-block>
          </va-card>
        </div>
      </div>
    </div>
    <div id="cabinetboard">
      <div class="row">
        <div id="cabinets">
          <span id="cabinettitle">CABINETS</span>
          <router-link :to="{name: 'addcabinet'}" id="addcaninet" ><span class="addcabinet"> + Add Cabinet</span></router-link>
          <va-input v-on:input="typing" class="search" id="search" v-model="cabinettitle" placeholder="Search">
            <template #prependInner>
              <va-icon name="search" />
            </template>
          </va-input>
          <div class="listcabinet">
            <va-list active-class="primary">
              <div class="bb" style="height: 480px; overflow: scroll; overflow-x: hidden ">
                <va-list-item class="aa" v-for="cabinet in list" :key="cabinet">
                  <div class="listed" :class="[cabinet.deviceSno == data.deviceSno ? 'selected' : '']">
                    <div id="btn" class="dash" @click="cabinetdetails(cabinet)">
                      <va-list-item-section avatar>
                        <img class="avatr" src="../../assets/images/back-removebg-preview.png">
                      </va-list-item-section>
                      <va-list-item-section>
                        <va-list-item-label style="font-weight:bold">
                          {{ cabinet.title }}
                        </va-list-item-label>
                        <va-list-item-label caption>
                          S/N : {{ cabinet.serialNo }}
                        </va-list-item-label>
                        <va-list-item-label caption>
                          Loc :{{ cabinet.primaryAddr }} , {{ cabinet.secondaryAddr }}
                        </va-list-item-label>
                      </va-list-item-section>
                    </div>
                    <div>
                      <img style="flex: 0 5px 180px; height: 40px;" :src="cabinet.imga" />
                    </div>
                    <div>
                      <va-list-item-section class="iconbtn" @click="more(cabinet.deviceSno)">
                        <img  src="../../assets/images/eye.png">
                      </va-list-item-section>
                    </div>
                  </div>
                </va-list-item>                
                <div v-show ="!this.infiniteLoadingFlag">
                  <infinite-loading v-if="list.length > 0" @infinite="infiniteHandler" style="margin-left: 320px;"></infinite-loading>
                </div>
              </div>
            </va-list>
          </div>
        </div>
        <CabinetDetail :cabinetdetails='data'></CabinetDetail>
        <Histories :historydeviceSno='deviceSno'></Histories>
      </div>
    </div>
    <div id="statuschart">
      <canvas id="BarChart" width="1400" height="350"></canvas>
    </div>
    <div id="Validity">
      <div class="row">
        <div class="doughnut">
          <canvas id="AEDValidity" width="490" height="390"></canvas>
        </div>
        <div class="doughnut" style="margin-left: 30px;">
          <canvas id="BatteryValidity" width="490" height="390"></canvas>
        </div>
        <div class="doughnut" style="margin-left: 30px;">
          <canvas id="PadValidity" width="490" height="390"></canvas>
        </div>
      </div>
    </div>
    <p v-show="false">
      {{ updateWebSocketSession }}
      {{ statusWebSocketSession }}
    </p>
  </div>
</template>

<script>

import CabinetDetail from './CabinetSummary.vue';
import Histories from './History.vue';
import Chart from 'chart.js/auto';
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import debounce from 'lodash.debounce'


export default {

  name: "MyDashboard",
  components: { CabinetDetail, Histories },
  data() {
    return {
      data: '', 
      deviceSno: '',
      status: [],
      list: [],
      cabinetdeviceSno: '',
      title: '',
      condition: null,
      cabinettitle: '',
      totalCount: '',
      timerForUpdate: 1,
      timerForStatus: 1,
      stompClient: null,
      isSockConnected: false,
      isReConnection: false, // 소켓연결이 끊어진 후 재연결시 데이터를 새로 조회하도록(끊어진 동안 발생한 데이터 메시지를 위함) 하기위한 플래그
      focusDeviceSno: null,
      page: 1,
      size: 5,
      infiniteLoadingFlag: false,
    };
  },

  // 검색란 바뀔 때마다 목록 변경 확인
  watch: {
    cabinettitle: debounce(function () {
      this.list = [];
      this.title = this.cabinettitle;
      this.page = 1;
      this.infiniteLoadingFlag = false;
      this.getList();
    },250),

    //상태카드 선택시 데이터 초기화 후 리스트 조회
    condition: function () {
      this.list = [];
      this.title = this.cabinettitle;
      this.focusDeviceSno=null;
      this.page = 1;
      this.infiniteLoadingFlag = false;
      this.getList();
    }
  },

  methods: {

    //선택한 캐비넷 상세 사항으로 데이터 전달   
    cabinetdetails(cabinet) {
      this.data = cabinet;
      this.deviceSno = cabinet.deviceSno;
    },

    //스크롤 아래 닿았을 때 발생 이벤트
    infiniteHandler($state) {

      setTimeout(() => {
        if (this.totalCount == null || this.list.length < this.totalCount) {
          this.getList();
        }
        else {
          this.infiniteLoadingFlag = true;
          // $state.complete();
        }
      }, 500)
    },

    //실시간 바인딩
    typing(e) {
      this.infiniteLoadingFlag = false;
      this.cabinettitle = e.target.value
    },

    //more페이지 deviceSno 전달
    more(no) {
      this.cabinetdeviceSno = no;
      this.$router.push({ name: 'more', query: { deviceSno: this.cabinetdeviceSno } });
    },
    //Cabinet 목록 조회
    getList() {
      if(this.focusDeviceSno != null){
        this.deviceSno = null;
      }
      this.$axios.get('/device/cabinet', {
        params: {
          title: this.title, //캐비넷 검색 title
          condition: this.condition,
          page: this.page,
          size: this.size
        }
      }).then(res => {
          this.list = [...this.list, ...res.data.list]; //캐비넷 리스트 조회 
          this.totalCount = res.data.totalCount; // 총 캐비넷 수   
          this.page = this.page + 1;
          if (this.totalCount != 0) {
            if (this.focusDeviceSno != null) { //상태가 변경 된 deviceSno
              for (var i = 0; i < this.list.length; i++) {
                if (this.focusDeviceSno == this.list[i].deviceSno) {
                  this.data = this.list[i];
                  this.deviceSno = this.list[i].deviceSno;
                  return ;
                }
              }
            }
            else {
              this.data = this.list[0];     //props 첫번째 데이터
              this.deviceSno = this.list[0].deviceSno;  //props 첫번째 deviceSno
            }
          }
          else {
            this.data = {};
            this.deviceSno = '';
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //캐비넷 상태 조회
    getStatus() {
      this.$axios.get('/device/cabinet/status', {})
        .then(res => {
          this.status = res.data.status; //캐비넷 상태 데이터 조회          
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    connect() {
      if (this.stompClient) {
        this.disconnected();
      }
      const serverURL = "/cabinetserver/ws";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log("Attempting to connect to a socket with the server. Server URL: " + serverURL)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          this.isSockConnected = this.connected = true;
          console.log('Socket connection successful', frame);

          //연결이 끊어진 동안 데이터가 바뀌었을수 있으므로 최신 데이터 조회
          if (this.isReConnection == true) {
            //TODO 데이터 조회
            this.infiniteLoadingFlag = false;
            this.getList();
            this.getStatus();
            this.isReConnection = false;
          }

          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/send", res => {

            // 수신 메시지
            console.log('Message received by subscription.', res.body);
            //TODO 데이터 조회
            this.focusDeviceSno = res.body;
            this.page = 1;
            this.list = [];
            this.infiniteLoadingFlag = false;
            this.getList();
            this.getStatus();
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('Socket connection failed', error);
          this.isReConnection = true;// 소켓 연결이 끊어졌을때 재연결시 데이터를 조회하기위해 isReConnection 플래그 true 설정
          this.isSockConnected = this.connected = false;
        }
      );
      return this.connection;
    },

    disconnected() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        this.stompClient = null;
      }
    },

    // Session 갱신
    updateSession: function () {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send("/pub/updateSession", {});
      }
    },

  },
  computed: {
    // 주기적으로 Web Socket Session 갱신
    // 1000: 1초 / 600
    updateWebSocketSession() {
      setTimeout(() => {
        this.timerForUpdate = this.timerForUpdate + 1;
        this.updateSession();
      }, 1000 * 600); // 10분
      return this.timerForUpdate;
    },
    //소켓 연결상태를 5초 주기로 체크하여 재연결 시도
    statusWebSocketSession() {
      setTimeout(() => {
        //computed event가 발생하도록 하는 구문
        this.timerForStatus = this.timerForStatus + 1;

        //소켓 연결상태가 false 인경우 재시도
        if (!this.isSockConnected) {
          this.connect();
        }
      }, 1000 * 5); // 5초

      return this.timerForStatus;
    },
  },

  created() {

    //캐비넷 목록 조회
    this.getList();
    
    //캐비넷 상태 조회
    this.getStatus()
    
    //소켓 연결    
    this.connect();
  },

  mounted() {

    const ctx = document.getElementById('BarChart');
    const ctx1 = document.getElementById('AEDValidity');
    const ctx2 = document.getElementById('BatteryValidity');
    const ctx3 = document.getElementById('PadValidity');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [{
          label: 'Normal',
          data: [0, 0, 0, 0, 1, 1, 2, 3, 4, 5, 12, 12],
          hoverBackgroundColor: '#76c435',
          borderWidth: 1,
          backgroundColor: "#82D83A"
        },
        {
          label: 'AED Check',
          data: [],
          borderWidth: 1,
          hoverBackgroundColor: '#ea0000',
          backgroundColor: "red "
        },
        {
          label: 'Opend',
          data: [],
          borderWidth: 1,
          backgroundColor: "blue"
        },
        {
          label: 'Temp AbNormal',
          data: [],
          borderWidth: 1,
          backgroundColor: "rgba(141,149,165)"
        },
        {
          label: 'Network Check',
          data: [],
          borderWidth: 1,
          backgroundColor: "#FFD43A"
        }],
      },

      options: {
        plugins: {
          title: {
            display: true,
            text: 'Status Chart',
            font: {
              size: 18,
              family: ['NotoKr', 'Noto Sans JP', 'sans-serif']
            },
            color: "#767474 ",
            align: 'start',
          },
        },

        responsive: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });

    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Normal', 'Expired', 'Imminent Expiration'],
        datasets: [{
          label: ' of Votes',
          data: [11, 0, 1],
          hoverBackgroundColor: ['#76c435', "#787878", "#ea0000"],
          backgroundColor: ["#82D83A", "gray", "red"],
          borderWidth: 1
        }],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'AED Validity',
            font: {
              size: 18,
              family: ['NotoKr', 'Noto Sans JP', 'sans-serif']
            },
            color: "#767474 "
          }
        }
      },
    });

    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Normal', 'Expired', 'Imminent Expiration'],
        datasets: [{
          label: 'of Votes',
          data: [10, 1, 1],
          hoverBackgroundColor: ['#76c435', "#787878", "#ea0000"],
          backgroundColor: ["#82D83A", "gray", "red"],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Battery Validity',
            font: {
              size: 18,
              family: ['NotoKr', 'Noto Sans JP', 'sans-serif']
            },
            color: "#767474 "
          }
        }
      },
    });

    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Normal', 'Expired', 'Imminent Expiration'],
        datasets: [{
          label: ' of Votes',
          data: [9, 2, 1],
          hoverBackgroundColor: ['#76c435', "#787878", "#ea0000"],
          backgroundColor: ["#82D83A", "gray", "red"],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Pad Validity',
            font: {
              size: 18,
              family: ['NotoKr', 'Noto Sans JP', 'sans-serif']
            },
            color: "#767474 "
          }
        }
      },
    });
  },

  beforeRouteLeave(to, from, next) {
    this.disconnected();
    next();
  },
}
</script>

<style lang="scss">

.bb::-webkit-scrollbar-track {
  background: rgba(33, 122, 244, .1);
  /*스크롤바 뒷 배경 색상*/
}

.bb::-webkit-scrollbar {
  width: 4px;
  /* 스크롤바의 너비 */
}

.bb::-webkit-scrollbar-thumb {
  height: 30%;
  /* 스크롤바의 길이 */
  background: #767C88;
  /* 스크롤바의 색상 */
  border-radius: 15px;
}





body::-webkit-scrollbar-track {
  background: rgba(33, 122, 244, .1);
  /*스크롤바 뒷 배경 색상*/
}


body::-webkit-scrollbar {
  width: 4px;
  background: rgba(33, 122, 244, .1);
  /* 스크롤바의 너비 */
}

body::-webkit-scrollbar-thumb {
  height: 30%;
  /* 스크롤바의 길이 */
  background: #767C88;
  /* 스크롤바의 색상 */
  border-radius: 15px;
}




</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.aa::-webkit-scrollbar-track {
  background: rgba(33, 122, 244, .1);
  /*스크롤바 뒷 배경 색상*/
}


.aa::-webkit-scrollbar {
  width: 4px;
  background: red;
  /* 스크롤바의 너비 */
}

.aa::-webkit-scrollbar-thumb {
  height: 30%;
  /* 스크롤바의 길이 */
  background: #767C88;
  /* 스크롤바의 색상 */
  border-radius: 15px;
}

.MyDashBoardBody {
  width: 1635px;
  

}
.listcabinet{
  margin-top: 30px; 
  height: 520px; 
  width: 680px;
}
.list__item {
  margin-top: 10px;
  margin-left: 15px;
}
.img{
  margin-right: 10px;
  margin-top: 15px;
  width: 35px;
  height: 35px;
}
.listed {
  width: 680px;
  height: 97px;
  padding: 20px;
  display: flex;
  margin: 0px;
}

.selected {
  background-color: #E1F1FF !important;
}

#factboard {
  
  border-radius: 10px;
  
  width: 1635px;
  margin-left: 10px;
  height: 120px;
}

#cabinetboard {
  margin-top: 2px;
  width: 1630px;
  margin-left: 20px;
  height: 640px;
}
.body{
  color: var(--va-on-color);
}

.va-card {
  position: relative;
  margin: 10px;
  margin-left: 10px;
  width: 213px;
  box-shadow: 3px;
  cursor: pointer;
  box-shadow: 3px 3px 4px #adb5bd;
  width: 213px ;
  height: 100px;

}

.search {
  position: relative;
  overflow: hidden;
  width: 550px;
  margin: 5px 30px 0px 60px;

}
.addcabinet{
  height: 33px;
  
  color:rgb(21, 78, 193);
  
  width: 120px;
  font-weight: 700;
  float: right;
  margin-right: 20px;
}

.avatr {
  width: 60px;
  height: 60px;
}


.cardtitle {
  font-size: 15px;
  padding-top: 23px;
  padding-bottom: 0px;
  text-align: center;
  color: #767474 ;
  font-family: var(--va-font-family);
  text-transform: unset;
  font-weight: 600;
  letter-spacing: -0.48px;

}
.cardtitlewhite{
  color:white !important;
}

.cardcontent {
  margin-top: 10px;
  font-size: 35px;
  color: #767474  ;
  width:160px;
  font-weight: bold;
}



#cabinets {
  margin-top: 20px;
  padding-top: 15px;
  background-color: white;
  height: 620px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #bdbebd;
  width: 680px;

}


#cabinettitle {
  font-size: 18px;
  padding: 30px;
  font-weight: bold;
}

#title {
  margin: 30px 0 0 20px;
}

h3 {
  margin: 10px 0 10px 20px;
}

.dash {
  display: flex;
  width: 600px;
  cursor: pointer;
}



.iconbtn {
  cursor: pointer;
}

#statuschart {
  width: 1618px;
  height: 360px;
  background-color: white;
  margin-top: 30px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #bdbebd;

}

#BarChart {
  margin-left: 120px;
}

#Validity {
  width: 1640px;
  height: 450px;

  margin-top: 30px;
  margin-left: 20px;
  border-radius: 10px;

}

.doughnut {
  width: 520px;
  height: 432px;

  border-radius: 10px;
  background-color: white;
  box-shadow: 3px 3px 3px #bdbebd;
}

#AEDValidity {
  margin-left: 23px;
}

#BatteryValidity {
  margin-left: 30px;
}

#PadValidity {
  margin-left: 30px;
}

.statusnot{
  background-color: white;
}
</style>