import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipeDetails = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    setRecipe(data.meals[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>No recipe found.</div>;
  }

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strArea,
    strTags,
  } = recipe;

  return (
    <div className="recipe-details">
      <h1>{strMeal}</h1>
      <img src={strMealThumb} alt={strMeal} className="details-image" />
      <p>
        <strong>Category:</strong> {strCategory}
      </p>
      <p>
        <strong>Region:</strong> {strArea}
      </p>
      {strTags && (
        <p>
          <strong>Tags:</strong> {strTags.split(",").join(", ")}
        </p>
      )}
      <h2>Instructions</h2>
      <p>{strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;
