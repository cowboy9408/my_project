function initMap() {
    // Google 지도 초기화
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.4027313, lng: 126.9279179 }, // 지도의 중심을 지정된 좌표로 설정
        zoom: 11 // 지도의 초기 확대 수준을 11로 설정
    });

    // 지도에 표시될 팝업 요소들을 선택
    var popup1 = document.getElementById('popup1');
    var popup2 = document.getElementById('popup2');
    var popup3 = document.getElementById('popup3');
    var popup4 = document.getElementById('popup4');
    var popup5 = document.getElementById('popup5');
    var popup6 = document.getElementById('popup6');

    // 팝업 요소들을 화면에 표시
    popup1.style.display = 'block';
    popup2.style.display = 'block';
    popup3.style.display = 'block';
    popup4.style.display = 'block';
    popup5.style.display = 'block';
    popup6.style.display = 'block';

    // 중복 마커 방지를 위한 집합과 마커 리스트 초기화
    const addedMarkers = new Set();
    const markers = [];

    // 현재 열려 있는 InfoWindow를 추적하기 위한 변수
    let currentInfoWindow = null;

    // 제품 데이터를 서버에서 가져오는 함수
    function fetchProductData() {
        console.log('Fetching product data...');
        fetch('/products/data', { cache: 'no-store' }) // 서버에서 데이터 요청, 캐시 사용 안함
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            updateMarkers(data); // 마커 갱신
            updatePopup(); // 팝업 및 현황판 업데이트
        })
        .catch(err => console.error('Error fetching product data:', err)); // 에러 처리
    }

    fetchProductData(); // 초기 데이터 가져오기

    // 주기적으로 제품 데이터를 업데이트 (5초마다)
    setInterval(fetchProductData, 5000);

    // 마커를 갱신하는 함수
    function updateMarkers(data) {
        data.forEach(product => {
            // 마커 키 생성 (중복 방지용)
            const markerKey = `${product.latitude}-${product.longitude}-${product.name}`;
            let markerInfo = markers.find(m => m.markerKey === markerKey);

            if (!markerInfo) {
                // 새로운 마커 생성
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(product.latitude), lng: parseFloat(product.longitude) },
                    map: map,
                    title: product.name,
                    animation: google.maps.Animation.BOUNCE // 마커에 바운스 애니메이션 추가
                });

                const infoWindow = new google.maps.InfoWindow();
                marker.addListener('click', function() {
                    if (currentInfoWindow) {
                        currentInfoWindow.close(); // 현재 열린 정보 창 닫기
                    }
                    infoWindow.open(map, marker); // 새로운 정보 창 열기
                    currentInfoWindow = infoWindow; // 현재 정보 창 업데이트
                    infoWindow.setContent(generateInfoContent(product)); // 정보 창 내용 설정
                });

                // 마커와 정보 창, 제품 정보를 리스트에 추가
                markers.push({ marker, markerKey, infoWindow, product });
            } else {
                // 기존 마커 정보 업데이트
                markerInfo.product = product;
                if (markerInfo.infoWindow.getMap()) {
                    markerInfo.infoWindow.setContent(generateInfoContent(product));
                }
            }
        });
    }

    // 팝업 및 현황판을 업데이트하는 함수
    function updatePopup() {
        const bounds = map.getBounds(); // 지도의 현재 경계를 가져옴
        let pm2Sum = 0;
        let co2Sum = 0;
        let vocSum = 0;
        let tempSum = 0;
        let humiditySum = 0;
        let locationCount = 0;

        // 지도 내 마커 정보를 기반으로 각종 평균 값을 계산
        markers.forEach(({ marker, product, infoWindow }) => {
            if (bounds.contains(marker.getPosition())) {
                pm2Sum += parseFloat(product.pm2);
                co2Sum += parseFloat(product.co2);
                vocSum += parseFloat(product.voc);
                tempSum += parseFloat(product.temp);
                humiditySum += parseFloat(product.humid);
                locationCount++;

                // 팝업이 열려 있으면 팝업 내용을 실시간으로 갱신
                if (infoWindow.getMap()) {
                    infoWindow.setContent(generateInfoContent(product));
                }
            }
        });

        // 팝업에 평균 값 또는 기본 메시지 표시
        if (locationCount > 0) {
            var pm2Average = (pm2Sum / locationCount).toFixed(1);
            var co2Average = (co2Sum / locationCount).toFixed(1);
            var vocAverage = (vocSum / locationCount).toFixed(1);
            var tempAverage = (tempSum / locationCount).toFixed(1);
            var humidityAverage = (humiditySum / locationCount).toFixed(1);

            requestAnimationFrame(() => {
                popup1.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-laptop-code icon" style="color:black;"></i>
                                    <p>디바이스: ${locationCount}</p></div>`;
                popup2.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-wind icon" style="color:blue;"></i>
                                    <p>PM2: ${pm2Average}</p></div>`;
                popup3.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-cloud icon" style="color:green;"></i>
                                    <p>CO2: ${co2Average}</p></div>`;
                popup4.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-smog icon" style="color:gray;"></i>
                                    <p>VOC: ${vocAverage}</p></div>`;
                popup5.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-thermometer-half icon" style="color:red;"></i>
                                    <p>온도: ${tempAverage}</p></div>`;
                popup6.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-tint icon" style="color:blue;"></i>
                                    <p>습도: ${humidityAverage}</p></div>`;
            });
        } else {
            // 지도에 표시할 제품이 없는 경우 기본 메시지 표시
            requestAnimationFrame(() => {
                popup1.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-laptop-code icon" style="color:black;"></i>
                                    <p>디바이스: 0</p></div>`;
                popup2.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-wind icon" style="color:blue;"></i>
                                    <p>PM2: -</p></div>`;
                popup3.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-cloud icon" style="color:green;"></i>
                                    <p>CO2: -</p></div>`;
                popup4.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-smog icon" style="color:gray;"></i>
                                    <p>VOC: -</p></div>`;
                popup5.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-thermometer-half icon" style="color:red;"></i>
                                    <p>온도: -</p></div>`;
                popup6.innerHTML = `<div style="display: flex; align-items: center;">
                                    <i class="fas fa-tint icon" style="color:blue;"></i>
                                    <p>습도: -</p></div>`;
            });
        }
    }

    // 제품 정보를 기반으로 정보 창의 내용을 생성하는 함수
    function generateInfoContent(product) {
        return `<div><h1 style="color: black;">${product.name}</h1>
                    <p style="color: black;">Serial Number: ${product.serialNumber}</p>
                    <p style="color: black;">PM2: ${product.pm2}</p>
                    <p style="color: black;">CO2: ${product.co2}</p>
                    <p style="color: black;">VOC: ${product.voc}</p>
                    <p style="color: black;">Temperature: ${product.temp}</p>
                    <p style="color: black;">Humidity: ${product.humid}</p>
                    <p><a href="/products/detail/${product._id}" style="color: blue; text-decoration: underline;">상세 페이지로 이동</a></p>
                </div>`;
    }

    // 지도의 상태가 변화할 때 팝업과 현황판을 갱신
    map.addListener('idle', function() {
        updatePopup();
    });

    // 윈도우 리사이즈 이벤트 처리
    window.addEventListener('resize', function() {
        google.maps.event.trigger(map, 'resize'); // 지도 리사이즈 이벤트 트리거
        map.setCenter({ lat: 37.4027313, lng: 126.9279179 }); // 지도의 중심 재설정
        updatePopup(); // 팝업 및 현황판 업데이트
    });
}