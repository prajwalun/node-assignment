const mongoose = require("mongoose");

const Customer = require("../models/customer");
const Order = require("../models/order");

exports.customers_get_all = (req, res, next) => {
    Customer.find()
      .select("customer _id")
      .populate("customer", "name")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              customer: doc.customer,

            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

exports.customers_create_customer = (req, res, next) => {
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,

      });
      customer
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Customer created",
            createdCustomer: {
                _id : result._id,
                name : result.name,
            },
          });
        })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
      .populate("product")
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order,

        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
