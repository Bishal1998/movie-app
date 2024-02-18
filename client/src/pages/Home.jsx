import React from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { Movie } from "../components";

const Home = () => {
  const { data } = useGetAllMoviesQuery();
  return (
    <section className="w-full max-w-[1500px] mx-auto py-8 flex">
      <div className="flex flex-col md:flex-row gap-12 justify-center md:justify-between">
        {data?.map((movie) => {
          return <Movie key={movie._id} {...movie} />;
        })}
      </div>
    </section>
  );
};

export default Home;
