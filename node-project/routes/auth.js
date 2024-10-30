const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 로그인 페이지 렌더링
router.get('/', (req, res) => {
    res.render('login', { user: req.session.user });  // 세션에 저장된 사용자 정보와 함께 로그인 페이지를 렌더링
});

// 로그인 페이지 렌더링 (URL: /login)
router.get('/login', (req, res) => {
    res.render('login');  // 로그인 페이지를 렌더링
});

// 로그인 처리
router.post('/login', async (req, res) => {
    const { username, password } = req.body;  // 요청 바디에서 사용자명과 비밀번호를 가져옴
    const user = await User.findOne({ username });  // 데이터베이스에서 사용자명을 통해 사용자 검색

    if (user && await user.comparePassword(password)) {
        req.session.user = user;  // 비밀번호가 일치하면 세션에 사용자 정보를 저장
        res.redirect('/dashboard');  // 대시보드 페이지로 리다이렉트
    } else {
        res.render('login', { errorMessage: "회원가입 정보와 일치하지 않습니다." });  // 로그인 실패 시 에러 메시지와 함께 로그인 페이지 렌더링
    }
});

// 로그아웃 처리
router.get('/logout', (req, res) => {
    req.session.destroy(err => {  // 세션을 삭제하여 로그아웃 처리
        if (err) {
            return res.redirect('/');  // 에러가 발생하면 홈 페이지로 리다이렉트
        }
        res.clearCookie('connect.sid');  // 세션 쿠키를 삭제
        res.redirect('/login');  // 로그인 페이지로 리다이렉트
    });
});

// 회원가입 처리
router.post('/register', async (req, res) => {
    const { username, password, phoneNumber } = req.body;  // 요청 바디에서 사용자명, 비밀번호, 전화번호를 가져옴

    try {
        const user = new User({ username, password, phoneNumber, isPhoneVerified: false });  // 새로운 사용자 생성
        await user.save();  // 사용자 정보를 데이터베이스에 저장
        res.status(200).send('User registered. Please verify your phone number.');  // 사용자 등록 성공 메시지 전송
    } catch (error) {
        console.error('Error registering user:', error);  // 에러 로그 출력
        res.status(500).send('Error registering user');  // 사용자 등록 실패 메시지 전송
    }
});

// 회원가입 페이지 렌더링
router.get('/register', (req, res) => {
    res.render('register');  // 회원가입 페이지를 렌더링
});

module.exports = router;  // 라우터 모듈을 외부로 내보냄