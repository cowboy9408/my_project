function confirmUpdate() {
    // 수정 확인을 위한 팝업 창 HTML을 생성
    const popupHtml = `
        <div id="confirmationPopup" class="popup" style="position: fixed; padding: 20px;">
            <div class="popup-content">
                <p>해당 정보를 수정하시겠습니까?</p>
                <button class="confirm" onclick="submitForm()">확인</button>
                <button class="cancel" onclick="closePopup()">취소</button>
            </div>
        </div>
    `;

    // 생성된 팝업 창을 body 요소에 추가하여 화면에 표시
    document.body.insertAdjacentHTML('beforeend', popupHtml);
}

function submitForm() {
    // 폼 제출을 위해 유효성 검사를 수행
    if (validateForm()) {
        document.getElementById('editProductForm').submit(); // 폼을 제출
        closePopup(); // 폼 제출 후 팝업 창을 닫음
    }
}

function closePopup() {
    const popup = document.getElementById('confirmationPopup');
    if (popup) {
        popup.remove(); // 팝업 창을 DOM에서 제거
    }
}

function validateForm() {
    const inputs = document.querySelectorAll('#editProductForm input, #editProductForm textarea'); // 폼 내의 모든 입력 요소 선택
    let isValid = true;

    // 입력 값이 없는 경우 경고 표시
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;  // 입력 값이 비어있으면 유효성 실패
            input.style.borderColor = 'red';  // 경고를 위해 입력 필드의 테두리 색을 빨간색으로 설정
        } else {
            input.style.borderColor = '';  // 유효한 입력의 경우 경고 표시 제거
        }
    });

    if (!isValid) {
        showAlert();  // 유효성 실패 시 경고 팝업을 표시
        return false;
    }

    return true;  // 모든 입력이 유효한 경우 true 반환
}

function showAlert() {
    // 모든 입력 필드를 채우지 않았을 경우 경고 팝업을 표시
    alert('모든 입력칸을 채워주세요.');

    // 수정 안내 팝업을 닫음
    closePopup();
}

function closePopup() {
    const popup = document.getElementById('confirmationPopup');
    if (popup) {
        popup.remove(); // 팝업 창을 DOM에서 제거
    }
}