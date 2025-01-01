import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CssComponents/Movies.css";
import { toast, ToastContainer } from "react-toastify";

export const Movies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/7df2781a-757d-4374-9aca-5a7b4563e601"
        );
        const moviesData = response.data.map((movie) => ({
          ...movie,
          seats: 1,
        }));
        setData(moviesData);

        if (!localStorage.getItem("moviesData")) {
          localStorage.setItem("moviesData", JSON.stringify(moviesData));
        } else {
          const storedMovies = JSON.parse(localStorage.getItem("moviesData"));

          moviesData.forEach((movie) => {
            if (!storedMovies.some((item) => item.id === movie.id)) {
              storedMovies.push(movie);
            }
          });
          localStorage.setItem("moviesData", JSON.stringify(storedMovies));
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleIncrementSeats = (e) => {
    const movieId = e.target.id;
    const updatedMovies = data.map((movie) =>
      movie.id === Number(movieId)
        ? { ...movie, seats: movie.seats + 1 }
        : movie
    );
    setData(updatedMovies);
    localStorage.setItem("moviesData", JSON.stringify(updatedMovies));
    toast.success("seats incremented successfully!");
  };

  const handleDecrementSeats = (e) => {
    const movieId = e.target.id;
    const updatedMovies = data.map((movie) =>
      movie.id === Number(movieId) && movie.seats > 1
        ? { ...movie, seats: movie.seats - 1 }
        : movie
    );
    
    const movie = updatedMovies.find((movie) => movie.id === Number(movieId));
    
    if (movie) {
      if (movie.seats > 1) {
        toast.success("Seats updated successfully");
      } else {
        toast.error("Minimum seats should be 1");
      }
    }
  
    setData(updatedMovies);
    localStorage.setItem("moviesData", JSON.stringify(updatedMovies));
  };
  

  const handleBooking = (e) => {
    const currentMovie = data.find((movie) => movie.id === Number(e.target.id));
    if (!localStorage.getItem("bookingData")) {
      localStorage.setItem("bookingData", JSON.stringify([]));
    }
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));

    bookingData.push(currentMovie);
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    toast.success("booking success");
  };

  const sortMovies = (order) => {
    const sortedMovies = [...data].sort((a, b) => {
      if (order === 'rating') {
        return b.rating - a.rating;
      } else if (order === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
    setData(sortedMovies);
  };

  const handleSortByRating = () => {
    setSortOrder('rating');
    sortMovies('rating');
  };

  const handleSortByPrice = () => {
    setSortOrder('price');
    sortMovies('price');
  };

  return (
    <div>
      {loading ? (
        <p>loading.......</p>
      ) : (
        <div>
          <div className="sort-buttons">
            <button onClick={handleSortByRating}>Sort by Rating</button>
            <br />
            <br />
            <button onClick={handleSortByPrice}>Sort by Price</button>
          </div>
          <div className="cards-box">
            {data.map((movie) => (
              <div className="card" key={movie.id}>
                <img src={movie.img} alt={movie.movieName}></img>
                <h3>Movie :{movie.movieName}</h3>
                <h4>Rating:{movie.rating}</h4>
                <h4>Price :$ {movie.price}</h4>
                <button id={movie.id} onClick={handleBooking} className="booking">
                  Book the movie
                </button>
                <div className="seats-container">
                  <button id={movie.id} onClick={handleIncrementSeats}>
                    +
                  </button>
                  <h4>{movie.seats}</h4>
                  <button id={movie.id} onClick={handleDecrementSeats}>
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
