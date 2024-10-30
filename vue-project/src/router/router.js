import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/components/Login/Login.vue"
import History from "@/components/Cabinet/Event/EventHistories.vue"
import MyDashboard from "@/components/Dashboard/MyDashboard.vue"
import More from "@/components/Cabinet/CabinetDetails.vue"
import Map from  "@/components/Map/CabinetListMap.vue"
import Cabinet from  "@/components/Cabinet/CabinetList.vue"
import AddCabinet from "@/components/Cabinet/AddCabinet.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes : [
        { path: "/", name: "login", component: Login},
        { path: "/more", name: "more", component: More},
        { path: "/mydashboard", name: "mydashboard", component: MyDashboard},
        { path: "/history", name: "history", component: History},
        { path: "/map", name: "map", component: Map},
        { path: "/cabinet", name: "cabinet", component: Cabinet},
        { path: "/addcabinet", name:"addcabinet", component:AddCabinet} //어디 눌렀을때 연결할지 정할 것.
    ]
})

export default router