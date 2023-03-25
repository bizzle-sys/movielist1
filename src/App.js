import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { Movielist } from "./components/Movielist";
import { Movielistheading } from "./components/Movielistheading";
import { Searchbox } from "./components/Searchbox";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchvalue, setSearchValue] = useState("");
  const getMovierequest = async (searchvalue) => {
    const url = `http://www.omdbapi.com/?s=${searchvalue}&apikey=33237d10`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovierequest(searchvalue);
  }, [searchvalue]);
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Movielistheading heading="Movies" />
        <Searchbox searchvalue={searchvalue} setSearchValue={setSearchValue} />
      </div>

      <div className="row ">
        <Movielist movies={movies} />
      </div>
    </div>
  );
}

export default App;
