const Category = require('../models/CategoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');


// @route GET /api/v1/categories
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, page, data: categories });

})

// @route GET /api/v1/categories/:id
exports.getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ data: category });
})

// @route POST /api/v1/categories
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const category = await Category.create({
        name: name,
        slug: slugify(name),
    });
    res.status(201).json({
        data: category,
    });
})

// @route PUT /api/v1/categories/:id
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(id, {
        name: name,
        slug: slugify(name),
    }, { new: true });

    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ data: category });
})

// @route DELETE /api/v1/categories/:id
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(204).json({ message: 'Category deleted successfully' });
})