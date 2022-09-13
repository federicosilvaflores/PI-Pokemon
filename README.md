![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Dogs

<img src="https://user-images.githubusercontent.com/76783198/184228274-40a58435-e797-48ba-b6cf-e52aa99d3329.png"   />
<img src="https://user-images.githubusercontent.com/76783198/184225656-63eb4e40-4881-48eb-bd86-c027602173a5.png"  />
<img src="https://user-images.githubusercontent.com/76783198/184225936-7c59268c-39cf-41ad-8814-7c812aebb098.png"   />

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

## Contenido

Se cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

## Descripción

La aplicación permite vizualizar las distintas razas de perros de todo el mundo, junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

- Buscar perros
- Filtrarlos / Ordenarlos
- Agregar nuevas razas de perros

#### Tecnologías utilizadas
- Javascript
- HTML
- CSS
- React
- Redux
- Express
- Sequelize - Postgres

## Frontend

__Pagina inicial__

__Ruta principal__ consta de :

- SearchBar para encontrar razas de perros por nombre
- Listado de razas de perros, que indica:
  - Imagen
  - Nombre
  - Temperamento
  - Peso
- Filtros por:
  - Temperamento
  - Raza existente (es decir las que vienen de la API) o agregada por nosotros (en la base de datos)
- Ordenamiento tanto ascendentemente como descendentemente las razas de perro por:
  - Orden alfabético
  - Peso
- Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

__Ruta de detalle de raza de perro__ consta de:

- Imagen
- Nombre
- Temperamentos
- Altura
- Peso
- Esperanza de vida

__Ruta de creación de raza de perro__ contiene:

- Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Altura (Diferenciando entre altura mínima y máxima)
  - Peso (Diferenciando entre peso mínimo y máximo)
  - Años de vida
- Posibilidad de seleccionar/agregar uno o más temperamentos
- Botón para crear una nueva raza de perro

## Backend

Se desarrollo un servidor en Node/Express con las siguientes rutas:

- __GET /dogs__:
  - Obtiene un listado de las razas de perro  
- __GET /dogs?name="..."__:
  - Obtiene un listado de las razas de perro que contengan la palabra ingresada como query parameter
  - Si no existe coincidencia con ninguna raza de perro arroja el mensaje correspondiente
- __GET /dogs/{idRaza}__:
  - Obtiene todos los detalles de una raza de perro en particular
- __POST /dogs__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  - Crea una raza de perro en la base de datos relacionada con sus temperamentos
- __GET /temperaments__:
  - Obtiene todos los temperamentos posibles
  - En una primera instancia los obtiene desde la API externa y luego los guarda en la base de datos para utilizarlos posteriormente

## Base de datos

El modelo de la base de datos contiene las siguientes entidades:

- Raza con las siguientes propiedades:
  - ID
  - Nombre 
  - Altura 
  - Peso 
  - Años de vida
- Temperamento con las siguientes propiedades:
  - ID
  - Nombre

