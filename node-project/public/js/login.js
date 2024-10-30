document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 저장된 사용자 이름이 있는지 확인
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        // 저장된 사용자 이름이 있으면 입력 필드에 자동으로 채움
        document.getElementById('username').value = savedUsername;
        document.getElementById('remember').checked = true; // 체크 박스를 체크된 상태로 설정
    }

    // 로그인 폼이 제출될 때 실행되는 이벤트 리스너
    document.getElementById('accesspanel').addEventListener('submit', function() {
        if (document.getElementById('remember').checked) {
            // '기억하기' 체크 박스가 체크된 경우 사용자 이름을 로컬 스토리지에 저장
            localStorage.setItem('savedUsername', document.getElementById('username').value);
        } else {
            // 체크가 해제된 경우 로컬 스토리지에서 사용자 이름을 삭제
            localStorage.removeItem('savedUsername');
        }
    });
});

function showError(message) {
    // 오류 메시지를 경고창으로 표시
    alert(message);
}

function validateForm() {
    // 서버 측에서 실제로 회원가입 정보와 일치하는지 검증하므로 클라이언트 측에서는 항상 true 반환
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        // 회원가입 버튼 클릭 시 이용약관 페이지로 이동
        registerButton.addEventListener('click', function() {
            window.location.href = '/terms';
        });
    } else {
        console.error("registerButton element not found."); // 회원가입 버튼이 없는 경우 오류 로그 출력
    }
});