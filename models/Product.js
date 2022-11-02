const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPhoto: {
        type: String,
        default: ''
    },
    currency: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('products', productSchema);