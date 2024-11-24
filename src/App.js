import React, { useState, useEffect } from "react";
import "./App.css";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; // Ensure this is in .env

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=12&client_id=${ACCESS_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch photos");

      
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 500)); 

      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>PhotoScape</h1>
        <p>Discover stunning images with infinite scrolling!</p>
      </header>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="photo">
            <img
              src={photo.urls.small}
              alt={photo.alt_description || "Unsplash Photo"}
              loading="lazy"
            />
            <p>{photo.user.name}</p>
          </div>
        ))}
      </div>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {error && <p className="error">Error: {error}</p>}
      <footer className="app-footer">
        -----harry
      </footer>
    </div>
  );
};

export default App;
