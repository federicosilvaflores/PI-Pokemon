import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
      try {
        var json = await axios.get(
          "http://localhost:3001/pokemons?name=" + input.name
        );
        return alert(
          "Ya existe un pokemon con ese nombre, por favor, elija otro"
        );
      } catch (error) {}

      dispatch(postPokemon(input));
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
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            value={input.name}
            name="name"
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>HP:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.hp}
            name="hp"
          />
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <label>Ataque:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.attack}
            name="attack"
          />
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <label>Defensa:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.defense}
            name="defense"
          />
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <label>Velocidad:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.speed}
            name="speed"
          />
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <label>Altura:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.height}
            name="height"
          />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <label>Peso:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.weight}
            name="weight"
          />
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            value={input.img}
            name="img"
          />
          {errors.img && <p>{errors.img}</p>}
        </div>
        <div>
          <p>Tipo/s:</p>
          {types?.map((type) => {
            return (
              <label key={type.name}>
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
          {errors.types && <p>{errors.types}</p>}
        </div>
        <button disabled={handleActivateButton()} type="submit">
          Crear Pokemon
        </button>
      </form>
    </div>
  );
}
