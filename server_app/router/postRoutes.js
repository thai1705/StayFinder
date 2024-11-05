const express = require('express');
const app = express.Router();
const Post = require('../model/post.js');
const { upload } = require('./upload'); // Sửa đổi để import upload
const rentaltype = require('../model/rentaltype.js');
const statuspost = require('../model/statuspost');
const authMiddleware = require('../middleware/auth.js')
// Thêm ảnh
app.post('/them-bai-viet-moi/upload',  upload.fields([{ name: 'image', maxCount: 10 }, { name: 'video', maxCount: 5 }]), async (req, res) => {
  try {
      const image = req.file;
      const video = req.file;
      res.status(200).send({ message: 'File uploaded successfully', filename: image.filename, filenamw:video.fieldname });
  } catch (error) {
      res.status(500).send({ message: 'Error uploading file', error });
  }
});
// Lấy chi tiết bài đăng theo ID
app.get('/chi-tiet-bai-dang/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("Fetching post with ID:", postId); // Log the ID being fetched
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      console.log("Post not found or is deleted."); // Log if the post is not found
      return res.status(404).json({ error: 'Không tìm thấy bài đăng.' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post details:', error); // Log any error that occurs
    res.status(500).json({ error: 'Lỗi khi lấy chi tiết bài đăng.' });
  }
});

app.post('/them-bai-viet-moi', authMiddleware, upload.fields([{ name: 'image', maxCount: 10 }, { name: 'video', maxCount: 5 }]), async (req, res) => {
  console.log("Files received:", req.files); 
  console.log(req.body);
  console.log("Thông tin người dùng:", req.user); // Log thông tin người dùng
  try {
      
      const province = JSON.parse(req.body.province);
      const district = JSON.parse(req.body.district);
      const ward = JSON.parse(req.body.ward);

      const { title, description, price, area, address, bathroom, bedroom, attic, floor, rentaltype, posttype, statuspost } = req.body; // Đảm bảo bạn đã nhận statuspost từ req.body
      const userId = req.user.userId;

      if (!req.user) {
          return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }

      // Kiểm tra nếu `req.files` tồn tại và có chứa tệp `image` và `video`
      const imageFiles = req.files && req.files['image'] ? req.files['image'].map(file => file.filename) : [];
      const videoFiles = req.files && req.files['video'] ? req.files['video'].map(file => file.filename) : [];
  // Lấy số điện thoại và tên người dùng từ req.user, nếu không có từ req.body
        const phone = req.user.phone || req.body.phone; 
        const username = req.user.username || req.body.username;
      // Tạo bài viết mới
      const newPost = new Post({
          title,
          description,
          price,
          area,
          province: { code: province.code, name: province.name },
          district: { code: district.code, name: district.name },
          ward: { code: ward.code, name: ward.name },
          address,
          bathroom,
          bedroom,
          attic,
          floor,
          image: imageFiles,
          video: videoFiles,
          rentaltype,
          posttype,
          userId, // Lưu ID người dùng
          phone: req.body.phone || req.user.phone,   // Lưu số điện thoại, sử dụng từ req.user nếu không có
          username: req.user.username || req.body.username, // Lưu tên người dùng
          statuspost // Đảm bảo statuspost có giá trị hợp lệ
      });

      await newPost.save();
      res.status(201).json(newPost);
  } catch (error) {
      console.error('Lỗi khi thêm bài đăng:', error);
      res.status(500).json({ error: 'Lỗi khi thêm bài đăng' });
  }
});

// Cập nhật bài đăng
app.put('/cap-nhat-bai-dang/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: 'Không tìm thấy bài đăng.' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật bài đăng.' });
  }
});

// Xóa bài đăng (Cập nhật trạng thái isDeleted)
app.delete('/xoa-bai-dang/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!deletedPost) return res.status(404).json({ error: 'Không tìm thấy bài đăng.' });
    res.json({ message: 'Bài đăng đã bị xóa.' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa bài đăng.' });
  }
});

// Lấy danh sách bài đăng
app.get('/lay-danh-sach-bai-dang', async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách bài đăng.' });
  }
});



module.exports = app;
