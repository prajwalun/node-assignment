const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/customers');

router.get("/", CustomersController.customers_get_all);

router.get("/:customerId", CustomersController.orders_get_order);

router.post("/", CustomersController.customers_create_customer);







module.exports = router;