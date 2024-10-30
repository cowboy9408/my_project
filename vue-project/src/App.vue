<template>
  <div class="container">
    <router-view v-if="this.$route.fullPath == '/'" :key="this.$route.fullPath"></router-view>
    <div class="sidebar" v-if="this.$route.fullPath != '/'"><Side></Side></div>
    <div class="content">
      <div class="header" v-if="this.$route.fullPath != '/'"><Header></Header></div>
      <div class="main">
        <router-view v-if="this.$route.fullPath != '/'" :key="this.$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Layout/Header.vue'
import Side from '@/components/Layout/Side.vue'

export default {
  components: { Header, Side },
  mounted() {}
}
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
}
*{
  font-family:var(--va-font-family);
  color: var(--va-color);
}

.container {
  display: flex;
  height: 100vh; /* 전체 화면 높이에 맞게 조정 */
}

.sidebar {
  flex: 0 0 200px; /* 사이드바 너비 설정 */
  background-color: #f5f5f5;
}

.content {
  flex: 1; /* 남은 공간 전체 차지 */
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #e0e0e0;
  flex: 0 0 auto;
}

.main {
  flex: 1; /* 남은 공간 전체 차지 */
  overflow-y: auto;
}

</style>

<style lang="scss">

.main::-webkit-scrollbar-track {
  background: rgba(33, 122, 244, .1);
  /*스크롤바 뒷 배경 색상*/
}

.main::-webkit-scrollbar {
  width: 4px;
  background: rgba(33, 122, 244, .1);
  /* 스크롤바의 너비 */
}

.main::-webkit-scrollbar-thumb {
  height: 30%;
  /* 스크롤바의 길이 */
  background: #767C88;
  /* 스크롤바의 색상 */
  border-radius: 15px;
}

</style>