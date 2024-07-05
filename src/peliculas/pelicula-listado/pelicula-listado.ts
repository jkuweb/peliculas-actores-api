import { crearElementoImagen } from "../../helpers/crear-elemento-imagen"
import { crearElementoParrafo } from "../../helpers/crear-elemento-parrafo"
import { crearGrupoBotones } from "../../helpers/crear-grupo-botones"
import { borrarPelicula, obtenerPeliculas } from "./pelicula-listado.api"
import { Movie } from "./pelicula-listado.model"

const editaPelicula = (id: string) => {
  window.location.href = `../pelicula-editar/index.html?id=${encodeURIComponent(id)}`
}

const borraPelicula = async (id: string) => {
  try {
    await borrarPelicula(id)
    const listado = document.querySelector("#listado-peliculas")
    if (listado && listado instanceof HTMLDivElement) {
      listado.innerHTML = ""
      pintarPeliculas()
    } else {
      throw new Error("No se ha encontrado el contenedor del listado")
    }
    alert("Pelicula borrada con exito")
  } catch (error) {
    alert(error)
  }
}

const crearContenedorPelicula = (pelicula: Movie): HTMLDivElement => {
  const id = pelicula.id
  const elementoPelicula = document.createElement("div")
  elementoPelicula.classList.add("container")
  const imagen = crearElementoImagen(pelicula.cover_url, pelicula.title)
  elementoPelicula.appendChild(imagen)
  const titulo = crearElementoParrafo(pelicula.title)
  elementoPelicula.appendChild(titulo)
  const director = crearElementoParrafo(pelicula.director)
  elementoPelicula.appendChild(director)
  const anio = crearElementoParrafo(pelicula.year.toString())
  elementoPelicula.appendChild(anio)
  const grupoBotones = crearGrupoBotones(id, editaPelicula, borraPelicula)
  elementoPelicula.appendChild(grupoBotones)
  return elementoPelicula
}

export const pintarPeliculas = async () => {
  const peliculas = await obtenerPeliculas()
  const listado = document.querySelector("#listado-peliculas")
  if (listado && listado instanceof HTMLDivElement) {
    peliculas.forEach(pelicula => {
      const contenedorPelicula = crearContenedorPelicula(pelicula)
      listado.appendChild(contenedorPelicula)
    });
  } else {
    throw new Error("No se ha encontado el contenedor del listado")
  }
}


document.addEventListener("DOMContentLoaded", pintarPeliculas)
