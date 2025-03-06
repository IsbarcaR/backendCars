const carService = require("../services/carService");

const getUser = (req, res) => {
  try {
    const getUser = carService.getUser();
    res.send({ status: "OK", data: getUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllCars = (req, res) => {
  try {
    const getAllCars = carService.getAllCars();
    res.send({ status: "OK", data: getAllCars });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getCar = (req, res) => {
  const {
    params: { carId },
  } = req;
  if (!carId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':carID' can not be empty" },
    });
  }
  try {
    const car = carService.getCar(carId);
    res.send({ status: "Ok", data: car });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createCar = (req, res) => {
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
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Faltan parametros de entrada",
      },
    });
    return;
  }
  const newCar = {
    name: body.name,
    year: body.year,
    type: body.type,
    specifications: body.specifications,
    image: body.image,
    brand: body.brand
  };
  const createdCar = carService.createCar(newCar);
  res.status(201).send({ status: "OK", data: createdCar });
};

const updateCar = (req, res) => {
  const {
    body,
    params: { carId },
  } = req;
  if (!carId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':carId' can not be empty" },
    });
  }
  try {
    const updatedCar = carService.updateCar(carId, body);
    res.send({ status: "OK", data: updatedCar });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteCar = (req, res) => {
  const {
    params: { carId },
  } = req;
  if (!carId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':carId' can not be empty" },
    });
  }
  try {
    carService.deleteCar(carId);
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
