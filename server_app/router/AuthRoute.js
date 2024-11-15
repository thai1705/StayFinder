const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const User = require("../model/user");
const authMiddleware = require("../middleware/auth");
const router = express.Router();


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

      // Tạo token JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username, phone: user.phone, role: user.role }, // Thêm username và phone vào payload
        "your_jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );

    res.json({ message: "Đăng nhập thành công!", token, userId: user._id, role: user.role});
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

//   try {
//     const user = await User.findById(req.user.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "Không tìm thấy người dùng!" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Lỗi server!" });
//   }
// });

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

// Route lấy tất cả người dùng  
router.get("/users", authMiddleware, async (req, res) => {  
  try {  
    const currentUserId = req.user.userId;   
    const currentUser = await User.findById(currentUserId);   

    let users;  
    if (currentUser.role === 0) {  
      users = await User.find({ _id: { $ne: currentUserId } }).select("-password");  
    } else if (currentUser.role === 1) {  
      users = await User.find({ role: 2, _id: { $ne: currentUserId } }).select("-password");  
    } else {  
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });  
    }  

    res.json(users);  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: "Lỗi server!" });  
  }  
});

router.delete("/users/:id", authMiddleware, async (req, res) => {  
  const { id } = req.params;  

  try {  
    // Tìm người dùng theo ID  
    const user = await User.findById(id);  
    if (!user) {  
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });  
    }  


    // if (req.user.userId !== id && req.user.role !== 1) {  
    //   return res.status(403).json({ message: "Bạn không có quyền xóa người dùng này!" });  
    // }  

    // Xóa người dùng  
    await User.findByIdAndDelete(id);  
    res.json({ message: "Xóa người dùng thành công!" });  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: "Lỗi server!", error: err.message });  
  }  
});  


// Cập nhật trạng thái tài khoản  
router.put("/update-status/:id", authMiddleware, async (req, res) => {  
  const { id } = req.params;  
  const { status } = req.body;  

  try {  
    // Kiểm tra xem trạng thái có hợp lệ không  
    if (status !== 0 && status !== 1 && status !== 2) {  
      return res.status(400).json({ message: "Trạng thái không hợp lệ!" });  
    }  

    // Tìm người dùng theo ID  
    const user = await User.findById(id);  
    if (!user) {  
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });  
    }  

    // Kiểm tra quyền chỉnh sửa (nếu cần)  
    // Ví dụ: chỉ cho phép admin (role = 1) chỉnh sửa trạng thái của người dùng khác  
    // if (req.user.role !== 1 && req.user.userId !== id) {  
    //   return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa trạng thái người dùng này!" });  
    // }  

    // Cập nhật trạng thái người dùng  
    user.status = status;  
    await user.save();  

    res.json({ message: "Cập nhật trạng thái thành công!", user });  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: "Lỗi server!", error: err.message });  
  }  
});

// Cập nhật vai trò người dùng 
router.put("/update-role/:id", authMiddleware, async (req, res) => {  
  const { id } = req.params;   
  const { role } = req.body;

  try {  
    // Kiểm tra vai trò có hợp lệ không  
    if (role !== 0 && role !== 1 && role !== 2) {  
      return res.status(400).json({ message: "Vai trò không hợp lệ!" });  
    }  

    // Tìm người dùng theo ID  
    const user = await User.findById(id);  
    if (!user) {  
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });  
    }  

    if (req.user.role !== 0) {  
      return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa vai trò người dùng này!" });  
    }  

    // Cập nhật vai trò người dùng  
    user.role = role; // Cập nhật vai trò  
    await user.save();  

    res.json({ message: "Cập nhật vai trò thành công!", user });  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ message: "Lỗi server!", error: err.message });  
  }  
});


module.exports = router;
