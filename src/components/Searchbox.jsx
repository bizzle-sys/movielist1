import React from "react";

export const Searchbox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        value={props.value}
        onChange={(e) => props.setSearchValue(e.target.value)}
        className="form-control"
        placeholder="type to search"
        type="text"
      />
    </div>
  );
};
