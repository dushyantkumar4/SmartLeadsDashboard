import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center p-3 shadow-lg rounded-md">
        {/* Name  */}
        <div className="hover:text-shadow-lg hover:text-shadow-purple-600 font-semibold cursor-pointer text-lg">
          Lead Dashboard <i className="fa-solid fa-chevron-down"></i>
        </div>
        {/* nav Links */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex gap-10 items-center">
            <button>theme</button>
            <NavLink to={"#"} className="">
              <i
                className={`fa-solid fa-arrow-up-from-bracket navlink-item hover:text-shadow-purple-600 bg-transparent `}
              ></i>
            </NavLink>
            <NavLink
              to={"#"}
              className=" 
        bg-purple-600 rounded-full p-0.5 hover:shadow-lg hover:shadow-purple-600"
            >
              <i className="fa-solid fa-user navlink-item text-white"></i>
            </NavLink>
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              className=""
            >
              <i
                className={`cursor-pointer fa-solid fa-ellipsis-vertical navlink-item hover:text-shadow-lg hover:text-shadow-purple-600 bg-transparent `}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
