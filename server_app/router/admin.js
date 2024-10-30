var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.delete('/xoapost/:id', (req, res)=>{
    let id = req.params.id;
    let sql = `DELETE FROM post WHERE id = ${id}`;
    db.query(sql, (err, data)=>{
        if(err) res.json({'thongbao':'Loi', err});
        else res.json({'thongbao':'Ban da xoa thanh cong'})
    })
})

module.exports = router;
