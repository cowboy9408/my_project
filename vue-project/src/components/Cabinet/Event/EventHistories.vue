<template>
    <div id="history">

      <!-- 왼쪽 카드 컴포넌트 -->
      <div class="row" id="leftComponent">
        <div class="md6 lg4">
          <va-card class="fourCard"  stripe stripe-color="danger">
            <va-card-content><span id="cardTitle">{{ cabinetInfo.title }}</span></va-card-content>
            <va-card-content>deviceSno : {{ cabinetInfo.deviceSno }}</va-card-content>
            <va-card-content>Model : {{ cabinetInfo.model }}</va-card-content>
            <va-card-content>Group : {{ group }}</va-card-content>
            <va-card-content>Location : {{ cabinetInfo.primaryAddr }}</va-card-content>
            <va-card-content>Last Event : {{ getDatetimeFormat(cabinetInfo.lastStatusUpdateDatetime,14) }}</va-card-content>
          </va-card>
        </div>
  
        <!-- 데이터피커 -->
        <div class="flex row">
          <div class="flex">
            <va-date-picker
              class="datePicker"
              v-model="range"
              color="warning"
              weekends-color="info"
              highlight-weekend
              show-other-months
            />
          </div>
        </div>
      </div> 

        <!-- 오른쪽 내역 컴포넌트 -->
      <div class="flex xs8" id="histories2">
        <va-card no-padding-v>
          <va-card-title class="darkseagreen">AED Event History</va-card-title>
          <va-scroll-container class="scrollContainer" :color="currentColor" vertical>
          <va-card-content v-for="data in list" :key="data" style="padding:0 0 0 0;" >
            <va-timeline vertical :class="[ (data.contextType === 'CO'|| data.contextType === 'AR' || data.contextType === 'CL')? 'eventBackRed' : 'eventBackGreen' ]">
              <va-timeline-item active="item">
                <div class="va-timeline-separator--vertical" :class="[ (data.contextType === 'CO'|| data.contextType === 'AR' || data.contextType === 'CL')? 'eventBackRed' : 'eventBackGreen' ]"></div>
                <template #before>
                  <va-content class="h-card-date"> {{ getBeforeDateFormat(getDatetimeFormat(data.createDatetime,14)) }} </va-content>
                </template>
                <template #after>
                    <va-card stripe>
                    <va-card-title class="h-card-title" :class="[ (data.contextType === 'CO'|| data.contextType === 'AR' || data.contextType === 'CL')? 'eventRed' : 'eventGreen' ]"> {{ getCodeTtile(data.contextType) }} </va-card-title>
                    <va-card-content class="h-card-content">  State :  {{ getCodeTtile(data.contextType) }} <span>({{ getDatetimeFormat(data.createDatetime,14) }})</span> </va-card-content>
                    <va-card-content class="h-card-content">Temperature / humidity  :  {{ data.temperature }}°C / {{ data.humidity }}%</va-card-content>
                    </va-card>
                </template>
              </va-timeline-item>
            </va-timeline>
          </va-card-content>
          </va-scroll-container>
        </va-card>
      </div>

    </div>
  </template>
    
  <script>
  
const datePlusDay = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const oneWeekAgo = datePlusDay(new Date(), -6)

  export default {
    data() {
      return {
        deviceSno: '',
        group:'N/A',
        startDate: '',
        endDate: '',
        limitCount: '',
        list : [],
        cabinetInfo:'',

        totalcount: '',
        range: { start: oneWeekAgo, end: new Date() },        
        
      };
    },
    created() {
      this.deviceSno = this.$route.query.deviceSno
      this.getDatePickerData();
      this.getData();
    },
    watch: {
      range: function () {          
        this.getDatePickerData();
        this.getData();
      },
      deviceSno: function () {
        this.getCard()
      }
    },
    methods: {
      getData(){
        this.$axios
          .get("/device/cabinet/"+this.deviceSno+"/events", {
            params: {
              deviceSno: this.deviceSno,
              startDate: this.startDate,
              endDate: this.endDate,
              limitCount: this.limitCount
            },
          })
          .then((res) => {
            this.list = res.data.list;
            this.totalcount = res.data.total;
          });
        },
        getCard(){
          this.$axios
          .get("/device/cabinet/"+this.deviceSno,{
          })
          .then((res) => {
            this.cabinetInfo = res.data.data;
          }); 
        },
        getDatePickerData(){          
           // 날짜를 선택하지 않았을 경우
            if (this.range.start == null && this.range.end == null){
              this.startDate=null
              this.endDate=null
            }

            // 한 날짜를 선택한 경우
            if ((this.range.start == null && this.range.end != null) || (this.range.end == null && this.range.start != null)  ){
              // 날짜를 선택하지 않은 상태에서 한 날짜를 선택한 경우
              if ((this.range.start == null && this.range.end != null)){
                this.range.start=this.range.end
                this.range.end=null
              }
              this.startDate = this.dates(this.range.start)
              this.endDate = this.dates(this.range.start)
           } 
            // 두 날짜를 선택한 경우
            else if (this.range.start != null && this.range.end != null){
              this.startDate = this.dates(this.range.start)
              this.endDate = this.dates(this.range.end)
            }
        }
      }
    }
  </script>
  <style lang="scss">
  .va-timeline-item {
    &__before{
      flex: initial!important;
      width: 200px!important;
    }
    &__after{
      flex: initial!important;
      width: 900px!important;
    }
  }

  .eventRed {
    color : rgb(255,0,0);    
  }

  .eventGreen {
    color : #82D83A;  
  }
  
  .eventBackRed .va-timeline-separator__line.va-timeline-separator__line--active {
    background-color: red!important;
  }
  .eventBackRed .va-timeline-separator__center.va-timeline-separator__center--active {
    background-color: red!important;
  }
  .eventBackRed .va-card__stripe {
    background-color: red!important;
  }
  
  .eventBackGreen .va-timeline-separator__line.va-timeline-separator__line--active {
    background-color: #82D83A!important;
  }
  .eventBackGreen .va-timeline-separator__center.va-timeline-separator__center--active {
    background-color: #82D83A!important;
  }
  .eventBackGreen .va-card__stripe {
    background-color: #82D83A!important;
  }
  </style>
    
  <style scoped>
    @import "../../../assets/css/EventHistories.css";
  </style>
  