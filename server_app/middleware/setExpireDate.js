// setExpireDateMiddleware.js

module.exports = function(next) {
    const postTypeDuration = {
      thường: 0,    // Không có hạn sử dụng cho loại "thường"
      vip1: 7,      // Tin VIP1 có hạn 7 ngày
      vip2: 14      // Tin VIP2 có hạn 14 ngày
    };
  
    if (this.posttype in postTypeDuration) {
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + postTypeDuration[this.posttype]);
      this.expireDate = expireDate; // Lưu ngày hết hạn vào trường expireDate
    }
  
    next();
  };
  