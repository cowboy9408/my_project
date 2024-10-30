const mongoose = require('mongoose');

// 로그 뷰 정보를 저장하기 위한 스키마 정의
const LogviewSchema = new mongoose.Schema({
    Model: String,      // 모델명을 저장하는 필드
    Number: String,     // 장치 번호를 저장하는 필드
    PM2: String,        // 미세먼지(PM2.5) 수치를 저장하는 필드
    Co2: String,        // 이산화탄소(CO2) 수치를 저장하는 필드
    VOC: String,        // 휘발성 유기 화합물(VOC) 수치를 저장하는 필드
    Temp: String,       // 온도를 저장하는 필드
    Humidity: String,   // 습도를 저장하는 필드
    SendDate: String    // 데이터 전송 날짜를 저장하는 필드
});

// Logview 모델을 생성하여 모듈로 내보냄
module.exports = mongoose.model('Logview', LogviewSchema);