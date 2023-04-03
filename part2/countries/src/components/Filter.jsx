import React from "react";

const Filter = ({ handleChange }) => (
    <div>
        <b>Filter shown with: </b><input onChange={handleChange} />
    </div>
);

export default Filter;