const mongoose = require('mongoose');
const category = require('./rentaltype');
const posttype = require('./posttype');
const user = require('./user');
const RentalType = require('./rentaltype');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },           // Tiêu đề bài đăng
  description: { type: String },                      // Mô tả chi tiết phòng trọ
  price: { type: Number, required: true },            // Giá thuê phòng
  area: { type: Number, required: true },             // Diện tích phòng
  province: {
    code: { type: String, required: true },
    name: { type: String, required: true }
},
district: {
    code: { type: String, required: true },
    name: { type: String, required: true }
},
ward: {
    code: { type: String, required: true },
    name: { type: String, required: true }
},
  address: { type: String, required: true },          // Địa chỉ cụ thể
  bathroom: { type: Number, required: true },         // Số phòng tắm
  bedroom: { type: Number, required: true },          // Số phòng ngủ
  attic: { type: String, required: true },            // Có tầng trệt hay không
  floor: { type: Number, required: true },            // Số tầng
  image: [String],                                    // Link hình ảnh phòng trọ
  video: [String],                                    // Link video
  
  rentaltype: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'RentalType', 
    required: true 
  },                                                  // Tham chiếu đến danh mục tin
  
  posttype: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PostType', 
    required: true 
  },                                                  // Tham chiếu đến thể loại tin
  
  createdAt: { type: Date, default: Date.now },       // Ngày tạo bài đăng

  statuspost: { 
    type: String, 
    enum: [
      "Chưa thanh toán",     // 1
      "Chờ xét duyệt",       // 2
      "Đang hiện",           // 3
      "Đang ẩn",             // 4
      "Sắp hết hạn",         // 5
      "Hết hạn"              // 6
    ], 
    required: true 
  },                                                  // Trạng thái bài đăng
  
  isDeleted: { type: Boolean, default: false }        // Đánh dấu xóa bài viết, dễ khôi phục
});

module.exports = mongoose.model('Post', postSchema);
