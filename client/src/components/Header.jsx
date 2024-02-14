import { useState, useRef, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const clickRef = useRef(null);

  const handleClickRef = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickRef);
  }, [isActive]);

  return (
    <header className="w-full max-w-[1500px] mx-auto py-4 flex justify-between items-center gap-4">
      <div className="flex flex-col text-2xl font-bold">
        <p>The</p>
        <p>Movie</p>
        <p>Tracker</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="🔍 Search a movie or a series"
          className="bg-[#D9D9D9] outline-none rounded-3xl px-8 w-full md:w-[630px] py-4"
        />
      </div>
      <div
        className="cursor-pointer hover:text-gray-600 relative"
        onClick={() => setIsActive(!isActive)}
        ref={clickRef}
      >
        <FaUserAlt size={25} />
      </div>

      {isActive && (
        <div className="w-28 h-16 border border-[#D9D9D9] absolute top-20 right-20 flex flex-col items-center justify-center text-base">
          <Link to={"/profile"}>Profile</Link>
          <p>Logout</p>
        </div>
      )}
    </header>
  );
};

export default Header;
