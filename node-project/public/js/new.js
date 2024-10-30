function validateForm() {
    // 폼 내의 모든 입력 필드와 텍스트 영역을 선택
    const inputs = document.querySelectorAll('#newProductForm input, #newProductForm textarea');
    let isValid = true; // 폼의 유효성을 나타내는 변수

    // 각 입력 필드에 대해 유효성 검사 수행
    inputs.forEach(input => {
        if (input.value.trim() === '') { // 입력 필드가 비어 있는지 확인
            isValid = false; // 비어 있으면 유효하지 않음
            input.style.borderColor = 'red'; // 비어 있는 입력 필드에 경고 표시 (빨간색 테두리)
        } else {
            input.style.borderColor = ''; // 입력 필드가 유효하면 경고 표시 제거
        }
    });

    if (!isValid) {
        alert('모든 입력칸을 채워주세요.'); // 비어 있는 필드가 있을 경우 경고 메시지 표시
        return false; // 유효하지 않은 경우 폼 제출 중지
    }

    return true; // 모든 필드가 유효한 경우 true 반환
}

function submitForm() {
    if (validateForm()) { // 폼 유효성 검사를 통과한 경우
        const form = document.getElementById('newProductForm'); // 폼 요소를 선택
        if (form) {
            form.submit(); // 폼을 제출
        }
        closePopup(); // 폼 제출 후 팝업창을 닫음
    }
}

function confirmRegistration(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막음

    if (validateForm()) { // 폼이 유효한 경우
        // 확인 팝업창 HTML 생성
        const popupHtml = `
            <div id="confirm-registration-popup" class="popup" style="position: fixed; padding: 20px;">
                <div class="popup-content">
                    <p class="ment">해당 정보로 제품을 등록하시겠습니까?</p>
                    <button class="confirm" onclick="submitForm()">등록</button>
                    <button class="cancel" onclick="closePopup()">취소</button>
                </div>
            </div>
        `;

        // 생성된 팝업창을 body 요소에 추가하여 화면에 표시
        document.body.insertAdjacentHTML('beforeend', popupHtml);
    }
}

function closePopup() {
    // 팝업창을 닫는 함수
    const popup = document.getElementById('confirm-registration-popup');
    if (popup) {
        popup.remove(); // 팝업창을 DOM에서 제거
    }
}