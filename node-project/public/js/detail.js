function initMap() {
    console.log("Initializing map..."); // 맵 초기화를 시작함을 알리는 로그 출력
    var productLocation = {
        lat: parseFloat(document.getElementById('map').dataset.latitude),  // 지도 요소에서 위도를 가져와 숫자로 변환
        lng: parseFloat(document.getElementById('map').dataset.longitude)  // 지도 요소에서 경도를 가져와 숫자로 변환
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,  // 지도의 확대 수준 설정
        center: productLocation  // 지도의 중심을 제품 위치로 설정
    });
    var marker = new google.maps.Marker({
        position: productLocation,  // 마커의 위치를 제품 위치로 설정
        map: map,  // 마커를 표시할 지도 설정
        animation: google.maps.Animation.BOUNCE // 마커에 바운스 애니메이션 추가
    });
}

// DOMContentLoaded 이벤트가 발생하면 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
    function updateSensorData() {
        fetch(`/products/api/detail/${productId}`)  // 제품 세부 정보를 가져오기 위해 API 호출
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Server error: ${response.status} ${text}`);  // 서버 오류 처리
                    });
                }
                return response.json();  // 응답을 JSON으로 파싱
            })
            .then(data => {
                // 데이터를 표시할 HTML 요소들이 존재하는지 확인하고 업데이트
                const pm2Element = document.getElementById('pm2');
                const co2Element = document.getElementById('co2');
                const tempElement = document.getElementById('temp');
                const humidElement = document.getElementById('humid');
                const vocElement = document.getElementById('voc');

                if (pm2Element) pm2Element.innerText = data.pm2 + ' µg/m³';  // 미세먼지 수치 업데이트
                if (co2Element) co2Element.innerText = data.co2 + ' ppm';  // 이산화탄소 수치 업데이트
                if (tempElement) tempElement.innerText = data.temp + ' °C';  // 온도 수치 업데이트
                if (humidElement) humidElement.innerText = data.humid + ' %';  // 습도 수치 업데이트
                if (vocElement) vocElement.innerText = data.voc + ' ppb';  // 휘발성 유기 화합물 수치 업데이트
            })
            .catch(error => console.error("Error updating sensor data:", error));  // 센서 데이터 업데이트 중 오류 처리
    }

    updateSensorData();  // 페이지 로드 시 처음으로 센서 데이터 업데이트 실행
    setInterval(updateSensorData, 5000);  // 5초마다 센서 데이터를 갱신
});

// 페이지가 로드될 때 맵 초기화 함수 호출
window.onload = initMap;

function logout() {
    // 서버에 로그아웃 요청
    fetch('/logout', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                // 로그아웃 성공 시 페이지의 캐시를 무효화하기 위해 메타 태그 추가
                document.addEventListener('DOMContentLoaded', () => {
                    var meta = document.createElement('meta');
                    meta.httpEquiv = "Cache-Control";
                    meta.content = "no-cache, no-store, must-revalidate";
                    document.getElementsByTagName('head')[0].appendChild(meta);

                    var pragma = document.createElement('meta');
                    pragma.httpEquiv = "Pragma";
                    pragma.content = "no-cache";
                    document.getElementsByTagName('head')[0].appendChild(pragma);

                    var expires = document.createElement('meta');
                    expires.httpEquiv = "Expires";
                    expires.content = "0";
                    document.getElementsByTagName('head')[0].appendChild(expires);
                });

                // 캐시를 무효화한 후 로그인 페이지로 리다이렉트
                window.location.href = '/login';
                window.history.pushState(null, null, '/login');
                window.addEventListener('popstate', function (event) {
                    window.location.href = '/login';  // 브라우저의 뒤로 가기 버튼 처리
                });
            } else {
                console.error("Logout failed");  // 로그아웃 실패 시 오류 메시지 출력
            }
        })
        .catch(error => console.error("Error during logout:", error));  // 로그아웃 요청 중 오류 처리
}

document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로딩 후 세션 체크
    fetch('/check-session', { method: 'GET', cache: 'no-store' })
        .then(response => {
            if (response.status === 401) {
                window.location.replace('/login');  // 세션이 유효하지 않으면 로그인 페이지로 리다이렉트
            }
        })
        .catch(error => {
            console.error('Session check failed, redirecting to login', error);
            window.location.replace('/login');  // 세션 체크 중 오류 발생 시 로그인 페이지로 리다이렉트
        });
});

// 로그아웃 버튼 클릭 시 로그아웃 함수 호출
document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.replace('/logout');  // 로그아웃 페이지로 리다이렉트
});