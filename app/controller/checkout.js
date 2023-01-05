var razorpay = require('razorpay');

// function checkout(){

//     var options = {
//         "key": "rzp_test_2eJE3rP3gEWqze", // Enter the Key ID generated from the Dashboard
//         "amount": 50*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         "currency": "INR",
//         "name": "Modi's Dairy",
//         "description": "Test Transaction",
//         "image": "/images/modiLogo3.png",
//         //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "handler": function (response){
//             savetoDB(response);
           
//         },
//         "prefill": {
//             "name": "Gaurav Kumar",
//             "email": "gaurav.kumar@example.com",
//             "contact": "9999999999"
//         },
//         "notes": {
//             "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//             "color": "#F37254"
//         }
//     };

//     var rzp1 = new Razorpay(options);
//     rzp1.open(); 
// }

function savetoDB(response){
    console.log(response);
    // var payRef = firebase.database().ref('payment');

    /*payRef.child('123456789').set({

    }); */

}