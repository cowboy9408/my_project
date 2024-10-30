function fetchUpdateHistory(page = 1) {
    // 특정 페이지의 업데이트 히스토리를 서버에서 가져오는 AJAX 요청
    $.ajax({
        url: `/products/history?page=${page}`,  // 서버에서 데이터를 가져올 URL
        method: 'GET',  // GET 메서드를 사용하여 데이터 요청
        success: function(data) {
            // 요청이 성공하면 실행되는 함수
            var historyTable = '';

            // 서버에서 받은 히스토리 데이터를 테이블 형식으로 생성
            data.history.forEach(function(update) {
                historyTable += '<tr>' +
                    '<td>' + update.name + '</td>' +  // 제품 이름
                    '<td>' + update.serialNumber + '</td>' +  // 제품 시리얼 번호
                    '<td>' + new Date(update.registrationDate).toISOString().split('T')[0] + '</td>' +  // 등록 날짜 (ISO 형식)
                    '<td>' + update.latitude + '</td>' +  // 위도
                    '<td>' + update.longitude + '</td>' +  // 경도
                    '<td>' + update.pm2 + '</td>' +  // 미세먼지 수치
                    '<td>' + update.co2 + '</td>' +  // 이산화탄소 수치
                    '<td>' + update.temp + '</td>' +  // 온도
                    '<td>' + update.humid + '</td>' +  // 습도
                    '<td>' + update.voc + '</td>' +  // 휘발성 유기 화합물 수치
                    '<td>' + new Date(update.date).toISOString().split('T')[0] + '</td>' +  // 업데이트 날짜 (ISO 형식)
                    '</tr>';
            });

            // 생성된 히스토리 테이블을 DOM에 추가
            $('#update-history').html(historyTable);
            // 페이지네이션 버튼 생성 및 추가
            $('#pagination').html(createPagination(data.currentPage, data.totalPages));
        },
        error: function(error) {
            // 요청이 실패하면 오류를 콘솔에 출력
            console.error('Error fetching update history:', error);
        }
    });
}

function createPagination(currentPage, totalPages) {
    // 페이지네이션 버튼을 생성하는 함수
    let paginationHtml = '';
    const maxPages = 10;  // 한 번에 표시할 최대 페이지 수
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));  // 시작 페이지 번호 계산
    let endPage = Math.min(totalPages, startPage + maxPages - 1);  // 끝 페이지 번호 계산

    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);  // 페이지가 부족할 경우 시작 페이지 조정
    }

    if (startPage > 1) {
        // 시작 페이지가 1보다 크면 'First' 버튼 추가
        paginationHtml += `<button onclick="fetchUpdateHistory(1)">First</button>`;
    }

    // 페이지 번호 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHtml += `<span>${i}</span>`;  // 현재 페이지는 버튼 대신 텍스트로 표시
        } else {
            paginationHtml += `<button onclick="fetchUpdateHistory(${i})">${i}</button>`;  // 다른 페이지는 버튼으로 표시
        }
    }

    if (endPage < totalPages) {
        // 끝 페이지가 전체 페이지 수보다 작으면 'Last' 버튼 추가
        paginationHtml += `<button onclick="fetchUpdateHistory(${totalPages})">Last</button>`;
    }

    return paginationHtml;  // 생성된 페이지네이션 HTML 반환
}

document.addEventListener('DOMContentLoaded', () => {
    // 페이지가 로드되면 업데이트 히스토리를 처음으로 가져옴
    fetchUpdateHistory();

    // 자동 갱신 설정 (10초마다 업데이트 히스토리 갱신)
    setInterval(() => {
        fetchUpdateHistory();
    }, 10000);
});