const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    Model: String,
    PM2: String,
    Co2: String,
    VOC: String,
    Temp: String,
    Humidity: String,
    SendDate: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);