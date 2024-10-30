var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stayfinder'
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
        return;
    }
    console.log('Kết nối MySQL thành công!');
});

module.exports = db;
