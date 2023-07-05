import Category from "../model/category.js";

export const category = async () => {
  const category = await Category.find();
  return category;
};

export const addCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

export const update = async (id, data) => {
  const updated = await Category.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: data.name,
      },
    }
  );

  return updated;
};

export const deleteCategory = async (id) => {
  const del = await Category.findByIdAndDelete({ _id: id });
  return del;
};
