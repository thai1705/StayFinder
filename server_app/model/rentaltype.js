const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalTypeSchema = new Schema({
    id: { type: Number, required: true, unique: true }, // ID của loại hình
    name: { type: String, required: true } // Tên loại hình
}, {
    timestamps: true // Tự động thêm trường createdAt và updatedAt
});

// Mô hình RentalType
const RentalType = mongoose.model('RentalType', rentalTypeSchema);

// Xuất mô hình
module.exports = RentalType;
