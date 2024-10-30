const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const User = require('../models/User');

// Twilio 클라이언트를 설정하여 SMS 전송 기능 사용
// const twilioClient = twilio();
// const twilioPhoneNumber = '';  // Twilio 전화번호 설정

// 인증 코드 전송
router.post('/send-verification-code', async (req, res) => {
    const { phoneNumber } = req.body;  // 요청 본문에서 전화번호를 가져옴
    if (!phoneNumber) {
        console.error('Phone number is missing');  // 전화번호가 없을 경우 오류 메시지 출력
        return res.status(400).send('Phone number is required');  // 400 오류 코드와 함께 응답
    }

    // 6자리 랜덤 인증 코드 생성
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const message = `Your verification code is ${verificationCode}`;  // SMS 메시지 생성

        // Twilio를 사용하여 SMS 전송
        await twilioClient.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        // 데이터베이스에서 사용자를 찾고, 없으면 새로 생성
        let user = await User.findOne({ phoneNumber });
        if (user) {
            user.phoneVerificationCode = verificationCode;  // 기존 사용자의 인증 코드 업데이트
        } else {
            user = new User({ phoneNumber, phoneVerificationCode: verificationCode });  // 새 사용자 생성
        }
        await user.save();  // 사용자 정보 저장

        res.status(200).send('Verification code sent');  // 인증 코드 전송 성공 메시지 반환
    } catch (error) {
        console.error('Error sending verification code:', error);  // 인증 코드 전송 중 오류 발생 시 로그 출력
        res.status(500).send('Error sending verification code');  // 500 오류 코드와 함께 응답
    }
});

// 인증 코드 검증
router.post('/verify-code', async (req, res) => {
    const { phoneNumber, code } = req.body;  // 요청 본문에서 전화번호와 인증 코드를 가져옴
    if (!phoneNumber || !code) {
        console.error('Phone number or verification code is missing');  // 전화번호 또는 인증 코드가 없을 경우 오류 메시지 출력
        return res.status(400).send('Phone number and verification code are required');  // 400 오류 코드와 함께 응답
    }

    try {
        const user = await User.findOne({ phoneNumber });  // 전화번호로 사용자 검색
        if (user && user.phoneVerificationCode === code) {
            user.isPhoneVerified = true;  // 인증 성공 시 전화번호 인증 상태를 true로 설정
            user.phoneVerificationCode = null;  // 인증 코드 초기화
            await user.save();  // 사용자 정보 저장
            res.status(200).send('Phone number verified');  // 전화번호 인증 성공 메시지 반환
        } else {
            console.error('Invalid verification code');  // 잘못된 인증 코드일 경우 오류 메시지 출력
            res.status(400).send('Invalid verification code');  // 400 오류 코드와 함께 응답
        }
    } catch (error) {
        console.error('Error verifying code:', error);  // 인증 코드 검증 중 오류 발생 시 로그 출력
        res.status(500).send('Error verifying code');  // 500 오류 코드와 함께 응답
    }
});

module.exports = router;  // 라우터 모듈을 외부로 내보냄