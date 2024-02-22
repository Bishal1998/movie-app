import React, { useEffect, useState } from "react";
import { useGetFavListQuery } from "../redux/api/favMovies";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { useSelector } from "react-redux";
import Movie from "./Movie";

const MyFav = () => {
  const { userData } = useSelector((state) => state.auth);
  const { data: favData, refetch: favRefetch } = useGetFavListQuery(
    userData?._id
  );
  const { data: movieData, refetch: movieRefetch } = useGetAllMoviesQuery();

  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    if (favData && movieData) {
      const filteredMovies = movieData?.filter((movie) =>
        favData?.favMovie?.includes(movie?._id)
      );
      setFavMovies(filteredMovies);
    }
    movieRefetch();
    favRefetch();
  }, [favData, movieData]);

  return (
    favMovies?.length > 0 &&
    userData && (
      <section className="w-full max-w-[1500px] mx-auto py-8">
        <h2 className="text-xl font-bold">My Favorite Movie</h2>
        <div className="flex flex-col md:flex-row gap-12 justify-center md:justify-start py-4">
          {favMovies?.map((movie) => {
            return <Movie key={movie?._id} {...movie} />;
          })}
        </div>
      </section>
    )
  );
};

export default MyFav;
