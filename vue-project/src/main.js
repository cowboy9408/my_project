// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from 'vuestic-ui'
import router from '@/router/router'
import 'vuestic-ui/css'
import axios from '@/axios/axios'
import mixin from '@/mixin/global'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; 
import './assets/sass/app.scss'

const app = createApp(App) 
  app.use(createVuestic())
  app.use(router)
  app.mixin(mixin)
  app.component("infinite-loading", InfiniteLoading);
  app.config.globalProperties.$axios = axios;
  app.use(VueSweetalert2)
  // app.use(VueGoogleMaps, { load: { key: 'AIzaSyAHK-6PifTaS14KXwbshSgCh4iAm11S2fY', language:'en' } })
  app.use(VueGoogleMaps, { load: { key: 'AIzaSyAHUoNRjQr4CLQWrNvQQseqrXLNzj6AxaM', language:'en' } })

  app.mount('#app');