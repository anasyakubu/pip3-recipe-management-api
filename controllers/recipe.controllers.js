const Recipe = require("../models/recipe.modal");

// List Recipe
const recipeList = (req, res) => {
  Recipe.find({})
    .then((recipe) => res.status(200).json({ status: 200, data: recipe }))
    .catch((err) => res.status(400).json(err));
};

// Fetch Recipe [One]
const getRecipe = (req, res) => {
  const id = req.params.id;
  Recipe.find({ _id: id })
    .then((recipe) => res.status(200).json({ status: 200, data: recipe }))
    .catch((err) => res.status(400).json(err));
};

//Add Recipe
const addRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      categories,
      tags,
      userID,
    } = req.body;
    // check if details was entered
    if (!title) {
      return res.status(400).json({ status: 400, error: "Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: 400, error: "Descriptionis required" });
    }
    if (!ingredients) {
      return res
        .status(400)
        .json({ status: 400, error: "Ingredients is required" });
    }
    if (!instructions) {
      return res
        .status(400)
        .json({ status: 400, error: "Instructions is required" });
    }
    if (!categories) {
      return res
        .status(400)
        .json({ status: 400, error: "Categories is required" });
    }

    if (!tags) {
      return res.status(400).json({ status: 400, error: "Tags is required" });
    }

    if (!userID) {
      return res.status(400).json({ status: 400, error: "userID is required" });
    }
    // check organisation exist
    const exist = await Recipe.findOne({ title });
    if (exist) {
      return res
        .status(400)
        .json({ status: 400, error: "Recipe Already Exist" });
    }

    // create Recipe in db
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      categories,
      tags,
      userID,
    });
    // return res.status(201);
    return res.status(201).send(recipe);
  } catch (error) {
    console.log(error);
  }
};

// update Recipe
const updateRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, description, ingredients, instructions, categories, tags } =
      req.body;
    // check if details was entered
    if (!title) {
      return res.status(400).json({ status: 400, error: "Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: 400, error: "Descriptionis required" });
    }
    if (!ingredients) {
      return res
        .status(400)
        .json({ status: 400, error: "Ingredients is required" });
    }
    if (!instructions) {
      return res
        .status(400)
        .json({ status: 400, error: "Instructions is required" });
    }
    if (!categories) {
      return res
        .status(400)
        .json({ status: 400, error: "Categories is required" });
    }

    if (!tags) {
      return res.status(400).json({ status: 400, error: "Tags is required" });
    }

    const update = await Recipe.findByIdAndUpdate(
      { _id: id },
      { title, description, ingredients, instructions, categories, tags }
    )
      .then((update) => res.status(200).json(update))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

// delete Recipe
const deleteRecipe = (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete({ _id: id })
    .then((deleteData) => res.status(200).json(deleteData))
    .catch((err) => console.log(err));
};

module.exports = {
  addRecipe,
  recipeList,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
