const carService = require("../services/carService");

const getUser = async (req, res) => {
  try {
    const getUser = await carService.getUser();
    res.send({ status: "OK", data: getUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllCars = async (req, res) => {
  try {
    const getAllCars = await carService.getAllCars();
    res.send({ status: "OK", data: getAllCars });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getCar = async (req, res) => {
  const {
    params: { carId },
  } = req;
  if (!carId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':carID' can not be empty" },
    });
  }
  try {
    const car = await carService.getCar(carId);
    res.send({ status: "OK", data: car });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createCar = async (req, res) => {
  const body = req.body;
  console.log("hola", body);
  if (
    !body.name ||
    !body.year ||
    !body.type ||
    !body.specifications ||
    !body.image ||
    !body.brand
  ) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "Faltan parametros de entrada",
      },
    });
  }
  const newCar = {
    name: body.name,
    year: body.year,
    type: body.type,
    specifications: body.specifications,
    image: body.image,
    brand: body.brand
  };
  try {
    const createdCar = await carService.createCar(newCar);
    res.status(201).send({ status: "OK", data: createdCar });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateCar = async (req, res) => {
  const {
    body,
    params: { carId },
  } = req;
  if (!carId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':carId' can not be empty" },
    });
  }
  try {
    const updatedCar = await carService.updateCar(carId, body);
    res.send({ status: "OK", data: updatedCar });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteCar = async (req, res) => {
  const {
    params: { carId },
  } = req;
  if (!carId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':carId' can not be empty" },
    });
  }
  try {
    await carService.deleteCar(carId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  getUser
};