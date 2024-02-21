import React, { useEffect } from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { Movie } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { data, refetch } = useGetAllMoviesQuery();

  const { searchTerm } = useSelector((state) => state.search);

  if (!data && !searchTerm)
    return <p className="text-lg font-bold">No Movies Found</p>;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className="w-full max-w-[1500px] mx-auto py-8 flex">
      <div className="flex flex-col md:flex-row gap-12 justify-center md:justify-between">
        {searchTerm && searchTerm.length > 0
          ? searchTerm.map((movie) => {
              return <Movie key={movie._id} {...movie} />;
            })
          : data?.map((movie) => {
              return <Movie key={movie._id} {...movie} />;
            })}
      </div>
    </section>
  );
};

export default Home;
