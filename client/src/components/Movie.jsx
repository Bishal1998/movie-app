import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ title, slug, thumbnailUrl }) => {
  return (
    <Link to={`/movies/${slug}`} className="w-full md:w-48 h-72 md:h-full">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full md:w-48 h-72 object-cover rounded-xl"
      />
    </Link>
  );
};

export default Movie;
