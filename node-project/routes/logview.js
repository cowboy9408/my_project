const express = require('express');
const router = express.Router();
const Logview = require('../models/Logview');
const Product = require('../models/Product');

// 로그 뷰 페이지 렌더링
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ registrationDate: -1 });  // 등록일을 기준으로 내림차순으로 정렬된 제품 목록을 검색
        res.render('logview', { user: req.session.user, products });  // 세션의 사용자 정보와 함께 로그 뷰 페이지를 렌더링
    } catch (err) {
        res.status(500).send('제품 검색 중 오류');  // 오류 발생 시 500 상태 코드와 함께 오류 메시지 전송
    }
});

// 로그 데이터 JSON 응답
router.get('/data', async (req, res) => {
    try {
        const todos = await Logview.find().sort({ SendDate: -1 });  // 전송 날짜를 기준으로 내림차순 정렬된 로그 데이터를 검색
        res.json(todos);  // 검색된 로그 데이터를 JSON 형식으로 응답
    } catch (err) {
        res.status(500).send('검색 중 오류');  // 오류 발생 시 500 상태 코드와 함께 오류 메시지 전송
    }
});

// Todo 추가 처리
router.post('/', (req, res) => {
    const data = req.body;  // 요청 본문에서 데이터를 가져옴
    console.log("데이터 수신됨: ", data);  // 수신된 데이터를 콘솔에 출력
    const todo = new Logview(data);  // 새로운 Logview 인스턴스를 생성하여 데이터 저장 준비
    todo.save()
        .then(() => res.status(200).send('데이터 수신 및 저장 성공'))  // 저장 성공 시 200 상태 코드와 성공 메시지 전송
        .catch(err => res.status(500).send('데이터 저장 오류'));  // 저장 실패 시 500 상태 코드와 오류 메시지 전송
});

// Todo 페이지 네비게이션
router.get('/page', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // 쿼리 문자열에서 페이지 번호를 가져오고, 기본값은 1로 설정
        const limit = 10;  // 페이지당 항목 수 설정
        const skip = (page - 1) * limit;  // 스킵할 항목 수 계산

        const totalTodos = await Logview.countDocuments();  // 전체 Todo 수 계산
        const totalPages = Math.ceil(totalTodos / limit);  // 전체 페이지 수 계산

        const todos = await Logview.find()
            .sort({ SendDate: -1 })  // 전송 날짜를 기준으로 내림차순으로 정렬된 로그 데이터를 검색
            .skip(skip)  // 페이지에 따라 스킵할 항목 설정
            .limit(limit);  // 페이지당 항목 수 제한

        res.json({ todos, currentPage: page, totalPages });  // 현재 페이지와 전체 페이지 수와 함께 검색된 로그 데이터를 JSON 형식으로 응답
    } catch (err) {
        res.status(500).send('검색 중 오류');  // 오류 발생 시 500 상태 코드와 함께 오류 메시지 전송
    }
});

module.exports = router;  // 라우터 모듈을 외부로 내보냄