<template>

  <va-navbar color="backgroundPrimary" 
    style="background:#f6f6f6;width: 100px; ">
    




    <template #right>

      <va-navbar-item class="mx-3"><img style="width: 25px; height: 25px;" src="../../assets/images/notifications.png"></va-navbar-item>
      <va-navbar-item><span class="fi fi-kr" style="margin-left:10px"></span></va-navbar-item>
      <va-navbar-item>
        <va-button-dropdown text-color="#767474" class="dropbutton" preset="secondary" style="color:black" label="admin">
          <router-link to="/" style="color:black;">logout</router-link>
        </va-button-dropdown>

      </va-navbar-item>
    </template>
  </va-navbar>






</template>
<script>



import "/node_modules/flag-icons/css/flag-icons.min.css";



export default {
  data() {
    return {
    }
  }
}

</script>


<style scoped>
.logo {
  margin-left: 20px;
  font-weight: 600;
  font-size: 2rem;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48,

}

.side {
  float: left;

}

.app-layout[data-v-e6c9286a] {
  height: 100vh;
  display: flex;
  flex-direction: column;
}


</style>
<style lang="scss">
.dropbutton .va-button--normal .va-button__content {
 color : #767474
}
</style>