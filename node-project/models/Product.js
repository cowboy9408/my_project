const mongoose = require('mongoose');

// 제품 정보를 저장하기 위한 스키마 정의
const ProductSchema = new mongoose.Schema({
    name: {
        type: String, // 제품명은 문자열 타입
        required: true, // 필수 항목
    },
    serialNumber: {
        type: String, // 시리얼 번호는 문자열 타입
        required: true, // 필수 항목
        unique: true, // 고유해야 함 (중복 불가)
    },
    latitude: {
        type: String, // 제품의 위도는 문자열 타입
        required: true, // 필수 항목
    },
    longitude: {
        type: String, // 제품의 경도는 문자열 타입
        required: true, // 필수 항목
    },
    registrationDate: {
        type: Date, // 등록 날짜는 날짜 타입
        required: true, // 필수 항목
        default: Date.now, // 기본값은 현재 날짜
    },
    pm2: {
        type: Number, // 미세먼지(PM2.5) 수치는 숫자 타입
    },
    co2: {
        type: Number, // 이산화탄소(CO2) 수치는 숫자 타입
    },
    temp: {
        type: Number, // 온도는 숫자 타입
    },
    humid: {
        type: Number, // 습도는 숫자 타입
    },
    voc: {
        type: Number, // 휘발성 유기 화합물(VOC) 수치는 숫자 타입
    },
    // 업데이트 기록을 저장하는 배열
    updateHistory: [
        {
            date: { type: Date, default: Date.now }, // 업데이트 날짜는 기본적으로 현재 날짜로 설정
            name: String, // 제품명
            serialNumber: String, // 시리얼 번호
            registrationDate: Date, // 등록 날짜
            latitude: String, // 위도
            longitude: String, // 경도
            pm2: Number, // 미세먼지 수치
            co2: Number, // 이산화탄소 수치
            temp: Number, // 온도
            humid: Number, // 습도
            voc: Number // 휘발성 유기 화합물 수치
        }
    ]
});

// Product 모델을 생성하여 모듈로 내보냄
module.exports = mongoose.model('Product', ProductSchema);