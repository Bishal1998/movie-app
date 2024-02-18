import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { FaPlay } from "react-icons/fa";

const Movies = () => {
  const { slug } = useParams();

  const { data, isLoading } = useGetAllMoviesQuery();
  const [movie, setMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const singleMovie = data?.find((movie) => movie.slug === slug);

    setMovie(singleMovie);
  }, [data]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isLoading)
    return (
      <p className="w-full max-w-7xl mx-auto text-xl font-bold">Loading....</p>
    );

  if (!movie)
    return (
      <p className="w-full max-w-7xl mx-auto text-xl font-bold">
        No Movie Found
      </p>
    );

  return (
    <section className="w-full max-w-[1500px] mx-auto py-4">
      <h2 className="font-bold text-[40px] py-4 capitalize">{movie?.title}</h2>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
        <div className="w-full  lg:w-1/2">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <img
              src={movie?.thumbnailUrl}
              alt={movie?.title}
              className="w-full lg:w-48 h-72 object-cover rounded-xl"
            />
            <div className="flex flex-col gap-4">
              <p className="font-medium text-lg border border-black w-fit rounded-xl px-2">
                {movie?.genre}
              </p>
              <p className="text-lg">{movie?.description}</p>
              <p className="text-lg font-medium">Duration: {movie?.duration}</p>
            </div>
          </div>
        </div>
        {isPlaying ? (
          <div className="w-full lg:w-1/2">
            <video
              autoPlay
              controls
              src={movie?.videoUrl}
              className="w-full rounded-xl"
            ></video>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 relative" onClick={handlePlay}>
            <img
              src={movie?.thumbnailUrl}
              alt={movie?.title}
              className="rounded-xl hover:opacity-90 transform duration-150 cursor-pointer"
            />
            <FaPlay
              size={50}
              className="absolute left-[45%] top-[45%] shadow-xl cursor-pointer"
              color="#37C6F3"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Movies;
