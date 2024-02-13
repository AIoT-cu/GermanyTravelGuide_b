const Categories = require("../models/categories");

// Controller: Get all categories
exports.getAllCategories = (req, res) => {
    res.json({ categories: categoriesData });
};

// Controller: Get details of a category by its id
exports.getCategoryDetailsById = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categoriesData.find(p => p.id === categoryId);

    if (category) {
        res.json({ category });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
};

exports.createCategory = async (
    category_name,
    category_description,
) => {
    try {
        const category = await Categories.create({
            category_name,
            category_description,
        });
        return category;
    } catch (error) {
        console.error(error);
        return {
            error
        }
    }
};

exports.deleteCategory = async (
    categoryId
) => {
    try {
        const deleted = await Categories.destroy({
            where: {
                id: parseInt(categoryId)
            }
        });
        // const deleted = await Categories.destroy(categoryId);
        return deleted;
    } catch (error) {
        console.error(error);
        return {
            error
        }
    }
};