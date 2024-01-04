const { data, data1 } = require("./data");
const { PrismaClient } = require("@prisma/client");
const uuid = require("uuid");

const prisma = new PrismaClient();

class CarRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createCar(carData) {
    const carId = uuid.v4().replaceAll("-", "");
    this.car = await this.prisma.product.create({
      data: {
        id: carId,
        marque: carData.marque,
        url: `/voitures/${carId}/`,
      },
    });
    return this.car;
  }
}

class ModelRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createModel(carData) {
    const modelId = uuid.v4().replaceAll("-", "");
    this.car = await this.prisma.modele.create({
      data: {
        id: modelId,
        name: carData.name,
        price: carData.price,
        description: carData.description,
        km: carData.km,
        productId: carData.productId,
        url: `/voitures/modeles/${modelId}/`,
      },
    });
  }
}

async function addCar(car) {
  const carRepo = new CarRepository(prisma);
  const carId = await carRepo.createCar(car);
}

async function addModel(car) {
  const modelRepo = new ModelRepository(prisma);
  const modelId = await modelRepo.createModel(car);
}

// data.forEach((voiture) => addCar(voiture));
// data1.forEach((voiture) => {
//   console.log(voiture);
//   addModel(voiture);
// });

module.exports = { prisma, CarRepository };
