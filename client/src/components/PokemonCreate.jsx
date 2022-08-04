import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import s from "./PokemonCreate.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Ingrese Nombre";
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
    errors.name = "El nombre solo debe contener letras";
  }
  if (!input.types.length) {
    errors.types = "Debe escoger al menos un Tipo para el pokemon a crear";
  } else if (input.types.length > 2) {
    errors.types = "Solo puede escoger dos tipos";
  }
  if (
    !input.hp ||
    input.hp < 10 ||
    input.hp > 100 ||
    input.hp.search(/^\d+$/) === -1
  ) {
    if (!input.hp) errors.hp = "Ingrese HP";
    else if (input.hp <= 0) errors.hp = "HP debe ser mayor a 0";
    else if (input.hp >= 100) errors.hp = "HP debe ser menor a 200";
    else if (input.hp.search(/^\d+$/) === -1)
      errors.hp = "Debe ingresar numeros enteros";
  }

  if (
    !input.attack ||
    input.attack < 10 ||
    input.attack > 100 ||
    input.attack.search(/^\d+$/) === -1
  ) {
    if (!input.attack) errors.attack = "Ingrese Ataque";
    else if (input.attack <= 0) errors.attack = "Ataque debe ser mayor a 0";
    else if (input.attack >= 200) errors.attack = "Ataque debe ser menor a 200";
    else if (input.attack.search(/^\d+$/) === -1)
      errors.attack = "Debe ingresar numeros enteros";
  }

  if (
    !input.defense ||
    input.defense < 10 ||
    input.defense > 100 ||
    input.defense.search(/^\d+$/) === -1
  ) {
    if (!input.defense) errors.defense = "Ingrese defensa";
    else if (input.defense <= 0) errors.defense = "Defensa debe ser mayor a 0";
    else if (input.defense >= 200)
      errors.defense = "Defensa debe ser menor a 200";
    else if (input.defense.search(/^\d+$/) === -1)
      errors.defense = "Debe ingresar numeros enteros";
  }
  if (
    !input.speed ||
    input.speed < 10 ||
    input.speed > 100 ||
    input.speed.search(/^\d+$/) === -1
  ) {
    if (!input.speed) errors.speed = "Ingrese velocidad";
    else if (input.speed <= 0) errors.speed = "Velocidad debe ser mayor a 0";
    else if (input.speed >= 200)
      errors.speed = "Velocidad debe ser menor a 200";
    else if (input.speed.search(/^\d+$/) === -1)
      errors.speed = "Debe ingresar numeros enteros";
  }

  if (
    !input.height ||
    input.height < 10 ||
    input.height > 100 ||
    input.height.search(/^\d+$/) === -1
  ) {
    if (!input.height) errors.height = "Ingrese altura";
    else if (input.height <= 0) errors.height = "Altura debe ser mayor a 0";
    else if (input.height >= 5000)
      errors.height = "Altura debe ser menor a 5000";
    else if (input.height.search(/^\d+$/) === -1)
      errors.height = "Debe ingresar numeros enteros";
  }

  if (
    !input.weight ||
    input.weight < 10 ||
    input.weight > 100 ||
    input.weight.search(/^\d+$/) === -1
  ) {
    if (!input.weight) errors.weight = "Ingrese peso";
    else if (input.weight <= 0) errors.weight = "Peso debe ser mayor a 0";
    else if (input.weight >= 5000) errors.weight = "Peso debe ser menor a 5000";
    else if (input.weight.search(/^\d+$/) === -1)
      errors.weight = "Debe ingresar numeros enteros";
  }
  if (
    input.img.length > 0 &&
    input.img.search(
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|webp)/g
    ) === -1
  ) {
    errors.img = "Imagen debe ser un URL valido o se debe dejar vacio";
  }
  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const history = useHistory();

  const [loader, setLoader] = useState("NO");

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      //si esta checkeado se agrega el tipo
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          types: [...input.types, e.target.value],
        })
      );
    }
    if (!e.target.checked) {
      //si no esta checkeado se quita el tipo
      input.types.splice(input.types.indexOf(e.target.value), 1); //se quita el tipo
      setInput({
        ...input,
      });
      setErrors(
        validate({
          ...input,
        })
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.name && Object.entries(errors).length === 0) {
      setLoader("SI");
      try {
        // eslint-disable-next-line no-unused-vars
        var json = await axios.get(
          "http://localhost:3001/pokemons?name=" + input.name
        );
        alert("Ya existe un pokemon con ese nombre, por favor, elija otro");
        setLoader("NO");
        return;
      } catch (error) {
        console.log(error);
      }

      dispatch(postPokemon(input));
      setLoader("NO");
      alert("Pokemon creado exitosamente");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: [],
      });
      history.push("/home");
    } else {
      alert("Por favor complete todos los campos correctamente");
    }
  }

  function handleActivateButton() {
    if (input.name && Object.entries(errors).length === 0) {
      return false;
    } else return true;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={s.divContenedor}>
      <h1 className={s.titulo}>Crea tu Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.div3}>
          <div className={s.div1}>
            <div>
              <label className={s.label}>Nombre:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="text"
                value={input.name}
                name="name"
              />
              {errors.name && <p className={s.errores}>{errors.name}</p>}
            </div>
            <div>
              <label className={s.label}>HP:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="number"
                value={input.hp}
                name="hp"
              />
              {errors.hp && <p className={s.errores}>{errors.hp}</p>}
            </div>
            <div>
              <label className={s.label}>Ataque:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="number"
                value={input.attack}
                name="attack"
              />
              {errors.attack && <p className={s.errores}>{errors.attack}</p>}
            </div>
            <div>
              <label className={s.label}>Defensa:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="number"
                value={input.defense}
                name="defense"
              />
              {errors.defense && <p className={s.errores}>{errors.defense}</p>}
            </div>
            <div>
              <label className={s.label}>Velocidad:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="number"
                value={input.speed}
                name="speed"
              />
              {errors.speed && <p className={s.errores}>{errors.speed}</p>}
            </div>
            <div>
              <label className={s.label}>Altura:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="number"
                value={input.height}
                name="height"
              />
              {errors.height && <p className={s.errores}>{errors.height}</p>}
            </div>
            <div>
              <label className={s.label}>Peso:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="number"
                value={input.weight}
                name="weight"
              />
              {errors.weight && <p className={s.errores}>{errors.weight}</p>}
            </div>
            <div>
              <label className={s.label}>Imagen:</label>
              <input
                className={s.inputs}
                onChange={(e) => handleChange(e)}
                type="text"
                value={input.img}
                name="img"
              />
              {errors.img && <p className={s.errores}>{errors.img}</p>}
            </div>
          </div>
          <div>
            <div className={s.div2}>
              <div className={s.elegi}>
                <p id={s.pDeElegi}>Elegí uno o dos tipos:</p>
              </div>
              {types?.map((type) => {
                return (
                  <label id={s.idChecks} className={s.label} key={type.name}>
                    <input
                      onChange={(e) => handleCheck(e)}
                      type="checkbox"
                      name={type.name}
                      value={type.name}
                    />
                    {type.name[0].toUpperCase() + type.name.substring(1)}
                  </label>
                );
              })}
              {errors.types && <p className={s.errores}>{errors.types}</p>}
            </div>
          </div>
        </div>
        <div className={s.divBotonCrear}>
          <button
            className={s.buttonCrear}
            disabled={handleActivateButton()}
            type="submit"
          >
            Crear Pokemon
          </button>
        </div>
      </form>
      <div className={s.divLoader}>
        {loader === "SI" ? <div className={s.loader}></div> : <p></p>}
      </div>
      <Link to="/home">
        <button className={s.buttonVolver}>Volver</button>
      </Link>
    </div>
  );
}
