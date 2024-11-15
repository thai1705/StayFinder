const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../model/user");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Cấu hình multer để lưu file ảnh vào thư mục "uploads" với tên duy nhất
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

    // Tạo người dùng mới và thêm ngày tạo
    user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      createdAt: new Date(), // Thêm ngày tạo vào đây
    });

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
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }
    // Cập nhật thời điểm đăng nhập cuối cùng
    user.lastLogin = new Date();
    await user.save();

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, phone: user.phone },
      "your_jwt_secret_key",
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Đăng nhập thành công!", token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// xem toàn bộ thông tin người dùng
router.get("/profile", authMiddleware, async (req, res) => {
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
router.put(
  "/update",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    const { username, email, phone } = req.body;
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

      // Nếu có file avatar được upload thì cập nhật đường dẫn của avatar
      if (req.file) {
        user.avatar = req.file.path; // Lưu đường dẫn của file avatar vào database
      }

      await user.save();

      res.json({ message: "Cập nhật thông tin thành công!", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
  }
);

// đổi mật khẩu
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Kiểm tra độ mạnh của mật khẩu mới
    if (new_password.length < 8) {
      return res
        .status(400)
        .json({ message: "Mật khẩu mới phải dài ít nhất 8 ký tự." });
    }

    // Mã hóa và cập nhật mật khẩu mới
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công." });
  } catch (error) {
    console.error("Error in change-password route:", error.message); // Thêm lỗi chi tiết
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});



module.exports = router;
