const express = require("express");
const logger = require("morgan");
const Recipe = require('./models/Recipe.model');


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());



// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://sharmarandrey:sharmarandrey@cluster0.zu7okjl.mongodb.net/recipes";

mongoose
	.connect(MONGODB_URI)
	.then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
	.catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
	res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post('/recipes', async (req, res) => {
	try {
		const { title, instructions, level, ingredients, image, duration, isArchived } = req.body;
		const newRecipe = new Recipe({
			title, instructions, level, ingredients, image, duration, isArchived
		});


		await newRecipe.save();

		res.status(201).json(newRecipe);
	} catch (error) {
		console.error("Error creating a new recipe", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
})



//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.status(200).json(recipes);
	} catch (error) {
		console.error("Error fetching recipes", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
