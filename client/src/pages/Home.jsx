import React from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { Movie } from "../components";

const Home = () => {
  const { data } = useGetAllMoviesQuery();
  return (
    <section className="w-full max-w-[1500px] mx-auto py-8">
      <div className="w-48 h-72">
        {data?.map((movie) => {
          return <Movie key={movie._id} {...movie} />;
        })}
      </div>
    </section>
  );
};

export default Home;
