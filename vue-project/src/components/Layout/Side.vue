<template>
  <div class="side">
    <va-sidebar color="#ffffff">
      <div style="margin-bottom:20px;">
        <va-navbar-item class="logo">
        <router-link to="/mydashboard"><img style="margin-left: 30px; height: 55px; margin-top: 15px;  float: left;"
            src="../../assets/images/xafe_logo.png" /></router-link></va-navbar-item>
        </div>
      <va-sidebar-item>
        <router-link class="routerLinkDecoration" to="/mydashboard">
        <va-sidebar-item-content>
          <img class="cabinet" src="../../assets/images/dashboard.png" />
          <va-sidebar-item-title class="sidetitle">MyDashboard</va-sidebar-item-title>
        </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

      <va-sidebar-item>
        <router-link class="routerLinkDecoration" to="/cabinet">
        <va-sidebar-item-content>
          <img class="cabinet" src="../../assets/images/cabinet_icon.png" />
          <va-sidebar-item-title class="sidetitle">Cabinet</va-sidebar-item-title>
        </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

      

      <va-sidebar-item>
        <router-link class="routerLinkDecoration" to="/map">
        <va-sidebar-item-content>
          <img class="cabinet" src="../../assets/images/map.png" />
          <va-sidebar-item-title class="sidetitle">Map</va-sidebar-item-title>
        </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

    </va-sidebar>    
    <va-modal 
    v-model="showModal" 
    :message="'This page is under development.'" 
    title="Notification"
    hide-default-actions>
      <template #footer>
      <va-button @click="showModal=false">
        OK
      </va-button>
    </template>
    </va-modal>
  </div>
</template>
<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";



export default {
  data() {
    return {
    }
  }
};
</script>


<style scoped>
.logo {
  margin-left: 20px;
  font-weight: 600;
  font-size: 2rem;
}

.side {
  float: left;
  height: -webkit-fill-available;
  
  
}

.app-layout[data-v-e6c9286a] {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard {
  background-color: #f9f6f6;
}

.cabinet {
  width: 25px;
}

.sidetitle {
  margin-left: 12px;
  font-size: 18px;
}

.dropbox {
  color: transparent;
}

.modify {
  width: 100px;
  margin-right: 100px;
}

.routerLinkDecoration{text-decoration:none; color: black; cursor: pointer;}
</style>