import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";
import RecipeGenerator from "./components/RecipeGenerator";
import About from "./components/AboutUs";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  const recipesPerPage = 10; // Number of recipes per page

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = `${searchApi}${query}&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.meals);
    setIsLoading(false);
  };

  const fetchAllRecipes = async () => {
    setIsLoading(true);
    const res = await fetch(`${searchApi}a`);
    const data = await res.json();
    setAllRecipes(data.meals);
    setIsLoading(false);
    setTotalPages(Math.ceil(data.meals.length / recipesPerPage)); // Calculate total pages
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    searchRecipes();
  }, [page, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1); // Reset to first page on new search
    searchRecipes();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Router>
      <div className="container">
        <Navbar />
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
                    allRecipes
                      .slice((page - 1) * recipesPerPage, page * recipesPerPage)
                      .map((recipe) => (
                        <RecipeCard key={recipe.idMeal} recipe={recipe} />
                      ))
                  ) : (
                    "Loading recipes..."
                  )}
                </div>
                <div className="pagination">
                  <button onClick={handlePrevPage} disabled={page === 1}>
                    Previous
                  </button>
                  <span>Page {page} of {totalPages}</span>
                  <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                  </button>
                </div>
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/ingredients" element={<RecipeGenerator />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
