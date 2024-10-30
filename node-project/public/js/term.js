// 폼 요소, 전체 동의 체크박스, 개별 체크박스, 제출 버튼을 선택
const form = document.querySelector("#form__wrap");
const checkAll = document.querySelector(".terms__check__all input");
const checkBoxes = document.querySelectorAll(".input__check input");
const submitButton = document.querySelector("button");

// 사용자가 동의한 상태를 저장하는 객체
const agreements = {
  termsOfService: false, // 이용 약관 동의 여부
  privacyPolicy: false,  // 개인정보 처리 방침 동의 여부
  allowPromotions: false // 프로모션 수신 동의 여부
};

// 폼 제출 시 기본 동작(페이지 리로드)을 막음
form.addEventListener("submit", (e) => e.preventDefault());

// 각 개별 체크박스에 입력 이벤트 리스너 추가
checkBoxes.forEach((item) => item.addEventListener("input", toggleCheckbox));

// 개별 체크박스의 상태가 변경될 때 실행되는 함수
function toggleCheckbox(e) {
  const { checked, id } = e.target; // 체크박스의 체크 상태와 id를 가져옴
  agreements[id] = checked; // 동의 객체의 해당 항목을 업데이트
  this.parentNode.classList.toggle("active"); // 체크된 항목에 스타일 적용
  checkAllStatus(); // 전체 동의 체크박스의 상태를 업데이트
  toggleSubmitButton(); // 제출 버튼의 활성화 상태를 업데이트
}

// 전체 동의 체크박스의 상태를 확인하고 업데이트하는 함수
function checkAllStatus() {
  const { termsOfService, privacyPolicy, allowPromotions } = agreements;
  // 모든 항목에 동의했는지 확인
  if (termsOfService && privacyPolicy && allowPromotions) {
    checkAll.checked = true; // 모든 항목이 동의된 경우 전체 동의 체크박스를 체크
  } else {
    checkAll.checked = false; // 그렇지 않은 경우 체크 해제
  }
}

// 제출 버튼의 활성화 상태를 토글하는 함수
function toggleSubmitButton() {
  const { termsOfService, privacyPolicy } = agreements;
  // 필수 항목인 이용 약관과 개인정보 처리 방침에 모두 동의했는지 확인
  if (termsOfService && privacyPolicy) {
    submitButton.disabled = false; // 동의한 경우 제출 버튼 활성화
  } else {
    submitButton.disabled = true; // 동의하지 않은 경우 제출 버튼 비활성화
  }
}

// 전체 동의 체크박스 클릭 시 실행되는 이벤트 리스너
checkAll.addEventListener("click", (e) => {
  const { checked } = e.target;
  // 전체 동의 체크박스가 체크되면 모든 개별 체크박스를 체크하고 상태를 업데이트
  if (checked) {
    checkBoxes.forEach((item) => {
      item.checked = true;
      agreements[item.id] = true;
      item.parentNode.classList.add("active");
    });
  } else {
    // 전체 동의 체크박스가 체크 해제되면 모든 개별 체크박스를 체크 해제하고 상태를 업데이트
    checkBoxes.forEach((item) => {
      item.checked = false;
      agreements[item.id] = false;
      item.parentNode.classList.remove("active");
    });
  }
  toggleSubmitButton(); // 전체 동의 상태에 따라 제출 버튼 상태 업데이트
});