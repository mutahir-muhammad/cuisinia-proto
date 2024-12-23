import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strCategory, strMealThumb } = recipe;

  return (
    <div className="card">
      <img src={strMealThumb} alt={strMeal} className="card-image" />
      <div className="card-body">
        <span className="category">{strCategory}</span>
        <h3>{strMeal}</h3>
        <Link to={`/recipe/${idMeal}`} className="button">
          Instructions
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
