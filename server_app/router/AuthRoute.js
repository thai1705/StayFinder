const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const authMiddleware = require("../middleware/auth");
const router = express.Router();


// Route đăng ký
router.post("/register", async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    // Lưu người dùng vào DB
    await user.save();

    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Đăng ký thành công!", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// dang nhap
router.post("/login", async (req, res) => {  
  const { email, password } = req.body;  

  try {  
    // Kiểm tra xem người dùng có tồn tại không  
    const user = await User.findOne({ email });  
    if (!user) {  
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });  
    }  

    // Kiểm tra mật khẩu  
    const isPasswordValid = await bcrypt.compare(password, user.password);  
    if (!isPasswordValid) {  
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });  
    }  

    // Tạo token JWT  
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", {  
      expiresIn: "1h",  
    });  

    // Gửi phản hồi với ID người dùng, token và thông điệp thành công  
    res.json({  
      message: "Đăng nhập thành công!",  
      token,      // Token JWT  
      userId: user._id, 
    });  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: "Lỗi server" });  
  }  
});  

// xem toàn bộ thông tin người dùng
router.get("/profile", authMiddleware , async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    res.json(user); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server!" });
  }


});

// Cập nhật thông tin tài khoản  
router.put("/update", authMiddleware, async (req, res) => {  
  const { username, email, phone, avatar } = req.body;  
  try {  
    const user = await User.findById(req.user.userId);  
    if (!user) {  
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });  
    }  

    if (email && email !== user.email) {  
      const existingUser = await User.findOne({ email });  
      if (existingUser) {  
        return res.status(400).json({ message: "Email đã được sử dụng!" });  
      }  
    }  

    user.username = username || user.username;  
    user.email = email || user.email;  
    user.phone = phone || user.phone;  
    user.avatar = avatar || user.avatar;  

    await user.save();  

    res.json({ message: "Cập nhật thông tin thành công!", user });  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: "Lỗi server!", error: err.message });  
  }  
});  


module.exports = router;
