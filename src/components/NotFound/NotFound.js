import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <div>
      <h1>
        Page not found <Link to="/">Home</Link>
      </h1>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
