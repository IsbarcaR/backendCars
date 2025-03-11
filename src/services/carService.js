const Cars = require("../database/cars");
const { v4: uuid } = require("uuid");

const getUser = async () => {
  try {
    const user = await Cars.getUser();
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllCars = async () => {
  try {
    const allCars = await Cars.getAllCars();
    return allCars;
  } catch (error) {
    throw error;
  }
};

const getCar = async (carId) => {
  try {
    const car = await Cars.getCar(carId);
    return car;
  } catch (error) {
    throw error;
  }
};

const createCar = async (newCar) => {
  const carToInsert = {
    ...newCar, 
    id: uuid(),
  };
  try {
    const createdCar = await Cars.createCar(carToInsert);
    return createdCar;
  } catch (error) {
    throw error;
  }
};

const updateCar = async (carId, changes) => {
  try {
    const updatedCar = await Cars.updateCar(carId, changes);
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

const deleteCar = async (carId) => {
  try {
    await Cars.deleteCar(carId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCars,
  getCar,
  updateCar,
  createCar,
  deleteCar,
  getUser
};