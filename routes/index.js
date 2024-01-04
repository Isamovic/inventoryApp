var express = require("express");
var router = express.Router();
const { prisma } = require("../schema");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const car = await prisma.product.findMany({
    orderBy: [{ marque: "asc" }],
    select: {
      marque: true,
      modeles: true,
      url: true,
    },
  });
  res.render("index", { title: "Garage BELTECH", car_count: car });
});

module.exports = router;
