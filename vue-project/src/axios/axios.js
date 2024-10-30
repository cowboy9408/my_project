import axios from 'axios'

axios.defaults.baseURL = '/cabinetserver'

function getTimeZoneOffset(){
    const tzOffset = new Date().toTimeString().match(/([\+-]\d{4})/)[0];
    return [tzOffset.slice(0, 3), ':', tzOffset.slice(3)].join('');
}

// axios 요청 인터셉터
axios.interceptors.request.use(
    function(config) {
      // axios 함수를 통해 API를 찌르는 경우와 아닌 경우를 서버에서 구분하기 위해 header에 'SystemName' 필드를 추가
      if(config.method == 'get') {        
        config.headers = { 'Accept': 'application/json, text/plain, */*', 'ZoneOffset': getTimeZoneOffset()}
      }
      else if(config.method == 'post') {        
        config.headers = { 'Accept': 'application/json, text/plain, */*', 'ZoneOffset': getTimeZoneOffset(), 'Content-Type': 'application/json;charset=utf-8'}
      }
      return config;
    },
    function(error) {      
      return Promise.reject(error);
    }
);


export default axios;