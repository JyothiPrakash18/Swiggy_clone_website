const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    type: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 0,
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

let schema = mongoose.model("payments", paymentSchema);
module.exports = schema;