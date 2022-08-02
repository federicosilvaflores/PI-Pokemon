import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import logo from "../images/pokemonLogo.png";

export default function LandingPage() {
  return (
    <div className={s.landingDiv}>
      <h1 className={s.landingH1}>Atrapalos Ya!</h1>
      <Link className={s.link} to="/home">
        <img className={s.imgPokemonLogo} src={logo} alt="" />
      </Link>
      <p className={s.clickAqui}>(Click aquí para comenzar)</p>
    </div>
  );
}
