<template>
  <div class="row">
  <div class="Maplist">
    
    <va-input v-on:input="typing" class="search" id="search" v-model="cabinettitle" placeholder="Search">
      <template #prependInner>
        <va-icon name="search" />
      </template>
    </va-input>

    <div style="margin-top: 30px; height: 500px; width: 620px;  margin-left: 10px;">
      <table class="wrapper" style="table-layout: fixed">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr style="background-color: azura; height: 80px;padding-top: 50px; ">
            <th class="listth" @click="sortingData(sortingIcon[0])">Title
              <span class="material-symbols-outlined" id="title" style="width: 5px;"></span>
            </th>
            <th class="listth" @click="sortingData(sortingIcon[1])">DeviceSno
              <span class="material-symbols-outlined" id="deviceSno" style="width: 5px;"></span>
            </th>
            <th class="listth" @click="sortingData(sortingIcon[2])">Location
              <span class="material-symbols-outlined" id="primaryAddr" style="width: 5px; height: 5px; "></span>
            </th>
          </tr>
        </thead>

        <tbody class="scrollbar" style="width:620px; height:550px ; overflow:auto; display: block;">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <tr class="listed" :class="cabinetlist.deviceSno == centerdata.deviceSno ? 'selected' : ''"
            v-for="cabinetlist in list" :key="cabinetlist" @click="select(cabinetlist)">
            <td class="rowlist">{{ cabinetlist.title }}</td>
            <td class="rowlist">{{ cabinetlist.deviceSno }}</td>
            <td class="rowlist">{{ cabinetlist.primaryAddr }} , {{ cabinetlist.secondaryAddr }}</td>
          </tr>
          <div v-show="!infiniteLoadingFlag">
            <infinite-loading v-if="list.length > 0" @infinite="infiniteHandler" style="margin-left: 300px;"></infinite-loading>
          </div>
        </tbody>


      </table>

    </div>
  </div>
  <div class="noMap" v-if="centerdata.deviceSno == null"> No data was retrieved.</div>


  <GMapMap class="map" v-if="centerdata.deviceSno != null" :center="{
    lat: parseFloat(centerdata.instLatitude),
    lng: parseFloat(centerdata.instLongitude),
  }" :zoom="17" map-type-id="terrain" :options="options">
    <GMapMarker :options="options" :key="index" :animation="ani" v-for="(m, index) in list" :position="{
      lat: parseFloat(m.instLatitude),
      lng: parseFloat(m.instLongitude),
    }" :clickable="true" :draggable="false" @click="openMarker(m.deviceSno)">
      <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="m.deviceSno == info">
        <div>
          {{ m.title }}
          <br />
          {{ m.deviceSno }}
          <br />
          {{ m.primaryAddr }}
          <br />
          {{ m.secondaryAddr }}
        </div>
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</div>
</template>

<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import debounce from 'lodash.debounce'
</script>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        disableDefaultUi: false,
        gestureHandling: "greedy",
        crossOnDrag: false,

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
        ],
      },

      openedMarkerID: null,
      ani: 1,
      rowId: "",
      scrollbottom: 2,
      list: [],
      centerdata: [],
      locPlace: [],
      existingPlace: null,
      deviceSno: '',
      cabinettitle: '',

      page: 1,
      size: 8,
      title: '',
      info: '',
      sortingOptions: { sortBy: "", sortingOrder: "" },
      sortingIcon: ['title', 'deviceSno', 'primaryAddr'],
      infiniteLoadingFlag: false,
    };
  },
  watch: {
    cabinettitle: debounce(function () {
      this.list = [];
      this.title = this.cabinettitle;
      this.page = 1;
      this.getData();

    },250),
    sortingOptions: {
      deep: true,
      handler() {
        this.page = 1;
        this.list = [];
        this.getData();
      },
    },
  },


  methods: {
    infiniteHandler($state) {

      setTimeout(() => {
        if (this.totalCount == null || this.list.length < this.totalCount) {
          this.getData();
        } else {
          this.infiniteLoadingFlag = true;
        }
      }, 500)
    },

    typing(e) {
      this.infiniteLoadingFlag = false;
      this.cabinettitle = e.target.value
    },

    openMarker(no) {
      this.info = no;
    },

    getData() {
      this.$axios.get("/device/cabinet", {
          params: {
            title: this.title,
            page: this.page,
            size: this.size,
            sortBy: this.sortingOptions.sortBy,
            sortingOrder: this.sortingOptions.sortingOrder,
          },
        })
        .then((res) => {
          this.totalCount = res.data.totalCount;
          this.list = [...this.list, ...res.data.list];
          this.page = this.page + 1;
          if (this.totalCount != 0) {
            if (this.deviceSno != null) {
              for (var i = 0; i < this.list.length; i++) {
                if (this.deviceSno == this.list[i].deviceSno) {
                  this.centerdata = this.list[i];
                  return ;
                }
              }
            }
            this.centerdata = this.list[0];
          }
          else {
            this.centerdata = {};
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    select(cabinetlist) {
      this.centerdata = cabinetlist;
    },

    sortingData(index) {

      if (index != this.sortingOptions.sortBy) {
        this.sortingOptions.sortingOrder = ""
      }

      for (var i = 0; i < 3; i++) {
        document.getElementById(this.sortingIcon[i]).innerText = "";
      }

      this.sortingOptions.sortBy = index;
      if (this.sortingOptions.sortingOrder == "") {
        this.sortingOptions.sortingOrder = "asc";
        document.getElementById(index).innerText = "arrow_drop_up";
      } else if (this.sortingOptions.sortingOrder == "asc") {
        this.sortingOptions.sortingOrder = "desc";
        document.getElementById(index).innerText = "arrow_drop_down";
      } else {
        this.sortingOptions.sortingOrder = "";
        document.getElementById(index).innerText = "";
      }
    },
  },

  created() {
    this.deviceSno = this.$route.query.deviceSno;
    this.getData();
  },
});
</script>

<style lang="scss">

a[href^="http://maps.google.com/maps"] {
  display: none !important;
}

a[href^="https://maps.google.com/maps"] {
  display: none !important;
}

.gmnoprint a,
.gmnoprint span,
.gm-style-cc {
  display: none;
}

.gmnoprint div {
  background: none !important;
}

.scrollbar::-webkit-scrollbar-track {
  background: rgba(33, 122, 244, .1);
  /*스크롤바 뒷 배경 색상*/
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
  /* 스크롤바의 너비 */
}

.scrollbar::-webkit-scrollbar-thumb {
  height: 30%;
  /* 스크롤바의 길이 */
  background: #767C88;
  /* 스크롤바의 색상 */
  border-radius: 15px;
}
</style>

<style scoped>
.map {
  width: 960px;
  height: 880px;
  margin-left: 20px;
  margin-top: 20px;
  border: 5px solid;
  border-color: #e6e6e6; 
}

.noMap {
  width: 960px;
  height: 880px;
  background-color: lightgray;
  text-align: center;
  line-height: 880px;
  margin-left: 15px;
  margin-top: 70px;
  font-size: 30px;
}

.search {
  width: 500px;
  margin-top: 40px;
  margin-left: 20px;
}

.td:hover {
  background-color: #e9e9e9;
  cursor: pointer;
}

.listed:hover {
  background-color: #E1F1FF;
  cursor: pointer;
}

.listed {
  height: 70px;
}

.listth {
  font-size: 20px;
  text-align: center;
  line-height: 80px;
  margin-right: 2px;
  background-color: #00C9B9;
  color: white;
}

.listth:hover {
  cursor: pointer;
}

.list:hover {
  background-color: #E1F1FF;
}

.rowlist {
  text-align: center;
  height: 50px;
  vertical-align: middle;
  font-family: " sans-serif";
}

.selected {
  background-color: #E1F1FF !important;
}

table {
  width: 100%;
}

col:nth-child(1) {
  width: 15%;
}

col:nth-child(2) {
  width: 35%;
}

col:nth-child(3) {
  width: 50%;
}

.Maplist {
  border-radius: 10px;
  box-shadow: 3px 3px 5px #d3d3d3;
  margin-top: 20px;
  margin-left: 20px;
  width: 640px;
  height: 880px;
  background-color: white;
}
</style>