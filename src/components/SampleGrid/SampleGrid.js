import React from "react";
import "./SampleGrid.css";

const SampleGrid = () => {
  const boxes = () => {
    for (let i = 0; i < 4; i++) {
      return <div className="box"></div>;
    }
  };
  return <div className="boxes">{boxes}</div>;
};

export default SampleGrid;
