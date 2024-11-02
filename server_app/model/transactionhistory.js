const mongoose = require('mongoose');

const transactionHistorySchema = new mongoose.Schema({
    id_payment_post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PaymentPost' // Liên kết với mô hình PaymentPost
    },
    type_payment: {
        type: String,
        enum: ['successful', 'failed', 'pending'], // Danh sách trạng thái thanh toán
        required: true
    },
    transaction_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);
module.exports = TransactionHistory;
