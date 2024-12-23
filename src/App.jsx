import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";
import IngredientsBasedRecipeList from "./components/RecipeGenerator";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.meals);
    setIsLoading(false);
  };

  const fetchAllRecipes = async () => {
    const res = await fetch(searchApi + "a");
    const data = await res.json();
    setAllRecipes(data.meals);
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <Router>
      <div className="container">
        <h1>Cuisinia</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  isLoading={isLoading}
                  query={query}
                  setQuery={setQuery}
                  handleSubmit={handleSubmit}
                />
                <div className="recipes">
                  <h2>All Recipes</h2>
                  {allRecipes && allRecipes.length > 0 ? (
                    allRecipes.map((recipe) => (
                      <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))
                  ) : (
                    "Loading recipes..."
                  )}
                </div>
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/ingredients" element={<IngredientsBasedRecipeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
