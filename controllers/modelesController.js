const { prisma } = require("../schema");

async function displayAllModels(req, res, next) {
  const listModel = await prisma.modele.findMany();

  res.render("modelAll", {
    title: `Tous les véhicules disponibles à la vente`,
    listModel,
  });
}

async function displayOneModel(req, res, next) {
  const modelDetail = await prisma.modele.findFirst({
    where: { id: req.params.id },
    include: { Product: true },
  });
  res.render("model_detail", {
    car: modelDetail,
  });
}

module.exports = { displayAllModels, displayOneModel };
