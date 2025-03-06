const express= require("express");
const carController=require('../../controllers/carController');
const router= express.Router();


router.get("/",carController.getAllCars);

router.get("/user",carController.getUser)

router.get("/:carId",carController.getCar)

router.post("/",carController.createCar)

router.patch("/:carId",carController.updateCar)

router.delete("/:carId",carController.deleteCar)



module.exports= router;