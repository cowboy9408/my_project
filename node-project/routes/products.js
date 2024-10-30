const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const nocache = require('../middlewares/nocache'); // nocache 미들웨어 불러오기
const isAuthenticated = require('../middlewares/isAuthenticated');

router.use(nocache); // 모든 라우트에 nocache 미들웨어 적용

// 새 제품 등록 페이지 렌더링
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new-product', { user: req.session.user });  // 세션 사용자 정보를 전달하여 새 제품 등록 페이지를 렌더링
});

// 새 제품 추가 처리
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { name, serialNumber, registrationDate, latitude, longitude } = req.body;  // 요청 본문에서 제품 정보를 가져옴

        // 중복된 serialNumber가 있는지 확인
        const existingProduct = await Product.findOne({ serialNumber });
        if (existingProduct) {
            return res.status(400).json({ message: 'Serial number already exists.' });  // 중복된 제품이 있으면 오류 메시지 반환
        }

        // 새 제품 생성 및 저장
        const product = new Product({ name, serialNumber, registrationDate, latitude, longitude });
        await product.save();

        // 새로운 제품 추가 후 센서 데이터를 전송하는 함수 호출
        const sendDataToNewProduct = async (serialNumber) => {
            // 예제 센서 데이터 생성
            const roundToOneDecimal = (num) => Math.round(num * 10) / 10;
            const pm2 = roundToOneDecimal(Math.random() * 100);
            const co2 = roundToOneDecimal(Math.random() * 1000);
            const temp = roundToOneDecimal(Math.random() * 40);
            const humid = roundToOneDecimal(Math.random() * 100);
            const voc = roundToOneDecimal(Math.random() * 10);

            // 센서 데이터를 API로 전송
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serialNumber,
                    pm2,
                    co2,
                    temp,
                    humid,
                    voc
                })
            };

            const response = await fetch('http://192.168.35.57:3000/products/update/public', requestOptions);
            return response.json();  // 응답을 JSON으로 반환
        };

        // 센서 데이터를 전송하고 결과를 처리
        await sendDataToNewProduct(serialNumber);

        // 제품 목록 페이지로 리다이렉트
        res.redirect('/products');
    } catch (err) {
        res.status(500).json({ message: '제품 추가 중 오류', error: err.message });  // 오류 발생 시 메시지 반환
    }
});

// 인증이 필요 없는 제품 업데이트 처리 (공용)
router.post('/update/public', async (req, res) => {
    try {
        console.log("Received data for public update:", req.body);  // 수신된 데이터를 로그에 출력
        const roundToOneDecimal = (num) => Math.round(num * 10) / 10;
        const { serialNumber } = req.body;
        const pm2 = roundToOneDecimal(parseFloat(req.body.pm2));
        const co2 = roundToOneDecimal(parseFloat(req.body.co2));
        const temp = roundToOneDecimal(parseFloat(req.body.temp));
        const humid = roundToOneDecimal(parseFloat(req.body.humid));
        const voc = roundToOneDecimal(parseFloat(req.body.voc));

        const product = await Product.findOne({ serialNumber });  // serialNumber로 제품을 검색

        if (product) {
            if (!product.updateHistory) {
                product.updateHistory = [];  // 업데이트 히스토리가 없으면 초기화
            }
            // 업데이트 히스토리에 새 데이터 추가
            product.updateHistory.push({ pm2, co2, temp, humid, voc });
            // 제품 정보 업데이트
            product.pm2 = pm2;
            product.co2 = co2;
            product.temp = temp;
            product.humid = humid;
            product.voc = voc;

            await product.save();  // 제품 정보 저장
            console.log("Product updated successfully:", product);  // 성공 로그 출력
            res.status(200).json({ message: '제품 업데이트 성공', product });
        } else {
            console.warn("Product not found with serial number:", serialNumber);  // 제품을 찾을 수 없다는 경고 출력
            res.status(404).json({ message: '제품을 찾을 수 없음' });
        }
    } catch (err) {
        console.error("Error updating product:", err);  // 오류 로그 출력
        res.status(500).json({ message: '제품 업데이트 중 오류', error: err.message });  // 오류 메시지 반환
    }
});

// 나머지 제품 라우트 설정 (제품 목록 페이지 렌더링)
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const products = await Product.find().sort({ registrationDate: -1 });  // 등록일을 기준으로 내림차순 정렬된 제품 목록 검색
        res.render('products', { user: req.session.user, products });  // 제품 목록 페이지 렌더링
    } catch (err) {
        res.status(500).send('제품 검색 중 오류');  // 오류 발생 시 메시지 반환
    }
});

// 제품 편집 페이지 렌더링
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);  // ID로 제품 검색
        if (product) {
            res.render('edit-product', { user: req.session.user, product });  // 제품 편집 페이지 렌더링
        } else {
            res.status(404).send('제품을 찾을 수 없음');  // 제품을 찾을 수 없는 경우 메시지 반환
        }
    } catch (err) {
        res.status(500).send('제품 검색 중 오류');  // 오류 발생 시 메시지 반환
    }
});

// 제품 업데이트 처리
router.post('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { registrationDate, latitude, longitude } = req.body;

        const updateFields = {
            registrationDate,
            latitude,
            longitude
        };

        const product = await Product.findByIdAndUpdate(id, updateFields, { new: true });  // 제품 정보 업데이트

        if (product) {
            res.redirect('/products');  // 성공 시 제품 목록 페이지로 리다이렉트
        } else {
            res.status(404).json({ message: '제품을 찾을 수 없음' });  // 제품을 찾을 수 없는 경우 메시지 반환
        }
    } catch (err) {
        res.status(500).json({ message: '제품 업데이트 중 오류', error: err.message });  // 오류 발생 시 메시지 반환
    }
});

// 페이지네이션과 검색 기능이 있는 제품 목록 조회
router.get('/page', isAuthenticated, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // 페이지 번호 설정 (기본값: 1)
        const limit = 10;  // 페이지당 항목 수
        const skip = (page - 1) * limit;  // 건너뛸 항목 수
        const query = req.query.query || '';  // 검색어 설정

        let searchQuery = {};
        if (query) {
            searchQuery = {
                $or: [
                    { name: new RegExp(query, 'i') },  // 이름으로 검색
                    { serialNumber: new RegExp(query, 'i') }  // 시리얼 번호로 검색
                ]
            };
        }
        const totalProducts = await Product.countDocuments(searchQuery);  // 전체 제품 수 계산
        const totalPages = Math.ceil(totalProducts / limit);  // 전체 페이지 수 계산

        const products = await Product.find(searchQuery)
            .sort({ registrationDate: -1 })  // 등록일 기준으로 정렬
            .skip(skip)  // 페이지에 따른 항목 건너뛰기
            .limit(limit);  // 페이지당 항목 제한

        res.json({ products, currentPage: page, totalPages });  // 검색된 제품 목록과 페이지 정보를 JSON으로 반환
    } catch (err) {
        res.status(500).send('제품 검색 중 오류');  // 오류 발생 시 메시지 반환
    }
});

// 제품 삭제 처리
router.post('/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);  // 제품 삭제
    res.redirect('/products');  // 성공 시 제품 목록 페이지로 리다이렉트
});

// 제품 검색 처리
router.get('/search', isAuthenticated, async (req, res) => {
    const query = req.query.query;
    const products = await Product.find({
        $or: [
            { name: new RegExp(query, 'i') },  // 이름으로 검색
            { serialNumber: new RegExp(query, 'i') }  // 시리얼 번호로 검색
        ]
    }).sort({ registrationDate: -1 });  // 등록일 기준으로 정렬
    res.render('products', { user: req.session.user, products });  // 검색 결과 렌더링
});

// 제품 데이터 JSON 응답
router.get('/data', isAuthenticated, async (req, res) => {
    try {
        const products = await Product.find().sort({ registrationDate: -1 });  // 등록일 기준으로 정렬된 제품 목록 검색
        res.json(products);  // 제품 목록을 JSON으로 반환
    } catch (err) {
        res.status(500).send('제품 검색 중 오류');  // 오류 발생 시 메시지 반환
    }
});

// 제품 업데이트 히스토리 조회
router.get('/history', isAuthenticated, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // 페이지 번호 설정 (기본값: 1)
        const limit = 10;  // 페이지당 항목 수
        const skip = (page - 1) * limit;  // 건너뛸 항목 수

        const products = await Product.find();  // 모든 제품 검색
        let updateHistories = [];
        products.forEach(product => {
            product.updateHistory.forEach(update => {
                updateHistories.push({
                    name: product.name,
                    serialNumber: product.serialNumber,
                    registrationDate: product.registrationDate,
                    latitude: product.latitude,
                    longitude: product.longitude,
                    pm2: update.pm2,
                    co2: update.co2,
                    temp: update.temp,
                    humid: update.humid,
                    voc: update.voc,
                    date: update.date
                });
            });
        });

        updateHistories.sort((a, b) => new Date(b.date) - new Date(a.date));  // 업데이트 날짜 기준으로 정렬

        const totalUpdates = updateHistories.length;  // 전체 업데이트 수
        const totalPages = Math.ceil(totalUpdates / limit);  // 전체 페이지 수 계산
        updateHistories = updateHistories.slice(skip, skip + limit);  // 페이지에 따른 업데이트 히스토리 잘라내기

        res.json({ history: updateHistories, currentPage: page, totalPages });  // 업데이트 히스토리와 페이지 정보 반환
    } catch (err) {
        res.status(500).json({ message: '히스토리 검색중 오류', error: err.message });  // 오류 발생 시 메시지 반환
    }
});

// 제품 상세 페이지 라우트 추가 (HTML 페이지 렌더링)
router.get('/detail/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);  // ID로 제품 검색

        if (!product) {
            return res.status(404).send('Product not found');  // 제품을 찾을 수 없는 경우 메시지 반환
        }

        res.render('productDetail', { product });  // EJS 템플릿을 사용하여 제품 상세 페이지 렌더링
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');  // 서버 오류 발생 시 메시지 반환
    }
});

// 제품 상세 정보 JSON 데이터 반환 API 라우트
router.get('/api/detail/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);  // ID로 제품 검색

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });  // 제품을 찾을 수 없는 경우 메시지 반환
        }

        res.json(product);  // 제품 정보를 JSON으로 반환
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });  // 서버 오류 발생 시 메시지 반환
    }
});

// 로그아웃 처리
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');  // 로그아웃 실패 시 메시지 반환
        }
        res.clearCookie('connect.sid');  // 세션 쿠키 삭제
        res.redirect('/login');  // 로그인 페이지로 리다이렉트
    });
});

module.exports = router;  // 라우터 모듈을 외부로 내보냄