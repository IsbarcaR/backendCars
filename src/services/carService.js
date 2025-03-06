const Cars = require("../database/cars");
const { v4: uuid } = require("uuid");

const getUser =() => {
  try {
    const user = Cars.getUser();
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllCars = () => {
  try {
    const allCars = Cars.getAllCars();
    return allCars;
  } catch (error) {
    throw error;
  }
};

const getCar = (carId) => {
  try {
    const car = Cars.getCar(carId);
    return car;
  } catch (error) {
    throw error;
  }
};

const createCar = (newCar) => {
  const carToInsert = {
    ...newCar, //crear copia del objeto
    id: uuid(),
    
  };
  try {
    const createdCar = Cars.createCar(carToInsert);
    return createdCar;
  } catch (error) {
    throw error;
  }
};

const updateCar = (carId, changes) => {
  try {
    const updatedCar = Cars.updateCar(carId, changes);
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

const deleteCar = (carId) => {
  try {
    Cars.deleteCar(carId);
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
