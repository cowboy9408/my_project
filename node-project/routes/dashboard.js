const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// 대시보드 페이지 렌더링
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();  // 데이터베이스에서 모든 위치 정보를 가져옴
        res.render('dashboard', { 
            user: req.session.user,  // 세션에 저장된 사용자 정보와 함께
            locations: JSON.stringify(locations)  // 위치 정보를 JSON 문자열로 변환하여 대시보드 페이지에 전달
        });
    } catch (err) {
        res.status(500).send('위치 검색 중 오류');  // 오류 발생 시 500 상태 코드와 함께 오류 메시지 전송
    }
});

module.exports = router;  // 라우터 모듈을 외부로 내보냄