const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");
const { autenticarToken } = require("../services/authTokenServices");

router.get("/", autenticarToken, DashboardController.getDashboard);


module.exports = router;
