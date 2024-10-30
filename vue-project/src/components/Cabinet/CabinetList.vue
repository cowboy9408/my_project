<template>
    <div class="cabinet">

        <!-- top component -->
        <div class="top">
            <div class="cardBox">
                <p class="cardTitle">Total</p>
                <p class="cardContent">{{ status.total }}</p>
            </div>
            <div class="cardBox">
                <p class="cardTitle">Normal</p>
                <p class="cardContent">{{ status.normal }}</p>
            </div>
            <div class="cardBox">
                <p class="cardTitle">Cabinet Check</p>
                <p class="cardContent">{{ status.device }}</p>
            </div>
            <div class="cardBox">
                <p class="cardTitle">Opened</p>
                <p class="cardContent">{{ status.opened }}</p>
            </div>
            <div class="cardBox">
                <p class="cardTitle">AED Absent</p>
                <p class="cardContent">{{ status.aed }}</p>
            </div>
            <div class="cardBox">
                <p class="cardTitle">Temp Abnormal</p>
                <p class="cardContent">{{ status.temperature }}</p>
            </div>
            <div class="cardBox">
                <p class="cardTitle">Network Check</p>
                <p class="cardContent">{{ status.network }}</p>
            </div>
        </div>

        <!-- mid component -->
        <div class="middle">
            <div class="dataSearchBox">
                <div class="midItem">
                    <div class="midTitle" >Cabinet S/N</div>
                    <input class="midContent" v-model="serialNo" placeholder="Enter" bordered="true" />
                </div>
                <div class="midItem">
                    <div class="midTitle">Device Status</div>
                    <select class="midContent" v-model="condition">
                        <option value="">All</option>
                        <option value="NORMAL">Normal</option>
                        <option value="DEVICE">Cabinet Check</option>
                        <option value="OPENED">Opened</option>
                        <option value="AED">AED Absent</option>
                        <option value="TEMPERATURE">Temp Abnormal</option>
                        <option value="NETWORK">Network Check</option>
                    </select>
                </div>
                <div class="midItem">
                    <div class="midTitle">Inst. Time</div>
                    <Datepicker class="CabinetDatePicker" v-model="startDate" placeholder="yy-mm-dd"
                        style="margin-right: 10px" />
                    <span class="tilde">~</span>
                    <Datepicker class="CabinetDatePicker" v-model="endDate" placeholder="yy-mm-dd"
                        style="margin-left: 10px" />
                </div>
                <div class="midItem">
                    <div class="midTitle">Address</div>
                    <input class="midContent" v-model="address" placeholder="Enter" />
                </div>
                <div class="midItem">
                    <div class="midTitle">Title</div>
                    <input class="midContent" v-model="title" placeholder="Enter" />
                </div>
                <button class="midBtn" preset="secondary" border-color="primary" text-color="#000000"
                    @click="dataReset()">Reset</button>
                <button class="midBtn" preset="secondary" border-color="primary" text-color="#000000"
                    @click="dataSearch()">Search</button>
            </div>
        </div>

        <!-- bottom component -->
        <div class="bottom">
            <table class="myDataTable">
                <colgroup>
                    <col width="155px" />
                    <col width="162px" />
                    <col width="130px" />
                    <col width="745.2px" />
                    <col width="214px" />
                    <col width="190.4px" />
                </colgroup>
                <thead>
                    <tr class="colTitle">
                        <th class="colData sortColData" @click="sortingData(sortingIcon[0])">Cabinet S/N
                            <span class="material-symbols-outlined" id="serialNo" style="width: 5px;"></span>
                        </th>
                        <th class="colData">Device Status</th>
                        <th class="colData sortColData" @click="sortingData(sortingIcon[1])">Inst. Time
                            <span class="material-symbols-outlined" id="createDatetime" style="width: 5px;"></span>
                        </th>
                        <th class="colData sortColData" @click="sortingData(sortingIcon[2])">Address
                            <span class="material-symbols-outlined" id="primaryAddr" style="width: 5px;"></span>
                        </th>
                        <th class="colData sortColData" @click="sortingData(sortingIcon[3])">Title
                            <span class="material-symbols-outlined" id="title" style="width: 5px;"></span>
                        </th>
                        <th class="colData">Operation</th>
                    </tr>
                </thead>
                <tbody class="scrollbar">
                    <tr class="rowLine" v-for="data in list" :key="data">
                        <div @click="cabinetDetail(data.deviceSno)">
                            <td class="rowData" style="width: 156px">{{ data.serialNo }}</td>
                            <td class="rowData" style="width: 164px">{{ data.statusList[0] }}</td>
                            <td class="rowData" style="width: 132px">{{ getDatetimeFormat(data.createDatetime, 8) }}</td>
                            <td class="rowData" style="width: 758px">{{ data.primaryAddr }} , {{ data.secondaryAddr }}</td>
                            <td class="rowData" style="width: 217px">{{ data.title }}</td>
                        </div>
                        <td class="rowData" style="width: 190.4px">
                            <button class="OperationBtn" v-if="data.serialNo == 'X4202302A00001'"
                                @click="showModal = true ; open(data.deviceSno)" style="margin-right: 15px">Open
                            </button>
                            <button class="disabled" v-else style="margin-right: 15px">Open
                            </button>
                            <router-link :to="{ name: 'map', query: { deviceSno: data.deviceSno } }">
                                <button class="OperationBtn">Map</button>
                            </router-link>
                        </td>
                    </tr>
                    <div v-show="!infiniteLoadingFlag">
                        <infinite-loading @infinite="appendRecordsAsync" v-if="list.length > 0"></infinite-loading>
                    </div>
                </tbody>
            </table>
            <va-modal v-model="showModal" :message="'Opend Success'" title="Notification" hide-default-actions>
                <template #footer>
                    <va-button @click="showModal = false"> OK </va-button>
                </template>
            </va-modal>
        </div>
        <p v-show="false">
            {{ updateWebSocketSession }}
            {{ statusWebSocketSession }}
        </p>

    </div>
</template>

<script setup>
import Datepicker from "vue3-datepicker";
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
</script>
<script>
const api = "//hn.algolia.com/api/v1/search_by_date?tags=story";
export default {
    data() {
        return {
            serialNo: "",
            condition: "",
            startDate: "",
            endDate: "",
            address: "",
            title: "",
            deviceno: "",

            page: 1,
            size: 10,
            sortingOptions: { sortBy: "", sortingOrder: "" },
            sortingIcon: ['serialNo', 'createDatetime', 'primaryAddr', 'title'],

            list: [],
            status: [],
            totalCount: null,

            paramStartDate: "",
            paramEndDate: "",

            showModal: false,
            timerForUpdate: 1,
            timerForStatus: 1,
            stompClient: null,
            isSockConnected: false,
            isReConnection: false, // 소켓연결이 끊어진 후 재연결시 데이터를 새로 조회하도록(끊어진 동안 발생한 데이터 메시지를 위함) 하기위한 플래그
            infiniteLoadingFlag: false, // 마지막페이지 infinite Loading Stop 플래그
            
            message: "",
        };
    },
    methods: {
        getData() {
            this.$axios.get("/device/cabinet", {
                params: {
                    serialNo: this.serialNo,
                    condition: this.condition,
                    startDate: this.paramStartDate,
                    endDate: this.paramEndDate,
                    address: this.address,
                    title: this.title,
                    sortBy: this.sortingOptions.sortBy,
                    sortingOrder: this.sortingOptions.sortingOrder,
                    page: this.page,
                    size: this.size,
                },
            }).then((res) => {
                if (res.data.result.code == "0000") {
                    for (var i = 0; i < res.data.list.length; i++) {
                        this.list.push(res.data.list[i]);
                    }
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        //캐비넷 상태 조회
        getStatus() {
            this.$axios.get("/device/cabinet/status", {})
                .then((res) => {
                    this.status = res.data.status; //캐비넷 상태 데이터 조회
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        appendRecordsAsync($state) {
            setTimeout(() => {
                if (this.totalCount == null || this.list.length < this.totalCount) {
                    this.page++;
                    this.getData();
                } else {
                    this.infiniteLoadingFlag = true;
                }
            }, 500);
        },

        dataReset() {
            this.serialNo = "";
            this.condition = "";
            this.startDate = "";
            this.endDate = "";
            this.address = "";
            this.title = "";
        },

        dataSearch() {
            this.paramStartDate = this.getDateFormat(this.startDate);
            this.paramEndDate = this.getDateFormat(this.endDate);
            this.page = 1;
            this.infiniteLoadingFlag = false;
            this.getData();
            this.list = [];
        },

        sortingData(index) {
            if (index != this.sortingOptions.sortBy) {

                this.sortingOptions.sortingOrder = ""
            }
            for (var i = 0; i < 4; i++) {
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

        cabinetOpen() {
            // 캐비넷 Open 버튼 누를 시 작동 함수
        },

        open(no) {
            this.deviceno = no;
            this.$axios.post('/device/cabinet/open/' + this.deviceno
            )
                .then(res => { })
                .catch(function (error) {
                    console.log(error);
                });
        },

        cabinetDetail(no) {
            this.cabinetdeviceSno = no;
            this.$router.push({ name: 'more', query: { deviceSno: this.cabinetdeviceSno } });
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
                        //데이터 조회
                        this.infiniteLoadingFlag = false;
                        this.getStatus();
                        this.isReConnection = false;
                    }

                    // 서버의 메시지 전송 endpoint를 구독합니다.
                    // 이런형태를 pub sub 구조라고 합니다.
                    this.stompClient.subscribe("/send", res => {
                        // 수신 메시지
                        console.log('Message received by subscription.', res.body);
                        //데이터 조회
                        this.infiniteLoadingFlag = false;
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
    watch: {
        sortingOptions: {
            deep: true,
            handler() {
                this.page = 1;
                this.list = [];
                this.getData();
            },
        },
    },

    created() {

        //리스트 목록 조회
        this.getData();

        //리스트 상태 조회
        this.getStatus();

        //소켓 연결    
        this.connect();
    },
};
</script>

<style lang="scss">
.CabinetDataTable .va-data-table {
    --va-data-table-hover-color: #cccccc;
}

.CabinetDataTable .va-data-table__table-th-wrapper {
    text-align: center;
    font-size: 17px;
}

.CabinetDataTable {
    --va-data-table-thead-background: linear-gradient(0deg, #ffcdc3, #f9ad9e);
    --va-data-table-max-height: 495px;
    --va-data-table-thead-color: var(--va-text-inverted);
}

.CabinetDataTable .va-data-table__table-tr {
    height: 44px;
    width: 30px;
    --va-data-table-align: center;
}

.CabinetDataTable .va-data-table .va-data-table__table {
    white-space: normal;
}

// 데이터 피커 정렬
.v3dp__datepicker {
    display: inline-block;
}

// 데이터 피커를 우 -> 좌로 펼침
.v3dp__popout {
    right: 1px;
}

.CabinetDatePicker {
    border: 1px solid black;
    width: 140px;
    height: 40px;
    padding-left: 30px;
    border-radius: 5px;
}

.scrollbar::-webkit-scrollbar {
    width: 4px;
    /* 스크롤바의 너비 */
}

.scrollbar::-webkit-scrollbar-thumb {
    height: 30%;
    /* 스크롤바의 길이 */
    background: #767c88;
    /* 스크롤바의 색상 */
    border-radius: 15px;
}

.scrollbar::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
    /*스크롤바 뒷 배경 색상*/
}
</style>

<style scoped>
.cabinet {
    width: 1660px;
    height: 890px;
    

    -webkit-touch-callout: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.top {
    width: auto;
    width: 1620px;
    height: 130px;
    margin: 10px 0 15px 13px;
    background-color: #ffffff;
}

.cardBox {
    width: 215px;
    height: 100px;
    background: #5BC0F8;

    color: white;
    font-weight: bold;
    display: inline-block;
    margin-top: 12px;
    margin-left: 13px;
    border-radius: 10px;
    box-shadow: 3px 3px 5px #d3d3d3;
}

.cardTitle {
    margin: 10px 0 0 10px;
    font-size: 20px;
    color:white;
}

.cardContent {
    float: right;
    margin: 0 20px 20px 0;
    font-size: 50px;
    color:white;

}

.middle {
    width: auto;
    height: 220px;
}

.dataSearchBox {
    width: 1620px;
    height: 200px;
    margin-left: 13px;
    padding-top: 20px;
    background: white;
}

.midItem {
    width: 510px;
    height: 60px;
    margin: 0 0 0 10px;
    display: inline-block;
}



.midTitle {
    width: 175px;
    height: 35px;
    margin-right: 10px;
    background: #eee;
    display: inline-block;
    font-weight: bold;
    line-height: 40px;
    padding-left: 10px;
}

.midContent {
    width: 300px;
    height: 40px;
    display: inline-block;
    background: white;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid black;
}

.tilde {
    font-size: 30px;
}

.midBtn {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background: #677798;
    border: none;
    color: white;
    float: right;
    margin: 60px 20px 0 0;
}

.midBtn:hover {
    background: #477798;
    cursor: pointer;
}

.bottom {
    width: 1620px;
    margin-left: 13px;
    height: 495px;
}

.myDataTable {
    width: 1620px;
    height: 50px;
    table-layout: fixed;
    text-align: center;
    border-collapse: collapse;
}

.scrollbar {
    width: 1620px;
    height: 460px;
    overflow: auto;
    display: block;
}

.rowLine {
    width: 1620px;
    height: 47px;
    -webkit-touch-callout: text;
    user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    -webkit-user-select: text;
    cursor: pointer;
}

.colTitle {
    color: white;
    font-size: 20px;
}

.colData {
    background: #0081C9;
    line-height: 50px;
    margin-right: 2px;
    border-right: 1px solid white;
    color:white;
}

.rowLine:hover {
    background-color: #E1F1FF;
}

.rowData {
    padding-top: 10px;
}

.OperationBtn {
    width: 60px;
    height: 25px;
    background: #FFC93C;
    border-radius: 5px;
    z-index: 10;
    border: none;
    color: white;
}

.OperationBtn:hover {
    background: #fed56b;
    cursor: pointer;
}

.disabled {
    width: 60px;
    height: 25px;
    border: none;

    z-index: 10;
    border-radius: 5px;
    color: white;
    opacity: 0.4 !important;

    background-color: grey !important;
}

.sortColData:hover {
    cursor: pointer;
}
</style>