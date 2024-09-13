const ensureAuthToken = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthToken, (req, res) => {
  console.log("setted", req.user);
  res.json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "laptop",
      price: 100000,
    },
    {
      name: "mouse",
      price: 300,
    },
    {
      name: "ipad",
      price: 90000,
    },
  ]);
});

module.exports = router;
