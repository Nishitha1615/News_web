import React, { useState } from "react";

const Search = ({ searchText }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchhandler = (e) => {
    e.preventDefault();
    searchText(searchQuery);
  };
  return (
    <div>
      <form onSubmit={searchhandler}>
        <input
          className="inputtext"
          type="text"
          placeholder="Search articles"
          // value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="but">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
