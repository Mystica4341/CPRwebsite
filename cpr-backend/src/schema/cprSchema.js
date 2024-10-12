const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    item_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    items: [{
        item_name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {User, Item, Order};