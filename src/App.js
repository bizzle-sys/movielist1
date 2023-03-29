import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { Movielist } from "./components/Movielist";
import { Movielistheading } from "./components/Movielistheading";
import { Searchbox } from "./components/Searchbox";
import { AddFavourites } from "./components/AddFavourites";
import { RemoveFavourites } from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchvalue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const getMovierequest = async (searchvalue) => {
    const url = `http://www.omdbapi.com/?s=${searchvalue}&apikey=33237d10`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  const addfavouriteMovie = (movie) => {
    const newFavList = [...favourites, movie];
    setFavourites(newFavList);
    saveToLocalStorage(newFavList);
  };
  const removefavouriteMovie = (movie) => {
    const newFavList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavList);
    saveToLocalStorage(newFavList);
  };
  useEffect(() => {
    getMovierequest(searchvalue);
  }, [searchvalue]);
  useEffect(() => {
    const movieFav = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFav);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Movielistheading heading="Movies" />
        <Searchbox searchvalue={searchvalue} setSearchValue={setSearchValue} />
      </div>

      <div className="row ">
        <Movielist
          movies={movies}
          handleFavourites={addfavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Movielistheading heading="Favourites" />
      </div>
      <div className="row ">
        <Movielist
          movies={favourites}
          handleFavourites={removefavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
