const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 회원가입 스키마 정보 (사용자 모델)
// 사용자를 위한 스키마 정의
const UserSchema = new mongoose.Schema({
    username: {
        type: String, // 사용자명은 문자열 타입
        required: true, // 필수 항목
        unique: true, // 고유해야 함 (중복 불가)
    },
    password: {
        type: String, // 비밀번호는 문자열 타입
        required: true, // 필수 항목
    },
    phoneNumber: {
        type: String, // 전화번호는 문자열 타입
        required: true, // 필수 항목
    },
    isPhoneVerified: {
        type: Boolean, // 전화번호 인증 여부를 나타내는 불리언 타입
        default: false, // 기본값은 false
    },
    phoneVerificationCode: {
        type: String, // 전화번호 인증 코드는 문자열 타입
    },
});

// 사용자 정보 저장 전에 비밀번호를 암호화
UserSchema.pre('save', async function (next) {
    // 비밀번호가 수정되지 않았으면 다음 미들웨어로 넘어감
    if (!this.isModified('password')) {
        return next();
    }
    // 비밀번호를 해시 처리하여 저장
    this.password = await bcrypt.hash(this.password, 10);
    next(); // 다음 미들웨어로 이동
});

// 입력된 비밀번호와 저장된 비밀번호를 비교하는 메서드
UserSchema.methods.comparePassword = function (candidatePassword) {
    // bcrypt를 사용하여 비밀번호 비교
    return bcrypt.compare(candidatePassword, this.password);
};

// User 모델을 생성하여 모듈로 내보냄
module.exports = mongoose.model('User', UserSchema);