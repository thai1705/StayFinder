const express = require('express');
const app = express.Router();
const Post = require('../model/post.js');
const { upload } = require('./upload'); // Sửa đổi để import upload
const rentaltype = require('../model/rentaltype.js');
const statuspost = require('../model/statuspost');

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
app.post('/them-bai-viet-moi', upload.fields([{ name: 'image', maxCount: 10 }, { name: 'video', maxCount: 5 }]), async (req, res) => {
  console.log("Files received:", req.files); 
  console.log(req.body);
  try {
      const province = JSON.parse(req.body.province);
      const district = JSON.parse(req.body.district);
      const ward = JSON.parse(req.body.ward);

      const { title, description, price, area, address, bathroom, bedroom, attic, floor, rentaltype, posttype, phonenumber, statuspost } = req.body;

      // Kiểm tra nếu `req.files` tồn tại và có chứa tệp `image` và `video`
      const imageFiles = req.files && req.files['image'] ? req.files['image'].map(file => file.filename) : [];
      const videoFiles = req.files && req.files['video'] ? req.files['video'].map(file => file.filename) : [];

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
          phonenumber,
          statuspost
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
