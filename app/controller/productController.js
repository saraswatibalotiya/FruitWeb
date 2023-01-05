const Menproduct = require('../../src/models/menProduct')
var category1;

function productController() {
    return {
        async product(req, res) {
            // console.log(products)
            // console.log(req.query.selectpicker);
            if(req.query.selectpicker == 'Fruits'){
                const products = await Menproduct.find({ category: ['Fruits'] })
                return res.render('product', { products: products })
            }

            else if(req.query.selectpicker == 'Vegetables'){
                const products = await Menproduct.find({ category: ['Vegetables'] })
                return res.render('product', { products: products })
            }
            else if(req.query.selectpicker == 'sprouts'){
                const products = await Menproduct.find({ category: ['sprouts'] })
                return res.render('product', { products: products })
            }
            else if(req.query.selectpicker == 'seasonal'){
                const products = await Menproduct.find({ category: ['seasonal'] })
                return res.render('product', { products: products })
            }
            else if(req.query.selectpicker == 'all'){
                const products = await Menproduct.find()
                return res.render('product', { products: products })
            }
            else{
                const products = await Menproduct.find({ category: ['Fruits'] })
                // const title = 'All'
                return res.render('product', { products: products })
            }


        },

        async categoryProduct(req, res) {
            //     // const { select } = req.body;
            //     var category ;
            //     if (category = document.getElementsByClassName('women')) {

            //         const products = await Menproduct.find({ category: ['Womens'] })
            //         console.log(products)
            //         return res.render('product', { products: products })


        }


        // }
    }
}

module.exports = productController