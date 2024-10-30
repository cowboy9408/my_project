<template>
  <div id="histories">
    <va-card no-padding-v style="height:100%;">
      <va-card-title style="font-size: 18px; padding: 20px; font-weight: bold">AED EVENT HISTORY</va-card-title>
      <va-scroll-container style="max-height: 556px;" :color="currentColor" vertical>
        <va-card-content v-for="data in list" :key="data" style="padding:0 0 0 0; width:350px;" >
          <va-timeline vertical :class="[ (data.contextType === 'CO'|| data.contextType === 'AR' || data.contextType === 'CL')? 'eventBackRed' : 'eventBackGreen' ]">
            <va-timeline-item active="item">
              <div class="va-timeline-separator--vertical" :class="[ (data.contextType === 'CO'|| data.contextType === 'AR' || data.contextType === 'CL')? 'eventBackRed' : 'eventBackGreen' ]"></div>
              <template #after>
                <va-card stripe>
                  <!-- <va-content class="h-card-date"> {{ getBeforeDateFormat(getDatetimeFormat(data.createDatetime,14)) }} </va-content> -->
                  <va-card-title class="h-card-title" :class="[ (data.contextType === 'CO'|| data.contextType === 'AR' || data.contextType === 'CL')? 'eventRed' : 'eventGreen' ]"> {{ getCodeTtile(data.contextType) }} </va-card-title>
                  <va-card-content class="h-card-content">  State :  {{ getCodeTtile(data.contextType) }} <span>({{ getDatetimeFormat(data.createDatetime,14) }})</span> </va-card-content>
                  <va-card-content class="h-card-content">Temperature / humidity  : &nbsp;{{ data.temperature }}°C / {{ data.humidity }}%</va-card-content>
                </va-card>
              </template>
            </va-timeline-item>
          </va-timeline>
        </va-card-content>
        <div>
          <router-link :to="{name: 'history', query: {deviceSno: this.deviceSno}}" id="historymore"><va-button color="#677798"> more </va-button></router-link>
        </div>
      </va-scroll-container>
    </va-card>

  </div>
</template>

<script>
export default {
  name: "Histories",
  data() {
    return {
      deviceSno: '',
      startDate:null,
      endDate:null,
      limitCount: 10,

      list: [],
      totalCount:'',
    };
  },
  props: {
    historydeviceSno: {
      type: String,
    },
  },
  watch: {
    historydeviceSno: function () {
        this.deviceSno=this.historydeviceSno;
        this.getData();
      }
   },

  methods: {
    getData(){
        this.$axios
          .get("/device/cabinet/"+this.deviceSno+"/events", {
            params: {
              deviceSno:this.deviceSno,
              startDate: this.startDate,
              endDate: this.endDate,
              limitCount: this.limitCount
            },
          })
          .then((res) => {
            this.list = res.data.list;
            this.totalcount = res.data.total;
          });
        }
  },
};
</script>

<style scoped>
@import "../../assets/css/history.css";
</style>

<style lang="scss">
.va-timeline-item {
  // &__before {
  //   flex: initial;
  //   width: 20%;
  // }
  &__after{
    flex: 1;
    width: 332px!important;
  }
}
  
  div.eventBackRed div.va-timeline-separator__line.va-timeline-separator__line--active {
    background-color: red!important;
  }
  div.eventBackRed div.va-timeline-separator__center.va-timeline-separator__center--active {
    background-color: red!important;
  }
  div.eventBackRed div.va-card__stripe {
    background-color: red!important;
  }
  
  div.eventBackGreen div.va-timeline-separator__line.va-timeline-separator__line--active {
    background-color: #82D83A!important;
  }
  div.eventBackGreen div.va-timeline-separator__center.va-timeline-separator__center--active {
    background-color: #82D83A!important;
  }
  div.eventBackGreen div.va-card__stripe {
    background-color: #82D83A!important;
  }

  .va-timeline .va-timeline-item--vertical.va-timeline-item--is-first .va-timeline-item__after {
    padding-top: 1rem!important;
  }

  .va-timeline .va-timeline-item--vertical.va-timeline-item--vertical.va-timeline-item--is-last .va-timeline-item__after {
    padding-bottom: 1rem!important;
  }

  // .va-timeline-item--vertical .va-timeline-item__after {
  //   padding-left: 3rem!important;
  // }
</style>

<style scoped>
  div.va-timeline-item__after {
    padding-bottom: 0px;
    padding-top: 0px;
  }

  div.va-timeline-item {
    padding-bottom: 0px;
    padding-top: 0px;
  }

  /* .va-timeline .va-timeline-item--vertical.va-timeline-item--is-first .va-timeline-item__after {
    padding-top: 1rem;
  }

  .va-timeline-item--vertical .va-timeline-item__after {
    padding-left: 5rem!important;
  } */
</style>