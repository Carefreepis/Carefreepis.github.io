import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const additionalLinks = (
    <div className="ml-4 mt-2">
      <Link
        onClick={() => setShowMore(false)}
        to="/overview"
        className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        Overview
      </Link>
      <Link
        onClick={() => setShowMore(false)}
        to="/faq"
        className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        FAQ
      </Link>
      <Link
        onClick={() => setShowMore(false)}
        to="/rewards"
        className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        Rewards
      </Link>
    </div>
  );

  const [showMore1, setShowMore1] = useState(false);

  const toggleShowMore1 = () => {
    setShowMore1(!showMore1);
  };

  const additionalLinks1 = (
    <div className="ml-4 mt-2">
      <Link
        onClick={() => setShowMore1(false)}
        to="/overview"
        className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        Overview
      </Link>
      <Link
        onClick={() => setShowMore1(false)}
        to="/faq"
        className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        FAQ
      </Link>
      <Link
        onClick={() => setShowMore1(false)}
        to="/rewards"
        className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        Rewards
      </Link>
    </div>
  );



  return (
    <div className="bg-blue-100 w-1/10 h-screen fixed left-0 top-0 z-10">
      <Link to="/">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
      </Link>
      <ul>
        <li>
          <button
            onClick={toggleShowMore1}
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            <svg className="h-4 w-4 inline-block mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 16a1 1 0 01-.71-.29l-4-4a1 1 0 011.42-1.42L10 13.59l3.29-3.3a1 1 0 011.42 1.42l-4 4A1 1 0 0110 16z"
                clipRule="evenodd"
              />
            </svg>
            链上发币
            {showMore1 ? (
              <svg className="h-4 w-4 inline-block ml-2" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 8a1 1 0 01.71.29l4 4a1 1 0 01-1.42 1.42L10 10.41l-3.29 3.3a1 1 0 01-1.42-1.42l4-4A1 1 0 0110 8z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4 inline-block mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 16a1 1 0 01-.71-.29l-4-4a1 1 0 011.42-1.42L10 13.59l3.29-3.3a1 1 0 011.42 1.42l-4 4A1 1 0 0110 16z"
                clipRule="evenodd"
              />
            </svg>
                  )}            
          </button>
          {showMore1 && additionalLinks1}
        </li>
        <li>
          <button
            onClick={toggleShowMore}
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            <svg className="h-4 w-4 inline-block mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 16a1 1 0 01-.71-.29l-4-4a1 1 0 011.42-1.42L10 13.59l3.29-3.3a1 1 0 011.42 1.42l-4 4A1 1 0 0110 16z"
                clipRule="evenodd"
              />
            </svg>
            流动性挖矿
            {showMore ? (
              <svg className="h-4 w-4 inline-block ml-2" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 8a1 1 0 01.71.29l4 4a1 1 0 01-1.42 1.42L10 10.41l-3.29 3.3a1 1 0 01-1.42-1.42l4-4A1 1 0 0110 8z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4 inline-block mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 16a1 1 0 01-.71-.29l-4-4a1 1 0 011.42-1.42L10 13.59l3.29-3.3a1 1 0 011.42 1.42l-4 4A1 1 0 0110 16z"
                clipRule="evenodd"
              />
            </svg>
                  )}
                  </button>
                  {showMore && additionalLinks}
                  </li>
                  
      </ul>
    </div>
);
}
                  
export default Sidebar;