const DB = require("./db.json");
const fs = require("fs");
const path = require("path");
const DB_PATH = path.join(__dirname, "db.json");

const saveToDatabase = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

 const getUser= () => {
  try {
    return DB.user;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getAllCars = () => {
  try {
    return DB.cars;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
const createCar = (newCar) => {
  const isAlreadyAdded =
    DB.cars.findIndex((car) => car.name === newCar.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Car with the name '${newCar.name}' already exists`,
    };
  }
  try {
    DB.cars.push(newCar);

    fs.writeFileSync(DB_PATH, JSON.stringify(DB, null, 2), "utf-8");

    return newCar;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};
const getCar = (carId) => {
  try {
    const car = DB.cars.find((car) => ((car.id === carId ||car.name===carId)));
    if (!car) {
      throw {
        status: 400,
        message: `Cant find workout with the id '${carId}'`,
      };
    }
    return car;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateCar = (carId, changes) => {
  try {
   /*  const isAlreadyAdded =
      DB.cars.findIndex((car) => car.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Car with the name '${changes.name}' already exits`,
      };
    } */

    const indexForUpdate = DB.cars.findIndex((car) => car.id === carId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Cant find any car with the id '${carId}'`,
      };
    }

    const updatedCar = {
      ...DB.cars[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.cars[indexForUpdate] = updatedCar;
    saveToDatabase(DB);
    return updatedCar;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteCar = (carId) => {
  try {
    const indexForDeletion = DB.cars.findIndex((car) => car.id === carId);
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Cant find car with the id '${carId}'`,
      };
    }
    DB.cars.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
  getUser
};
