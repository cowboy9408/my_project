const express = require('express'); // Express 웹 프레임워크를 가져옴
const mongoose = require('mongoose'); // MongoDB와 연결하기 위한 Mongoose 라이브러리 가져옴
const bodyParser = require('body-parser'); // 요청 본문을 파싱하기 위한 미들웨어
const session = require('express-session'); // 세션 관리를 위한 Express 미들웨어
const MongoStore = require('connect-mongo'); // 세션 데이터를 MongoDB에 저장하기 위한 미들웨어
const path = require('path'); // 파일 및 디렉토리 경로를 조작하기 위한 유틸리티
const nocache = require('./middlewares/nocache'); // 캐시 방지를 위한 커스텀 미들웨어
const isAuthenticated = require('./middlewares/isAuthenticated'); // 인증 여부를 확인하는 미들웨어

const app = express(); // Express 애플리케이션 생성

// MongoDB 연결
mongoose.connect('mongodb+srv://cowboy9408:q112233@cluster0.tlo4m2w.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB 연결 성공')) // 연결 성공시 메시지 출력
    .catch(err => console.log('MongoDB 연결 오류:', err)); // 연결 실패시 오류 메시지 출력

app.use(bodyParser.urlencoded({ extended: true })); // URL 인코딩된 본문 데이터를 파싱
app.use(bodyParser.json()); // JSON 형식의 본문 데이터를 파싱

// 세션 설정
app.use(session({
    secret: 'yourSecret', // 세션 암호화를 위한 비밀 키
    resave: false, // 세션이 변경되지 않더라도 다시 저장하지 않음
    saveUninitialized: true, // 초기화되지 않은 세션도 저장
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://cowboy9408:q112233@cluster0.tlo4m2w.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0' }) // 세션을 MongoDB에 저장
}));

app.set('view engine', 'ejs'); // EJS 템플릿 엔진 설정
app.set('views', path.join(__dirname, 'views')); // 뷰 파일이 위치한 디렉토리 설정

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공을 위한 디렉토리 설정

app.use(nocache); // 캐시 방지 미들웨어 적용

// 세션 확인 및 로그인 페이지 리다이렉트
app.use((req, res, next) => {
    if (!req.session.user && req.path !== '/login' && req.path !== '/check-session') {
        // return res.redirect('/login'); // 세션이 없으면 로그인 페이지로 리다이렉트
    }
    next();
});

// 이용 약관 페이지 라우트
app.get('/terms', (req, res) => {
    res.render('term'); // 이용 약관 페이지 렌더링
});
// 라우트 설정
app.use('/', require('./routes/auth')); // 인증 관련 라우트 설정
app.use('/dashboard', isAuthenticated, require('./routes/dashboard')); // 대시보드 라우트,
app.use('/products', require('./routes/products')); // 제품 관련 라우트, 
app.use('/logview', isAuthenticated, require('./routes/logview')); // 로그뷰어 라우트, 
app.use('/verification', require('./routes/verification')); // 인증 관련 라우트 설정



// 로그아웃 라우트 추가
app.get('/logout', (req, res) => {
    req.session.destroy(err => { // 세션 파기
        if (err) {
            return res.redirect('/dashboard'); // 오류 발생 시 대시보드로 리다이렉트
        }
        res.clearCookie('connect.sid'); // 세션 쿠키 삭제
        
        // 캐시 무효화 헤더 설정
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');

        // 강제 리다이렉트
        res.redirect(302, '/login'); // 로그인 페이지로 리다이렉트
    });
});

// 세션 유효성 확인 라우트
app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.sendStatus(200); // 세션이 유효함
    } else {
        res.sendStatus(401); // 세션이 없음, 로그인 필요
    }
});



// 서버 포트 설정 및 실행
const PORT = process.env.PORT || 3000; // 포트를 환경 변수에서 가져오거나 3000번 포트로 설정
app.listen(PORT, () => {
    console.log(`포트에서 실행되는 서버 ${PORT}`); // 서버 실행 메시지 출력
});