import React from "react";

export default function Card({ name, img, types }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={img} alt="img not found" width="380px" height="250px" />
      {types?.map((type) => {
        return <h5 key={type.name}>{type.name}</h5>;
      })}
    </div>
  );
}
