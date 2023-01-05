const Order = require('../../src/models/order')
const Cart = require('../../src/models/cart')
const { check, validationResult } = require('express-validator');

const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: 'rzp_test_yfmR8XKRgrEz0K',
    key_secret: 'UkK4il8MUOgaWpiMhZd72HU7',
});

function orderController() {
    return {
        store(req, res) {



            // Validate request
            const { mobile_no, address, } = req.body
            if (!mobile_no || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart#orderDetails')
            }
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(err => {
                    req.flash('error', err.msg)
                })
                // res.render('register',{messages:req.flash()})
                return res.redirect('/cart#orderDetails')
            }

            const order = new Order({
                customerId: req.user._id,
                cart: req.session.cart,
                mobile_no,
                address,
            })

            order.save().then(result => {
                req.flash('success', 'Order Placed Successfully');
                delete req.session.cart;
                return res.redirect('/allOrder')
            }).catch(err => {
                req.flash('error', 'Something went Wrong')
                return res.redirect('/cart')
            });
        },

        // var instance = new Razorpay({ key_id: 'rzp_test_yfmR8XKRgrEz0K', key_secret: 'UkK4il8MUOgaWpiMhZd72HU7' })

                // instance.orders.create(options, function (err, order) {
                //     console.log(order);
                // });
        

                // let options = {
                //     amount: req.session.cart.totalPrice * 100,  // amount in the smallest currency unit
                //     currency: "INR",
                //     key: "rzp_test_yfmR8XKRgrEz0K", // Enter the Key ID generated from the Dashboard
                //     amount: req.session.cart.totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                //     "currency": "INR",
                //     "name": "Acme Corp",
                //     "description": "Test Transaction",
                //     "image": "https://example.com/your_logo",
                //     // "order_id": "order._id", //This is a sample Order ID. Pass the `id` obtained in the previous step
                //     "handler": function (response) {
                //         alert(response.razorpay_payment_id);
                //         alert(response.razorpay_order_id);
                //         alert(response.razorpay_signature)
                //     },
                //     "prefill": {
                //         "name": "Gaurav Kumar",
                //         "email": "gaurav.kumar@example.com",
                //         "contact": "9999999999"
                //     },
                //     "notes": {
                //         "address": "Razorpay Corporate Office"
                //     },
                //     "theme": {
                //         "color": "#3399cc"
                //     }
                // };

                // var rzp1 = new Razorpay(options);
                // rzp1.on('payment.failed', function (response) {
                //     alert(response.error.code);
                //     alert(response.error.description);
                //     alert(response.error.source);
                //     alert(response.error.step);
                //     alert(response.error.reason);
                //     alert(response.error.metadata.order_id);
                //     alert(response.error.metadata.payment_id);
                // });

                // document.getElementById('rzp-button1').onclick = function (e) {
                //     rzp1.open();
                //     e.preventDefault();
                // }

        async index(req, res) {
            Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } },
                function (err, orders) {
                    if (err) {
                        return res.write('Error!');
                    }
                    var carts;
                    orders.forEach(function (order) {
                        carts = new Cart(order.cart);
                        order.items = carts.generateArray();
                    })
                    res.render('allOrder', { orders: orders });
                })
        },

    }

}

module.exports = orderController