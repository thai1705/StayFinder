var express = require('express');
var router = express.Router();
var db = require('../database/db')

// Danh sách bài đăng theo kiểu bài đăng 
router.get('/listpost/:post_type', (req, res) => {
    let post_type = req.params.post_type;
    let sql = `SELECT * FROM post WHERE id_post_type = ${post_type} AND status IN (3,5) ORDER BY date_create DESC LIMIT 0,4`;
    db.query(sql, (err, data) =>{
        if(err) res.json({'Thông báo':'Lỗi lấy danh sách bài đăng'});
        else res.json(data);
    })
}); 

// Bài đăng theo danh mục
// router.get('/listpostofcate/:id_cate', (req, res)=>{
//     let id = req.params.id_cate;
//     let sql = `SELECT * FROM post WHERE id_cate = ${id} ORDER BY date_create DESC`;
//     db.query(sql, (err, data) =>{
//         if(err) res.json({'Thông báo':'Lỗi lấy danh sách bài đăng'});
//         else res.json(data);
//     })
// })

// Lấy danh sách
router.get('/post_location', (req, res) =>{
    let sql = `
    SELECT district.id AS id_district,
           REPLACE(REPLACE(district.name, 'Quận ', ''), 'Thành phố ', '') AS district_name,
           REPLACE(city.name, 'Thành phố ', '') AS city_name
    FROM district
    JOIN city ON district.id_city = city.id
  `;
  
    db.query(sql, (err, data) =>{
        if(err) res.json({"Thông báo":'Lỗi', err});
        else res.json(data)
    })
})

router.get('/countpost', (req, res) => {
    let sql = `SELECT COUNT(*) AS total FROM post `;
    db.query(sql, (err, data) =>{
        if(err) res.json({'Thông báo':'Lỗi lấy danh sách bài đăng'});
        else res.json({"Tổng số bài đăng": data[0].total});
    })
}); 

// Chi tiết bài đăng
router.get('/post/:id', (req, res)=>{
    let id = req.params.id;
    let sql = `SELECT * FROM post WHERE id = ${id}`;
    db.query(sql, (err, data)=>{
        if(err) res.json({'Thông báo':'Lỗi lấy danh sách bài đăng'});
        else res.json(data[0]);
    })
})



module.exports = router;
