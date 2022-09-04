const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    // id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    //     required: true
    // },
    text: {
        type: String,
        max: 50
    },
    category: {
        type: String,
    },
    storeName: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        min: 0.0
    },
    details: {
        type: String
    }
});

module.exports = mongoose.model('expense', ExpenseSchema);

