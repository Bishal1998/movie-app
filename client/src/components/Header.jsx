import { useState, useRef, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogoutApiMutation } from "../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../redux/features/auth/authSlice";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { search } from "../redux/features/search/searchSlice";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [logoutApi, { isLoading: logOutLoading }] = useLogoutApiMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading: searchLoading, refetch } = useGetAllMoviesQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const clickRef = useRef(null);

  const handleClickRef = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickRef);
  }, [isActive]);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logOut());
      toast.success("User logged out Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchedMovie = data?.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.duration.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(search(searchedMovie));
  }, [searchTerm]);

  return (
    <header className="w-full max-w-[1500px] mx-auto py-4 flex justify-between items-center gap-4">
      <Link to={"/"} className="flex flex-col text-2xl font-bold">
        <p>The</p>
        <p>Movie</p>
        <p>Tracker</p>
      </Link>
      <div>
        <input
          type="text"
          placeholder="🔍 Search a movie or a series"
          className="bg-[#D9D9D9] outline-none rounded-3xl px-8 w-full md:w-[630px] py-4"
          value={searchTerm}
          onChange={(e) => handleSearchTerm(e)}
        />
      </div>
      {userData ? (
        <div
          className="cursor-pointer hover:text-gray-600 relative"
          onClick={() => setIsActive(!isActive)}
          ref={clickRef}
        >
          <FaUserAlt size={25} />
        </div>
      ) : (
        <Link to={"/login"} className="bg-[#37C6F3] text-white p-4 rounded-xl">
          Login
        </Link>
      )}

      {isActive && (
        <div className="w-40 h-20 border border-[#D9D9D9] absolute top-20 right-20 flex flex-col items-center justify-center text-base">
          <Link to={"/profile"}>Profile</Link>
          {userData.isAdmin && <Link to={"/create-movie"}>Create a movie</Link>}
          {userData ? (
            <p onClick={handleLogout} className="cursor-pointer">
              Logout
            </p>
          ) : (
            <Link to={"/login"} className="cursor-pointer">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
