const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    const query = {
        user: req.user.id,

    };
    if (req.query.start) {
        query.date = {
            $gte: req.query.start
        }
    }
    if (req.query.end) {
        if (!query.date) {
            query.date = {};
        }
        query.date['$lte'] = req.query.end;
    }

    if (req.query.title) {
        query.title = req.query.title;
    }
    try {
        const products = await Product
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        res.status(200).json(products);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getByID = function (req, res) {

}
module.exports.delByID = function (req, res) {

}

module.exports.editByID = function (req, res) {

}

module.exports.createProduct = async function (req, res) {
    try {
        const product = await new Product({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            mainPhoto: req.file ? req.file.path : '',
        }).save();
        res.status(201).json(product);
    } catch (e) {
        errorHandler(res, e);
    }
}