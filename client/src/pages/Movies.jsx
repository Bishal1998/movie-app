import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetAllMoviesQuery,
  useDeleteMovieMutation,
} from "../redux/api/movie";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Movie } from "../components";

const Movies = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAllMoviesQuery();
  const [movie, setMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const [similarMovie, setSimilarMovie] = useState(null);

  const [deleteMovie, { isLoading: deleteLoading }] = useDeleteMovieMutation();

  useEffect(() => {
    if (!isLoading && data) {
      const singleMovie = data?.find((movie) => movie.slug === slug);
      setMovie(singleMovie);
    }
  }, [data, slug]);

  useEffect(() => {
    if (!isLoading && data) {
      const similarMovie = data?.filter((movie) => movie.slug !== slug);

      setSimilarMovie(similarMovie);
    }
  }, [data, slug]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleMovieDelete = async () => {
    try {
      await deleteMovie(movie?._id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
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
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[40px] py-4 capitalize">
          {movie?.title}
        </h2>
        {userData?.isAdmin && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link
              to={`/update/${movie?._id}`}
              className="text-green-500 text-xl font-medium cursor-pointer"
            >
              Edit
            </Link>
            <p
              className="text-red-600 text-xl font-medium cursor-pointer"
              onClick={() => setDeleteActive(true)}
            >
              Delete
            </p>
          </div>
        )}
      </div>
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

      {deleteActive && (
        <div>
          <div className="absolute top-0 left-0 bg-[#37C6F3] opacity-70 h-screen w-full"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <div className="rounded-xl px-6 md:px-16 py-4 md:py-8 bg-white">
              <p className="text-base md:text-2xl font-semibold">
                Are you sure you want to delete?
              </p>
              <div className="flex items-center justify-between pt-6">
                <button onClick={() => setDeleteActive(false)}>Cancel</button>
                <button
                  className="bg-red-600 rounded-lg py-2 px-4 md:py-4 md:px-8  text-white text-lg"
                  onClick={handleMovieDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold pt-8 pb-4">Similar Movie</h2>
        <div className="flex flex-wrap gap-10">
          {similarMovie?.map((movie) => {
            return <Movie key={movie._id} {...movie} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Movies;
