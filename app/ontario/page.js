import ResoCard from "@/components/reso/ResoCard";
import Link from "next/link";
import React from "react";
import SearchBar from "@/components/reso/SearchBar";

const page = async () => {
  const city = "Ontario";

  const url = `localhost:3000/residential/Properties/?$limit=10&$skip=0&$select=Province=${city}`;
  const options = {
    method: "GET",
  };
  const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data.results();

  return (
    <>
      <div className="container-fluid">
        <div className="input-group input-group-search me-2 me-md-0">
          <SearchBar />

          <button
            className="input-group-text btn bg-light2 bg-lh mybtn d-block py-search"
            type="button"
            aria-label="Search Button"
          >
            <svg
              aria-hidden="true"
              className="svg"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              width="25"
            >
              <path
                d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                fill="#000000"
              ></path>
            </svg>
          </button>
        </div>
        <h1 className="main-title d-flex text-capitalize pt-4">
          {" "}
          {city} Homes for Sale | Real Estate Updated Daily Listings
        </h1>
        <p>
          Refine your <span className="text-capitalize">{city}</span> real
          estate search by price, bedroom, or type (house, townhouse, or condo).
          View up-to-date MLS® listings in{" "}
          <span className="text-capitalize">{city}</span> .
        </p>

        <div className="pt-3 row row-cols-md-4 ">
          {main_data.map((curElem) => {
            return (
              <ResoCard
                city={curElem?.Municipality.toLowerCase()}
                key={curElem?.MLS}
                curElem={curElem}
              />
            );
          })}
        </div>
      </div>

      <div></div>
    </>
  );
};

export default page;
