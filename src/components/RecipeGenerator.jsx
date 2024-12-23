import React, { useState } from "react";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipesByIngredients = async () => {
    if (!ingredients) return;
    setIsLoading(true);
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipesByIngredients();
  };

  return (
    <div className="ingredients-recipe-list">
      <h2>Find Recipes by Ingredients</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="button">
          Search Recipes
        </button>
      </form>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="card">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="card-image"
              />
              <div className="card-body">
                <h3>{recipe.strMeal}</h3>
                <a
                  href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found. Try different ingredients.</p>
      )}
    </div>
  );
};

export default RecipeGenerator;
