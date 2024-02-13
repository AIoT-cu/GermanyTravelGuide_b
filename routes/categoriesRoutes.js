const express = require('express');
const router = express.Router();

// Import the controller
const categoriesController = require('../controllers/categoriesController');

// Define routes using the controllers
router.get('/categories', categoriesController.getAllCategories);
router.get('/categories/:id', categoriesController.getCategoryDetailsById);
router.post('/categories/create', async (req, res) => {
    const category_name = req.body.category_name;
    const category_description = req.body.category_description;

    const category = await categoriesController.createCategory(
        category_name,
        category_description,)

    if (category.error) {
        res.status(500).json({ message: category.error });
    } else {
        res.json(category);
    }
});

router.delete('/categories/:id', async (req, res) => {
    const categoryID = req.params.id;

    const deleted = await categoriesController.deleteCategory(categoryID)

    if (deleted.error) {
        res.status(500).json({ message: deleted.error });
    } else if (deleted === 0) {
        res.status(500).json({ message: `Category with id ${categoryID} does not exist` });
    } {
        res.json({ categoryID, deleted });
    }
});

module.exports = router;