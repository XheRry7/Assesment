import { car, addCar, update, deleteCar } from "../services/carsService.js";
import { CarValidator } from "../validation/carValidation.js";

export const getCar = async (req, res) => {
  try {
    const carData = await car();
    return res.send({ statusCode: 200, data: carData });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const createCar = async (req, res) => {
  const carData = req.body;
  const { error } = CarValidator(carData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const car = await addCar(carData);
    return res.send({ statusCode: 200, data: car });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const carUpdate = async (req, res) => {
  const id = req.query.id;
  const data = req.body;
  const { error } = CarValidator(data);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (!id || !data) {
    return res.send({
      message: "ID is required in parameters",
      statusCode: 500,
    });
  }
  try {
    await update(id, data);
    return res.send({ message: "data updated successfully", statusCode: 200 });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const delCar = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.send({
      message: "ID is required in parameters",
      statusCode: 500,
    });
  }
  try {
    await deleteCar(id);
    return res.send({ message: "car deleted successfully", statsCode: 200 });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};
