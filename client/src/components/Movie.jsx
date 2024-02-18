import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ title, slug, thumbnailUrl }) => {
  return (
    <Link to={`/movies/${slug}`}>
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-48 h-72 object-cover rounded-xl"
      />
    </Link>
  );
};

export default Movie;
