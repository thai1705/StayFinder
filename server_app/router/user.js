var express = require('express');
var router = express.Router();
var db = require('../database/db');

// Route lấy danh sách bài đăng theo loại
router.get('/listpost/:post_type', (req, res) => {
    let post_type = req.params.post_type;
    let sql = `SELECT * FROM post WHERE status = 3 AND id_post_type = ${post_type}`;
    db.query(sql, (err, data) => {
        if (err) res.json({ 'Thông báo': 'Lỗi lấy danh sách bài đăng.' });
        else res.json(data);
    });
});     


router.delete('/xoauser/:id', (req, res)=>{
    let id = req.params.id;
    let sql = `DELETE FROM user WHERE id = ${id}`;
    db.query(sql, (err, data)=>{
        if(err) res.json({'thongbao':'Loi' ,err})
        else res.json({"Thongbao":'Ban da xoa tai khoa thanh cong'})    
    })
})

module.exports = router;
