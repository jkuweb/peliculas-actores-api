import { actualizarPelicula, obtenerPelicula } from "./pelicula-editar.api";
import { Movie } from "./pelicula-editar.model";

const capturarIdDeLaUrl = (): string => {
  const parametrosUrl = new URLSearchParams(window.location.search)
  const id = parametrosUrl.get("id") || ""
  return decodeURIComponent(id);
}

const obtenPelicula = async (): Promise<Movie> => {
  const id = capturarIdDeLaUrl()
  const pelicula = await obtenerPelicula(id)
  return pelicula;
}

const pintarDatosPelicula = async (): Promise<void> => {
  const pelicula = await obtenPelicula()

  const titulo = document.querySelector("#title")
  const anio = document.querySelector("#year")
  const director = document.querySelector("#director")
  const descripcion = document.querySelector("#description")
  const cover_url = document.querySelector("#cover_url")

  if (titulo && titulo instanceof HTMLInputElement) {
    titulo.value = pelicula.title
  } else {
    throw new Error("Error al obtener el titulo")
  }

  if (anio && anio instanceof HTMLInputElement) {
    anio.value = pelicula.year.toString()
  } else {
    throw new Error("Error al obtener el año")
  }

  if (director && director instanceof HTMLInputElement) {
    director.value = pelicula.director
  } else {
    throw new Error("Error al obtener el director")
  }

  if (descripcion && descripcion instanceof HTMLTextAreaElement) {
    descripcion.value = pelicula.description
  } else {
    throw new Error("Error al optener la descripción")
  }

  if (cover_url && cover_url instanceof HTMLInputElement) {
    cover_url.value = pelicula.cover_url
  } else {
    throw new Error("Error al obtener la imagen")
  }
}

const obtenerValorCampo = (campo: string): string => {
  const elementoCampo = document.querySelector(`#${campo}`)
  if (elementoCampo && elementoCampo instanceof HTMLInputElement || elementoCampo instanceof HTMLTextAreaElement) {
    return elementoCampo.value
  } else {
    throw new Error(`No se ha encontrado el campo ${campo}`)
  }
}

const actualizaPelicula = async (evento: Event): Promise<void> => {
  evento.preventDefault()
  const pelicula: Movie = {
    id: capturarIdDeLaUrl(),
    title: obtenerValorCampo("title"),
    director: obtenerValorCampo("director"),
    year: Number(obtenerValorCampo("year")),
    description: obtenerValorCampo("description"),
    cover_url: obtenerValorCampo("cover_url")
  }

  try {
    await actualizarPelicula(pelicula)
    window.location.href = "../pelicula-listado/index.html"
    alert("Pelicula actualizada satisfactoriamente")
  } catch (error) {
    alert(error)
  }

  window.location.href = "../pelicula-listado/index.html"

}

const iniciarFormulario = () => {
  const formulario = document.querySelector("#formulario")
  if (formulario && formulario instanceof HTMLElement) {
    formulario.addEventListener("submit", actualizaPelicula)
  } else {
    throw new Error("No se ha encontrado el formulario")
  }
}
document.addEventListener("DOMContentLoaded", () => {
  iniciarFormulario()
  pintarDatosPelicula()
})