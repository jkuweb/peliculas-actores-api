import { crearElementoImagen } from "../../helpers/crear-elemento-imagen"
import { crearElementoParrafo } from "../../helpers/crear-elemento-parrafo"
import { borrarPelicula, obtenerPeliculas } from "./pelicula-listado.api"
import { CrearBotonesParams, Movie } from "./pelicula-listado.model"

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

// const crearElementoImagen = (portada: string, titulo: string): HTMLImageElement => {
//   const imagen = document.createElement("img")
//   imagen.src = portada
//   imagen.alt = titulo
//   return imagen
// }

// const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
//   const parrafo = document.createElement("p")
//   parrafo.textContent = texto
//   return parrafo
// }

const crearBoton = (crearBotonParams: CrearBotonesParams): HTMLButtonElement => {
  const { texto, id: peliculaId, nombreClase, onClick } = crearBotonParams;
  const boton = document.createElement("button")
  boton.textContent = texto
  boton.addEventListener("click", () => {
    onClick(peliculaId)
  })
  boton.classList.add(nombreClase)
  return boton
}

const crearGrupoBotones = (id: string): HTMLDivElement => {
  const grupoBotones = document.createElement("div")
  grupoBotones.classList.add("grupo-botones")

  const botonEditar = crearBoton({
    texto: "editar",
    id: id,
    nombreClase: "boton-editar",
    onClick: () => editaPelicula(id)
  })

  const botonBorrar = crearBoton({
    texto: "borrar",
    id: id,
    nombreClase: "boton-borrar",
    onClick: () => borraPelicula(id)
  })

  grupoBotones.appendChild(botonEditar)
  grupoBotones.appendChild(botonBorrar)

  return grupoBotones
}

const crearContenedorPelicula = (pelicula: Movie) => {
  const elementoPelicula = document.createElement("div")
  elementoPelicula.classList.add("pelicula-contenedor")
  const imagen = crearElementoImagen(pelicula.cover_url, pelicula.title)
  elementoPelicula.appendChild(imagen)
  const titulo = crearElementoParrafo(pelicula.title)
  elementoPelicula.appendChild(titulo)
  const director = crearElementoParrafo(pelicula.director)
  elementoPelicula.appendChild(director)
  const anio = crearElementoParrafo(pelicula.year.toString())
  elementoPelicula.appendChild(anio)
  const grupoBotones = crearGrupoBotones(pelicula.id)
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





