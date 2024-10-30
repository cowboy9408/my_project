// 서버에서 제품 데이터를 가져오는 함수. 기본적으로 페이지는 1, 검색어는 빈 문자열로 설정
async function fetchProducts(page = 1, query = '') {
    // 지정된 페이지와 검색어를 사용하여 데이터 요청
    const response = await fetch(`/products/page?page=${page}&query=${query}`);
    const data = await response.json(); // JSON 응답을 자바스크립트 객체로 변환
    const productList = document.getElementById('product-list'); // 제품 목록을 표시할 요소 선택
    productList.innerHTML = ''; // 기존 목록 초기화

    // 각 제품에 대해 테이블 행 생성
    data.products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <a href="/products/detail/${product._id}" style="color: white;">
                    ${product.name}
                </a>
            </td>
            <td>${product.serialNumber}</td>
            <td>${new Date(product.registrationDate).toLocaleDateString()}</td>
            <td>
                <form class="delete" id="delete-form-${product._id}" action="/products/delete/${product._id}" method="POST" onsubmit="return confirmDelete(event, this)">
                    <button type="submit">Delete</button>
                </form>
                <form class="edit" action="/products/edit/${product._id}" method="GET">
                    <button type="submit">Edit</button>
                </form>
            </td>
        `;
        productList.appendChild(row); // 생성된 행을 테이블에 추가
    });

    // 페이지 네비게이션을 업데이트
    document.getElementById('pagination').innerHTML = createPagination(data.currentPage, data.totalPages, query);
}

// 페이지 네비게이션을 생성하는 함수
function createPagination(currentPage, totalPages, query = '') {
    let paginationHtml = ''; // 페이지 네비게이션 HTML을 담을 변수
    const maxPages = 10; // 한 번에 표시할 최대 페이지 수
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2)); // 시작 페이지 계산
    let endPage = Math.min(totalPages, startPage + maxPages - 1); // 끝 페이지 계산

    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1); // 페이지 범위 조정
    }

    // 첫 페이지로 이동하는 버튼 추가
    if (startPage > 1) {
        paginationHtml += `<button onclick="fetchProducts(1, '${query}')">First</button>`;
    }

    // 각 페이지 번호에 대해 버튼 또는 현재 페이지 표시
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHtml += `<span>${i}</span>`; // 현재 페이지는 텍스트로 표시
        } else {
            paginationHtml += `<button onclick="fetchProducts(${i}, '${query}')">${i}</button>`; // 다른 페이지는 버튼으로 표시
        }
    }

    // 마지막 페이지로 이동하는 버튼 추가
    if (endPage < totalPages) {
        paginationHtml += `<button onclick="fetchProducts(${totalPages}, '${query}')">Last</button>`;
    }

    return paginationHtml; // 생성된 페이지 네비게이션 HTML 반환
}

// 문서가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // 초기 제품 데이터를 가져옴

    // 검색 폼 선택 및 이벤트 리스너 추가
    const searchForm = document.querySelector('.search');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // 폼 제출 기본 동작을 막음
        const query = document.querySelector('.search .input').value; // 검색어 입력 값 가져오기
        fetchProducts(1, query); // 첫 페이지의 검색 결과를 가져옴
    });
});

// 제품 삭제 확인 팝업창을 띄우는 함수
function confirmDelete(event, form) {
    event.preventDefault(); // 폼 제출을 막음
    // 팝업창 HTML 생성
    const popupHtml = `
        <div id="confirm-delete-popup" class="popup">
            <div class="popup-content">
                <p class="ment">제품을 리스트에서 삭제하시겠습니까?</p>
                <button class="confirm" onclick="submitForm('${form.id}')">삭제</button>
                <button class="cancel" onclick="closePopup()">취소</button>
            </div>
        </div>
    `;

    // 팝업창을 body에 추가하여 화면에 표시
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    return false; // 폼 제출 중단
}

// 팝업창을 닫는 함수
function closePopup() {
    const popup = document.getElementById('confirm-delete-popup');
    if (popup) {
        popup.remove(); // 팝업창을 DOM에서 제거
    }
}

// 폼을 제출하는 함수
function submitForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.submit(); // 폼을 제출
    }
    closePopup(); // 폼 제출 후 팝업창을 닫음
}