// SearchBar.js
"use client";
import { useState } from "react";
import Link from "next/link";
import Autosuggest from "react-autosuggest";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Define your list of cities
  const cities = [
    "Barrie",
    "Belleville",
    "Brampton",
    "Brant",
    "Brantford",
    "Brockville",
    "Burlington",
    "Cambridge",
    "Clarence-Rockland",
    "Cornwall",
    "Dryden",
    "Elliot Lake",
    "Greater Sudbury",
    "Guelph",
    "Haldimand County",
    "Hamilton",
    "Kawartha Lakes",
    "Kenora",
    "Kingston",
    "Kitchener",
    "London",
    "Markham",
    "Mississauga",
    "Niagara Falls",
    "Norfolk County",
    "North Bay",
    "Orillia",
    "Oshawa",
    "Ottawa",
    "Owen Sound",
    "Pembroke",
    "Peterborough",
    "Pickering",
    "Port Colborne",
    "Prince Edward County",
    "Quinte West",
    "Richmond Hill",
    "Sarnia",
    "Sault Ste Marie",
    "St Catharines",
    "St Thomas",
    "Stratford",
    "Temiskaming Shores",
    "Thorold",
    "Thunder Bay",
    "Timmins",
    "Toronto",
    "Vaughan",
    "Waterloo",
    "Welland",
    "Windsor",
    "Woodstock",
  ];

  // Function to get suggestions based on user input
  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    return cities.filter((city) =>
      city.toLowerCase().includes(inputValueLowerCase)
    );
  };

  // Triggered when the input value changes
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Triggered when the input value is cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Triggered when a suggestion is selected
  const onSuggestionSelected = (event, { suggestionValue }) => {
    // Do something with the selected city, e.g., fetch data for that city
    console.log(`Selected city: ${suggestionValue}`);
  };

  // Render Each Option
  const renderSuggestion = (suggestion) => (
    <div>
      <Link href={`/ontario/${suggestion.toLowerCase()}`} className="ha-link">
        <span className="d-none d-sm-inline me-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#00b5d6"
            className="bi bi-geo"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
            />
          </svg>
        </span>
        {suggestion}
      </Link>
    </div>
  );

  // Autosuggest input props
  const inputProps = {
    placeholder: "Type a city",
    value,
    onChange: (event, { newValue }) => setValue(newValue),
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;
