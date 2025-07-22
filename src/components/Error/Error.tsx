import React, { FC, useContext } from "react";
import { UserContext } from "../../App";
import "./Error.css";

const Error: FC = () => {
  const { apiError } = useContext(UserContext);
  return (
    <div className="error">
      <div className="error_container">
        <h1>Sorry..!!</h1>
        <h2>Some error occured while fetching data</h2>
        <p> Error Message: {apiError} </p>
      </div>
    </div>
  );
};

export default Error;
