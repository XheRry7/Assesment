import Car from "../model/cars.js";

export const car = async () => {
  const car = await Car.find().populate("category");
  return car;
};

export const addCar = async (carData) => {
  const car = new Car(carData);
  await car.save();
  return car;
};

export const update = async (id, data) => {
  const updated = await Car.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        category: data.category,
        color: data.color,
        model: data.model,
        make: data.make,
        registrationNo: data.registrationNo,
      },
    }
  );

  return updated;
};

export const deleteCar = async (id) => {
  const del = await Car.findByIdAndDelete({ _id: id });
  return del;
};
