import React, { useEffect } from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { Movie, MyFav } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { data, refetch } = useGetAllMoviesQuery();

  const { searchTerm } = useSelector((state) => state.search);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data && !searchTerm) {
    return (
      <p className="text-lg font-bold w-full max-w-[1500px] mx-auto">
        No Movies Found
      </p>
    );
  }

  return (
    <section className="w-full max-w-[1500px] mx-auto py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 justify-center  md:justify-start">
        {searchTerm && searchTerm.length > 0
          ? searchTerm.map((movie) => {
              return <Movie key={movie._id} {...movie} />;
            })
          : data?.map((movie) => {
              return <Movie key={movie._id} {...movie} />;
            })}
      </div>
      <MyFav />
    </section>
  );
};

export default Home;
