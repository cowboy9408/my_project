function sendVerificationCode() {
    // 사용자가 입력한 전화번호를 가져옴
    const phoneNumber = document.getElementById('phoneNumber').value;
    // 서버로 인증 코드를 요청하는 API 호출
    fetch('/send-verification-code', {
        method: 'POST', // POST 메서드 사용
        headers: { 'Content-Type': 'application/json' }, // 요청 헤더 설정
        body: JSON.stringify({ phoneNumber }) // 요청 본문에 전화번호를 JSON 형식으로 포함
    }).then(response => {
        // 응답 상태에 따라 알림을 표시
        if (response.status === 200) {
            alert('Verification code sent.'); // 성공적으로 인증 코드가 전송된 경우
        } else {
            alert('Failed to send verification code.'); // 인증 코드 전송에 실패한 경우
        }
    }).catch(error => console.error('Error:', error)); // 오류가 발생한 경우 콘솔에 오류 출력
}

function verifyCode() {
    // 사용자가 입력한 전화번호와 인증 코드를 가져옴
    const phoneNumber = document.getElementById('phoneNumber').value;
    const code = document.getElementById('verificationCode').value;
    // 서버로 인증 코드를 검증하는 API 호출
    fetch('/verify-code', {
        method: 'POST', // POST 메서드 사용
        headers: { 'Content-Type': 'application/json' }, // 요청 헤더 설정
        body: JSON.stringify({ phoneNumber, code }) // 요청 본문에 전화번호와 인증 코드를 JSON 형식으로 포함
    }).then(response => {
        // 응답 상태에 따라 알림을 표시
        if (response.status === 200) {
            alert('Phone number verified.'); // 전화번호가 성공적으로 인증된 경우
        } else {
            alert('Invalid verification code.'); // 인증 코드가 올바르지 않은 경우
        }
    }).catch(error => console.error('Error:', error)); // 오류가 발생한 경우 콘솔에 오류 출력
}

// 'send' 버튼 클릭 시 인증 코드를 전송하는 함수 호출
document.getElementById('send').addEventListener('click', sendVerificationCode);
// 'verify' 버튼 클릭 시 인증 코드를 검증하는 함수 호출
document.getElementById('verify').addEventListener('click', verifyCode);

