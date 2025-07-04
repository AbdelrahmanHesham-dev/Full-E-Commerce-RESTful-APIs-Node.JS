const express = require('express');

// Importing necessary modules and validators
const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../services/categoryServices');

const subcategoriesRoute = require('./subCategoryRoute');


const router = express.Router();

router.use('/:categoryId/subcategories', subcategoriesRoute);

router
    .route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);
router
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;