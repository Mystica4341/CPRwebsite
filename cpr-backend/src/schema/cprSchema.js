const mongoose = require('mongoose');

//this is the all in one schema file for lazy person like me
const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: false,
        Increament: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        default: "Pa$$w0rd"
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
    },
    status: {
        type: String,
        required: false,
        default: "Active"
    }
});

const User = mongoose.model('User', userSchema);

const itemSchema = new mongoose.Schema({
    itemId:{
        type: Number,
        required: false,
        Increament: true
    },
    itemName: {
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
        required: false
    },
    price: {
        type: Number,
        required: false
    }, 
    status: {
        type: String,
        required: false,
        default: "Active"
    }
});

const Item = mongoose.model('Item', itemSchema);

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: false,
        Increament: true
    },
    username: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now,
        required: false
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
        required: false,
        default: "Active"
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {User, Item, Order};