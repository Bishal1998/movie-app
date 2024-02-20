import React, { useEffect, useState } from "react";
import { Input } from "../components";
import {
  useUpdateMovieMutation,
  useGetSingleMovieQuery,
} from "../redux/api/movie";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleMovieQuery(id);
  const [updateMovie, { isLoading: updateLoading }] = useUpdateMovieMutation();

  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    genre: "",
    duration: "",
  });

  useEffect(() => {
    if (!isLoading && data) {
      setMovieData({
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        thumbnailUrl: data.thumbnailUrl,
        genre: data.genre,
        duration: data.duration,
      });
    }
  }, [data, isLoading]);

  const navigate = useNavigate();

  const handleMovieData = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const submitMovieData = async (e) => {
    e.preventDefault();

    try {
      await updateMovie({ id: id, data: movieData }).unwrap();
      toast.success("Movie updated successfully");
      navigate(`/movies/${data?.slug}`);
    } catch (error) {
      toast.error("Couldn't create a movie");
    }
  };

  return (
    <section className="w-full max-w-[1500px] mx-auto py-4">
      <h2 className="text-center text-4xl font-semibold py-8">
        Update a Movie
      </h2>
      <form
        className="flex flex-col gap-6 items-center justify-center"
        onSubmit={submitMovieData}
      >
        <Input
          placeholder="Title"
          type="text"
          name="title"
          value={movieData.title}
          onChange={handleMovieData}
        />
        <Input
          placeholder="Description"
          type="text"
          name="description"
          value={movieData.description}
          onChange={handleMovieData}
        />
        <Input
          placeholder="Video Url"
          type="text"
          name="videoUrl"
          value={movieData.videoUrl}
          onChange={handleMovieData}
        />
        <Input
          placeholder="Thumbnail Url"
          type="text"
          name="thumbnailUrl"
          value={movieData.thumbnailUrl}
          onChange={handleMovieData}
        />
        <Input
          placeholder="Genre"
          type="text"
          name="genre"
          value={movieData.genre}
          onChange={handleMovieData}
        />
        <Input
          placeholder="Duration"
          type="text"
          name="duration"
          value={movieData.duration}
          onChange={handleMovieData}
        />
        <button
          className="outline-none text-xl px-5 rounded-lg w-screen sm:w-96 h-14 bg-[#37C6F3] text-white"
          disabled={updateLoading}
        >
          {updateLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
};

export default UpdateMovie;
