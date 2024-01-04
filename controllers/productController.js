const { prisma, CarRepository } = require("../schema");
const { body, validationResult } = require("express-validator");

async function displayProduct(req, res, next) {
  const listModel = await prisma.product.findFirst({
    where: {
      id: req.params.id,
    },
    select: {
      marque: true,
      modeles: true,
    },
  });
  res.render("model_list", {
    title: `Liste des véhicules ${listModel.marque} en vente`,
    listModel,
  });
}

async function createMarqueForm_get(req, res, next) {
  res.render("marque_form");
}

const createMarqueForm_post = [
  body("name", "Veuillez saisir au moins 3 caractères")
    .trim()
    .isLength({ min: 3 }),

  async function (req, res, next) {
    const errors = validationResult(req);
    const marque = { marque: req.body.name };
    console.log();
    if (!errors.isEmpty()) {
      res.render("marque_form", {
        title: "Create Genre",
        marque: marque,
        errors: errors.array(),
      });
      return;
    } else {
      const carClass = new CarRepository(prisma);
      const newMarque = await carClass.createCar(marque);
      const display = await prisma.product.findFirst({
        where: {
          id: newMarque.id,
        },
        include: { modeles: true },
      });
      console.log(display);
      res.redirect(display.url);
    }
  },
];

module.exports = {
  displayProduct,
  createMarqueForm_get,
  createMarqueForm_post,
};
