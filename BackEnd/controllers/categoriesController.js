import {
  category,
  addCategory,
  update,
  deleteCategory,
} from "../services/categoryService.js";
import { CategoryValidator } from "../validation/categoryValidation.js";

export const getCategory = async (req, res) => {
  try {
    const categoryData = await category();
    return res.send({ statusCode: 200, data: categoryData });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const createCategory = async (req, res) => {
  const categoryData = req.body;
  const { error } = CategoryValidator(categoryData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const category = await addCategory(categoryData);
    return res.send({ statusCode: 200, data: category });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const categoryUpdate = async (req, res) => {
  const id = req.query.id;
  const data = req.body;
  const { error } = CategoryValidator(data);
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

export const delCategory = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.send({
      message: "ID is required in parameters",
      statusCode: 500,
    });
  }
  try {
    await deleteCategory(id);
    return res.send({
      message: "category deleted successfully",
      statsCode: 200,
    });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};
